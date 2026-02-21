package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.Venue;
import org.allinvegas.services.dynamoDbVenueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class postVenueController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private final dynamoDbVenueService venueService = new dynamoDbVenueService();
    private static final Logger logger = LoggerFactory.getLogger(postVenueController.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        Map<String,Object> response = new HashMap<>();
        try {
            String body = (String) event.get("body");
            Venue venue = mapper.readValue(body, Venue.class);

            // Assign ID if missing
            if (venue.getVenueID() == null) venue.setVenueID(UUID.randomUUID());

            venueService.postVenue(venue);

            response.put("statusCode", 201);
            response.put("body", "{\"status\":200,\"message\":\"Venue created.\"}");
        } catch (ConditionalCheckFailedException e) {
            response.put("statusCode", 400);
            response.put("body", "{\"status\":400,\"message\":\"Venue already exists.\"}");
        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: " + e.getMessage() + "\"}");
            logger.error("Error creating venue: {}", e.getMessage());
        }
        return response;
    }
}