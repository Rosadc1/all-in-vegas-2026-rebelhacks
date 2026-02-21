package org.allinvegas.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

public class dynamoDbEventService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "Event";

    // Constructor
    public dynamoDbEventService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }
    private static final Logger logger = LoggerFactory.getLogger(dynamoDbEventService.class);



}


