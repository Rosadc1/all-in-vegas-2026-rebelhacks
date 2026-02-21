package org.allinvegas.services;
import org.allinvegas.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.Instant;
import java.util.*;

public class dynamoDbUserService {
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "User";

    // Constructor
    public dynamoDbUserService() {
        this.dynamoDbClient = DynamoDbClient.create();
    }
    private static final Logger logger = LoggerFactory.getLogger(dynamoDbUserService.class);



}


