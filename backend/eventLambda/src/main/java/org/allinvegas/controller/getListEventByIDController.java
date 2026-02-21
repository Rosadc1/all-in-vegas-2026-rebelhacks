package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.Event;
import org.allinvegas.services.dynamoDbEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

public class getListEventByIDController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(getListEventByIDController.class);
    private final ObjectMapper mapper = new ObjectMapper();
    private final dynamoDbEventService eventService = new dynamoDbEventService();


    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Get Event Method Invoked");
        // Create a response
        Map<String, Object> response = new HashMap<>();

        try {
            if (event.get("pathParameters").toString() == null || event.get("pathParameters").toString().isEmpty()) {
                throw new RuntimeException("pathParameters is empty or not found");
            }

            String userID = ((Map<String, String>) event.get("pathParameters")).get("userID");
            logger.info("Got Path Parameters");

            if (userID == null || userID.isEmpty()) {
                throw new RuntimeException("userID is empty or not found");
            }

            List<Event> eventList = eventService.getEventsByUserId(userID);
            logger.info("Got Event from DynamoDB Service");

            if (eventList == null || eventList.isEmpty()) {
                response.put("statusCode", 200);
                response.put("body", "{\"status\":200,\"message\":\"No Events found.\",\"events\":[],\"statusCode\":\"200\"}");
                logger.warn("No events found");
                return response;
            }

            String eventMap = mapper.writeValueAsString(eventList);

            response.put("statusCode", 200);
            response.put("body", eventMap);

            return response;
        } catch (NoSuchElementException e) {
            logger.error(e.getMessage());
            response.put("statusCode", "404");
            response.put("body", e.getMessage());
            return response;
        } catch (RuntimeException e) {
            logger.error(e.getMessage());
            response.put("statusCode", "500");
            response.put("body", e.getMessage());
            return response;
        } catch (Exception e) {
            logger.error("An unexpected error occurred : {}", e.getMessage(), e);
            response.put("statusCode", "500");
            response.put("body", "\"status\": 500, \"message\" : Internal Server Error");

            return response;
        }
    }
}