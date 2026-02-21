package org.allinvegas.services;

import org.allinvegas.model.Venue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class dynamoDbVenueService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "Venue";
    private static final Logger logger = LoggerFactory.getLogger(dynamoDbVenueService.class);

    public dynamoDbVenueService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }

    // GET Venue by ID
    public Venue getVenue(String venueID) {
        logger.info("Fetching Venue with ID: {}", venueID);

        try {
            Map<String, AttributeValue> key = Map.of(
                    "venueID", AttributeValue.builder().s(venueID).build()
            );

            GetItemRequest request = GetItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .build();

            GetItemResponse response = dynamoDbClient.getItem(request);

            if (!response.hasItem()) return null;

            Map<String, AttributeValue> item = response.item();
            Venue venue = new Venue();

            venue.setVenueID(UUID.fromString(item.get("venueID").s()));
            venue.setEventID(UUID.fromString(item.get("eventID").s()));
            venue.setTitle(item.getOrDefault("title", AttributeValue.builder().s("").build()).s());
            venue.setDescription(item.getOrDefault("description", AttributeValue.builder().s("").build()).s());
            venue.setTime(item.getOrDefault("time", AttributeValue.builder().s("").build()).s());

            if (item.containsKey("location")) {
                Map<String, AttributeValue> locMap = item.get("location").m();
                Venue.Location loc = new Venue.Location();
                loc.setX1(Double.parseDouble(locMap.get("x1").n()));
                loc.setX2(Double.parseDouble(locMap.get("x2").n()));
                loc.setY1(Double.parseDouble(locMap.get("y1").n()));
                loc.setY2(Double.parseDouble(locMap.get("y2").n()));
                venue.setLocation(loc);
            }

            return venue;
        } catch (DynamoDbException e) {
            logger.error("Error fetching Venue: {}", e.getMessage());
            return null;
        }
    }

    // POST Venue
    public void postVenue(Venue venue) {
        logger.info("Creating Venue with ID: {}", venue.getVenueID());
        try {
            Map<String, AttributeValue> item = new HashMap<>();
            item.put("venueID", AttributeValue.builder().s(venue.getVenueID().toString()).build());
            item.put("eventID", AttributeValue.builder().s(venue.getEventID().toString()).build());
            item.put("title", AttributeValue.builder().s(venue.getTitle()).build());
            item.put("description", AttributeValue.builder().s(venue.getDescription()).build());
            item.put("time", AttributeValue.builder().s(venue.getTime()).build());

            if (venue.getLocation() != null) {
                Venue.Location loc = venue.getLocation();
                Map<String, AttributeValue> locMap = Map.of(
                        "x1", AttributeValue.builder().n(Double.toString(loc.getX1())).build(),
                        "x2", AttributeValue.builder().n(Double.toString(loc.getX2())).build(),
                        "y1", AttributeValue.builder().n(Double.toString(loc.getY1())).build(),
                        "y2", AttributeValue.builder().n(Double.toString(loc.getY2())).build()
                );
                item.put("location", AttributeValue.builder().m(locMap).build());
            }

            dynamoDbClient.putItem(PutItemRequest.builder()
                    .tableName(tableName)
                    .item(item)
                    .conditionExpression("attribute_not_exists(venueID)")
                    .build());
        } catch (ConditionalCheckFailedException e) {
            logger.error("Venue with ID {} already exists.", venue.getVenueID());
            throw new IllegalArgumentException("Venue with ID " + venue.getVenueID() + " already exists.");
        } catch (Exception e) {
            logger.error("Error creating Venue: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE Venue
    public void updateVenue(String venueID, Venue venue) {
        logger.info("Updating Venue with ID: {}", venueID);

        try {
            Map<String, AttributeValue> key = Map.of(
                    "venueID", AttributeValue.builder().s(venueID).build()
            );

            Map<String, AttributeValueUpdate> updates = new HashMap<>();

            if (venue.getTitle() != null) {
                updates.put("title", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(venue.getTitle()).build())
                        .action(AttributeAction.PUT).build());
            }
            if (venue.getDescription() != null) {
                updates.put("description", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(venue.getDescription()).build())
                        .action(AttributeAction.PUT).build());
            }
            if (venue.getTime() != null) {
                updates.put("time", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(venue.getTime()).build())
                        .action(AttributeAction.PUT).build());
            }
            if (venue.getLocation() != null) {
                Venue.Location loc = venue.getLocation();
                Map<String, AttributeValue> locMap = Map.of(
                        "x1", AttributeValue.builder().n(Double.toString(loc.getX1())).build(),
                        "x2", AttributeValue.builder().n(Double.toString(loc.getX2())).build(),
                        "y1", AttributeValue.builder().n(Double.toString(loc.getY1())).build(),
                        "y2", AttributeValue.builder().n(Double.toString(loc.getY2())).build()
                );
                updates.put("location", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().m(locMap).build())
                        .action(AttributeAction.PUT).build());
            }

            UpdateItemRequest request = UpdateItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .attributeUpdates(updates)
                    .build();

            dynamoDbClient.updateItem(request);

        } catch (Exception e) {
            logger.error("Error updating Venue: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // DELETE Venue
    public void deleteVenue(String venueID) {
        logger.info("Deleting Venue with ID: {}", venueID);
        try {
            Map<String, AttributeValue> key = Map.of(
                    "venueID", AttributeValue.builder().s(venueID).build()
            );

            dynamoDbClient.deleteItem(DeleteItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .build());
        } catch (Exception e) {
            logger.error("Error deleting Venue: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}