package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.Event;
import org.allinvegas.services.aiService;
import org.allinvegas.services.dynamoDbEventService;
import tools.jackson.databind.ObjectMapper;

import java.util.*;

public class postRecommendedAiController implements RequestHandler<Map<String,Object>, Map<String,Object>> {

    private final ObjectMapper mapper = new ObjectMapper();
    private final aiService service = new aiService();
    private final dynamoDbEventService eventService = new dynamoDbEventService();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {

        try {

            String body = (String) event.get("body");

            Map<String,Object> request = mapper.readValue(body, Map.class);

            String prompt = (String) request.get("prompt");

            List<Event> events = eventService.getAllEvents();

            String recommended = service.recommendEvents(prompt, events);

            Map<String,Object> response = Map.of(
                    "recommended", recommended
            );

            return Map.of(
                    "statusCode", 200,
                    "body", mapper.writeValueAsString(response)
            );

        } catch (Exception e) {

            return Map.of(
                    "statusCode", 500,
                    "body", "{\"message\":\"Error processing recommendation\"}"
            );
        }
    }
}