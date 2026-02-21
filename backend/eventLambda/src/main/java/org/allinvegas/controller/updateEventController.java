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

public class updateEventController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(updateEventController.class);
    private final ObjectMapper mapper = new ObjectMapper();
    private final dynamoDbEventService eventService = new dynamoDbEventService();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Patch Event Method Invoked");
        Map<String, Object> response = new HashMap<>();

        try {
            logger.info("event: {}", event);
            logger.info("Context: {}", context);

            String body = (String) event.get("body");

            Event eventModel;

            if (body instanceof String) {
                eventModel = mapper.readValue(body, Event.class);
            } else {
                throw new IllegalArgumentException("Unexpected body type: " + body.getClass());
            }

            logger.info("Updated Event Object Successfully");

            eventService.updateEvent(eventModel);

            logger.info("Update Event Object to DynamoDB Successfully");

            response.put("statusCode", 200);
            response.put("body", "{\"status\":200,\"message\":\"Event updated successfully\"}");
            return response;
        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error updating entry\"}");
            logger.error("Error: Internal Server Error updating entry {}", e.getMessage());
            return response;
        }
    }
}
