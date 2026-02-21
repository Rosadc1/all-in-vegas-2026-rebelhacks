package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.Event;
import org.allinvegas.services.dynamoDbEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class deleteEventController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(getEventController.class);
    private final ObjectMapper mapper = new ObjectMapper();
    private final dynamoDbEventService eventService = new dynamoDbEventService();


    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Delete Event Method Invoked");
        Map<String, Object> response = new HashMap<>();

        try {
            logger.info("event: {}", event);
            logger.info("Context: {}", context);

            if (event.get("pathParameters").toString() == null || event.get("pathParameters").toString().isEmpty()) {
                throw new RuntimeException("pathParameters is empty or not found");
            }

            String eventID = ((Map<String, String>) event.get("pathParameters")).get("eventID");
            ;

            if (eventID == null || eventID.isEmpty()) {
                throw new RuntimeException("eventID is empty or not found");
            }

            eventService.deleteEvent(eventID);

            logger.info("Deleted Event Object to DynamoDB Successfully");

            response.put("statusCode", 200);
            response.put("body", "{\"status\":200,\"message\":\"Event deleted successfully\"}");
            return response;
        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error deleting entry\"}");
            logger.error("Error: Internal Server Error deleting entry {}", e.getMessage());
            return response;
        }


    }
}
