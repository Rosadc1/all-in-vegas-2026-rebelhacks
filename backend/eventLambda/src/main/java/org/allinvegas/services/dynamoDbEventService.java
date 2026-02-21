package org.allinvegas.services;

import org.allinvegas.model.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.*;

public class dynamoDbEventService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "Event";

    // Constructor
    public dynamoDbEventService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }
    private static final Logger logger = LoggerFactory.getLogger(dynamoDbEventService.class);


    public String postEvent(Event eventModel) {
        logger.info("Posting event to DynamoDB");

        Map<String, AttributeValue> item = new HashMap<>();

        try {



            eventModel.setEventID(UUID.randomUUID());
            item.put("eventID", AttributeValue.builder().s(eventModel.getEventId().toString()).build());

            if (eventModel.getTitle() != null) {
                item.put("title", AttributeValue.builder().s(eventModel.getTitle()).build());
            } else {
                throw new IllegalArgumentException("Title cannot be null");
            }

            if (eventModel.getDescription() != null) {
                item.put("description", AttributeValue.builder().s(eventModel.getDescription()).build());
            } else {
                throw new IllegalArgumentException("Description cannot be null");
            }

            if (eventModel.getDate() != null) {
                List<String> dates = eventModel.getDate();
                List<AttributeValue> datesList = new ArrayList<>();

                for (String date : dates) {
                    datesList.add(AttributeValue.builder().s(date).build());
                }

                item.put("date", AttributeValue.builder().l(datesList).build());
            }

            if (eventModel.getLocation() != null) {
                item.put("location", AttributeValue.builder().s(eventModel.getLocation()).build());
            } else {
                throw new IllegalArgumentException("Location cannot be null");
            }

            // Call AI API



            if (eventModel.getTag() != null) {
                List<String> tags = eventModel.getTag();
                List<AttributeValue> datesList = new ArrayList<>();

                for (String tag : tags) {
                    datesList.add(AttributeValue.builder().s(tag).build());
                }

                item.put("tag", AttributeValue.builder().l(datesList).build());
            }


            PutItemRequest request = PutItemRequest.builder()
                    .tableName(tableName)
                    .item(item)
                    .build();

            dynamoDbClient.putItem(request);
            logger.info("Successfully posted event to DynamoDB with EventID: {}", eventModel.getEventId());
            return eventModel.getEventID().toString();

        } catch (Exception e) {
            logger.error("Error posting event to DynamoDB", e);
            throw new RuntimeException(e);
        }
    }

    public Event getEvent(String eventId) {
        logger.info("Getting event from DynamoDB");

        try {
            Map<String, AttributeValue> key = new HashMap<>();
            key.put("eventID", AttributeValue.builder().s(eventId).build());

            GetItemRequest getItemRequest = GetItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .build();

            GetItemResponse response = dynamoDbClient.getItem(getItemRequest);

            if (!response.hasItem()) {
                throw new NoSuchElementException(
                        "No events found for eventId '" + eventId + "'"
                );
            }

            Map<String, AttributeValue> item = response.item();
            Event event = new Event();

            if (item.containsKey("eventID")) {
                event.setEventID(UUID.fromString(item.get("eventID").s()));
            }

            if (item.containsKey("userID")) {
                event.setUserID(UUID.fromString(item.get("userID").s()));
            }

            if (item.containsKey("title")) {
                event.setTitle(item.get("title").s());
            }

            if (item.containsKey("description")) {
                event.setDescription(item.get("description").s());
            }

            if (item.containsKey("location")) {
                event.setLocation(item.get("location").s());
            }

            if (item.containsKey("date") && item.get("date").hasL()) {
                List<AttributeValue> dateAttributeList = item.get("date").l();
                List<String> dates = new ArrayList<>();
                for (AttributeValue val : dateAttributeList) {
                    dates.add(val.s());
                }
                event.setDate(dates);
            }

            return event;

        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();

        try {
            ScanRequest scanRequest = ScanRequest.builder()
                    .tableName(tableName)
                    .build();


            ScanResponse response = dynamoDbClient.scan(scanRequest);
            for (Map<String, AttributeValue> item : response.items()) {
                Event event = new Event();

                if (item.containsKey("eventID")) event.setEventID(UUID.fromString(item.get("eventID").s()));
                if (item.containsKey("userID")) event.setUserID(UUID.fromString(item.get("userID").s()));
                if (item.containsKey("title")) event.setTitle(item.get("title").s());
                if (item.containsKey("description")) event.setDescription(item.get("description").s());
                if (item.containsKey("location")) event.setLocation(item.get("location").s());

                if (item.containsKey("date") && item.get("date").hasL()) {
                    event.setDate(item.get("date").l().stream().map(AttributeValue::s).toList());
                }

                events.add(event);


            }
            return events;


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public List<Event> getEventsByUserId(String UserID) {
        List<Event> events = new ArrayList<>();

        try {
            QueryRequest queryRequest = QueryRequest.builder()
                    .tableName(tableName)
                    .indexName("userID-index")
                    .keyConditionExpression("userID = :v_userId")
                    .expressionAttributeValues(Map.of(
                            ":v_userId", AttributeValue.builder().s(UserID).build()
                    ))
                    .build();

            QueryResponse response = dynamoDbClient.query(queryRequest);

            for (Map<String, AttributeValue> item : response.items()) {
                Event event = new Event();

                if (item.containsKey("eventID")) event.setEventID(UUID.fromString(item.get("eventID").s()));
                if (item.containsKey("userID")) event.setUserID(UUID.fromString(item.get("userID").s()));
                if (item.containsKey("title")) event.setTitle(item.get("title").s());
                if (item.containsKey("description")) event.setDescription(item.get("description").s());
                if (item.containsKey("location")) event.setLocation(item.get("location").s());

                if (item.containsKey("date") && item.get("date").hasL()) {
                    event.setDate(item.get("date").l().stream().map(AttributeValue::s).toList());
                }

                events.add(event);
            }
            return events;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public void updateEvent(Event eventModel) {
        logger.info("Updating event in DynamoDB with eventID: {}", eventModel.getEventID());

        try {
            Map<String, AttributeValue> key = new HashMap<>();
            key.put("eventID", AttributeValue.builder().s(eventModel.getEventID().toString()).build());

            Map<String, AttributeValueUpdate> updatedValues = new HashMap<>();

            if (eventModel.getUserID() != null) {
                updatedValues.put("userID", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(eventModel.getUserID().toString()).build())
                        .action(AttributeAction.PUT)
                        .build());
            }

            if (eventModel.getTitle() != null) {
                updatedValues.put("title", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(eventModel.getTitle()).build())
                        .action(AttributeAction.PUT)
                        .build());
            }

            if (eventModel.getDescription() != null) {
                updatedValues.put("description", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(eventModel.getDescription()).build())
                        .action(AttributeAction.PUT)
                        .build());
            }

            if (eventModel.getLocation() != null) {
                updatedValues.put("location", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(eventModel.getLocation()).build())
                        .action(AttributeAction.PUT)
                        .build());
            }

            if (eventModel.getDate() != null) {
                List<String> dates = eventModel.getDate();
                List<AttributeValue> datesList = new ArrayList<>();
                for (String date : dates) {
                    datesList.add(AttributeValue.builder().s(date).build());
                }
                updatedValues.put("date", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().l(datesList).build())
                        .action(AttributeAction.PUT)
                        .build());
            }

            UpdateItemRequest request = UpdateItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .attributeUpdates(updatedValues)
                    .build();

            dynamoDbClient.updateItem(request);
            logger.info("Successfully updated event in DynamoDB");

        } catch (Exception e) {
            logger.error("Error updating event in DynamoDB", e);
            throw new RuntimeException(e);
        }
    }

    public void deleteEvent(String eventId) {
        logger.info("Deleting Event with eventId {}", eventId);
        try {
            Map<String, AttributeValue> key = new HashMap<>();
            key.put("eventID", AttributeValue.builder().s(eventId).build());

            DeleteItemRequest request = DeleteItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .build();

            dynamoDbClient.deleteItem(request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}


