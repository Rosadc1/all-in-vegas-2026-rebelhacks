package org.allinvegas.services;

import org.allinvegas.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

public class dynamoDbUserService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "User";

    // Constructor
    public dynamoDbUserService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }

    private static final Logger logger = LoggerFactory.getLogger(dynamoDbUserService.class);

    public String getUserIDByUserName(String userName, String password) {
        try {
            Map<String, AttributeValue> expressionAttributeValue = Map.of(
                    ":u", AttributeValue.builder().s(userName).build(),
                    ":p", AttributeValue.builder().s(password).build()
            );
            ScanRequest request = ScanRequest.builder()
                    .tableName(tableName)
                    .filterExpression("userName  = :u AND passwordHash = :p")
                    .expressionAttributeValues(expressionAttributeValue)
                    .limit(1)
                    .build();
            ScanResponse response = dynamoDbClient.scan(request);

            if (response.count() == 0) {
                return null;
            }

            return response.items().getFirst().get("userID").s();
        } catch (Exception e) {
            logger.error("Error retrieving userID by username and password: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public User getUser(String userId) {
        logger.info("Fetching user with id {}", userId);
        try {
            Map<String, AttributeValue> key = Map.of("userID", AttributeValue.builder().s(userId).build());

            GetItemRequest request = GetItemRequest.builder().tableName(tableName).key(key).build();

            GetItemResponse response = dynamoDbClient.getItem(request);
            if (!response.hasItem()) return null;

            Map<String, AttributeValue> item = response.item();
            User user = new User();

            user.setUserID(UUID.fromString(item.get("userID").s()));
            if (item.containsKey("userType")) user.setUserType(User.UserType.valueOf(item.get("userType").s()));
            user.setUserName(item.getOrDefault("userName", AttributeValue.builder().s("").build()).s());

            if (item.containsKey("events")) {
                List<UUID> eventIds = item.get("events").l().stream().map(AttributeValue::s).map(UUID::fromString).collect(Collectors.toList());
                user.setEvents(eventIds);
            }
            return user;
        } catch (DynamoDbException e) {
            logger.error("Error fetching user {}: {}", userId, e.getMessage());
            return null;
        }
    }

    public UUID postUser(User user) {

        UUID newUserId = UUID.randomUUID();
        user.setUserID(newUserId);

        logger.info("Creating user with id {}", newUserId);

        try {
            Map<String, AttributeValue> item = new HashMap<>();

            item.put("userID",
                    AttributeValue.builder().s(newUserId.toString()).build());

            if (user.getUserType() != null)
                item.put("userType",
                        AttributeValue.builder().s(user.getUserType().toString()).build());

            if (user.getUserName() != null)
                item.put("userName",
                        AttributeValue.builder().s(user.getUserName()).build());

            if (user.getPasswordHash() != null)
                item.put("passwordHash",
                        AttributeValue.builder().s(user.getPasswordHash()).build());

            item.put("createdAt",
                    AttributeValue.builder().s(Instant.now().toString()).build());

            PutItemRequest request = PutItemRequest.builder()
                    .tableName(tableName)
                    .item(item)
                    .conditionExpression("attribute_not_exists(userName)")
                    .build();

            dynamoDbClient.putItem(request);

            return newUserId;

        } catch (ConditionalCheckFailedException e) {
            logger.error("User with id {} already exists", newUserId);
            throw new IllegalArgumentException("User with id " + newUserId + " already exists.");
        } catch (Exception e) {
            logger.error("Error creating user {}: {}", newUserId, e.getMessage());
            throw new RuntimeException(e);
        }
    }

//    public UUID postUser(User user) {
//        if (user.getUserId() == null) {
//            throw new IllegalArgumentException("userID cannot be null");
//        }
//        logger.info("Creating user with id {}", user.getUserId());
//        try {
//
//            user.setUserID(UUID.randomUUID());
//            item.put("userID", AttributeValue.builder().s(user.getUserID().toString).build());
//
//            Map<String, AttributeValue> item = new HashMap<>();
//            item.put("userID", AttributeValue.builder().s(user.getUserId().toString()).build());
//            if (user.getUserType() != null)
//                item.put("userType", AttributeValue.builder().s(user.getUserType().toString()).build());
//            if (user.getUserName() != null)
//                item.put("userName", AttributeValue.builder().s(user.getUserName()).build());
//            if (user.getPasswordHash() != null)
//                item.put("passwordHash", AttributeValue.builder().s(user.getPasswordHash()).build());
//
////            if (user.getEvents() != null && !user.getEvents().isEmpty()) {
////                List<AttributeValue> eventsList = user.getEvents().stream()
////                        .map(uuid -> AttributeValue.builder().s(uuid.toString()).build())
////                        .collect(Collectors.toList());
////                item.put("events", AttributeValue.builder().l(eventsList).build());
////            }
//
//            item.put("createdAt", AttributeValue.builder().s(Instant.now().toString()).build());
//
//            PutItemRequest request = PutItemRequest.builder()
//                    .tableName(tableName)
//                    .item(item)
//                    .conditionExpression("attribute_not_exists(userID)")
//                    .build();
//
//            dynamoDbClient.putItem(request);
//
//
//
//        } catch (ConditionalCheckFailedException e) {
//            logger.error("User with id {} already exists", user.getUserId());
//            throw new IllegalArgumentException("User with id " + user.getUserId() + " already exists.");
//        } catch (Exception e) {
//            logger.error("Error creating user {}: {}", user.getUserId(), e.getMessage());
//            throw new RuntimeException(e);
//        }
//    }

    public void updateUser(String userId, User user) {
        logger.info("Updating user with id {}", userId);
        try {
            Map<String, AttributeValue> key = Map.of("userID", AttributeValue.builder().s(userId).build());
            Map<String, AttributeValueUpdate> updates = new HashMap<>();

            if (user.getUserType() != null)
                updates.put("userType", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(user.getUserType().toString()).build())
                        .action(AttributeAction.PUT)
                        .build());

            if (user.getUserName() != null)
                updates.put("userName", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(user.getUserName()).build())
                        .action(AttributeAction.PUT)
                        .build());

            if (user.getPasswordHash() != null)
                updates.put("passwordHash", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(user.getPasswordHash()).build())
                        .action(AttributeAction.PUT)
                        .build());

            if (user.getEvents() != null)
                updates.put("events", AttributeValueUpdate.builder()
                        .value(AttributeValue.builder()
                                .l(user.getEvents().stream()
                                        .map(uuid -> AttributeValue.builder().s(uuid.toString()).build())
                                        .toList())
                                .build())
                        .action(AttributeAction.PUT)
                        .build());

            if (!updates.isEmpty()) {
                UpdateItemRequest request = UpdateItemRequest.builder()
                        .tableName(tableName)
                        .key(key)
                        .attributeUpdates(updates)
                        .build();
                dynamoDbClient.updateItem(request);
            }

        } catch (Exception e) {
            logger.error("Error updating user {}: {}", userId, e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void deleteUser(String userId) {
        logger.info("Deleting user with id {}", userId);
        try {
            Map<String, AttributeValue> key = Map.of("userID", AttributeValue.builder().s(userId).build());
            DeleteItemRequest request = DeleteItemRequest.builder()
                    .tableName(tableName)
                    .key(key)
                    .build();
            dynamoDbClient.deleteItem(request);
        } catch (Exception e) {
            logger.error("Error deleting user {}: {}", userId, e.getMessage());
            throw new RuntimeException(e);
        }
    }

}


