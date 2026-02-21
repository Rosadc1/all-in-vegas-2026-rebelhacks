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

                if (item.containsKey("tag") && item.get("tag").hasL()) {
                    event.setTag(item.get("tag").l().stream().map(AttributeValue::s).toList());
                }

                events.add(event);


            }
            return events;


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }




}


