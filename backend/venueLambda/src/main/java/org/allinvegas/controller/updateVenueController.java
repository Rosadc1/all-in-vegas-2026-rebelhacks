package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.Venue;
import org.allinvegas.services.dynamoDbVenueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class updateVenueController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private final dynamoDbVenueService venueService = new dynamoDbVenueService();
    private static final Logger logger = LoggerFactory.getLogger(updateVenueController.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Map<String,Object> handleRequest(Map<String,Object> event, Context context) {
        Map<String,Object> response = new HashMap<>();
        try {
            Map<String,String> pathParams = (Map<String,String>) event.get("pathParameters");
            String venueID = pathParams.get("venueID");
            String body = (String) event.get("body");
            Venue venue = mapper.readValue(body, Venue.class);

            venueService.updateVenue(venueID, venue);

            response.put("statusCode", 200);
            response.put("body", "{\"status\":200,\"message\":\"Venue updated.\"}");
        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: " + e.getMessage() + "\"}");
            logger.error("Error updating venue: {}", e.getMessage());
        }
        return response;
    }
}