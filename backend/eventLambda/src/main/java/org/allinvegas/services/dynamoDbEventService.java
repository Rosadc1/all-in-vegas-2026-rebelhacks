package org.allinvegas.services;

import org.allinvegas.model.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import java.util.*;

public class dynamoDbEventService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "Event";

    // Constructor
    public dynamoDbEventService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }
    private static final Logger logger = LoggerFactory.getLogger(dynamoDbEventService.class);


    public void postEvent(Event eventModel) {
        logger.info("Posting event to DynamoDB");

        Map<String, AttributeValue> item = new HashMap<>();

        try {



            eventModel.setEventId(UUID.randomUUID());
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
                
            }




        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }



        return null;
    }

    public List<Event> getAllEvents() {
        return null;
    }

    public List<Event> getEventsByUserId(String UserID) {
        return null;
    }


    public void updateEvent(Event eventModel) {

    }

    public void deleteEvent(String eventId) {


    }



}


