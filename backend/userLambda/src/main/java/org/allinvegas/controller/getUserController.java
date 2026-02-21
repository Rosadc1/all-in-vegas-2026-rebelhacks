package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.User;
import org.allinvegas.services.dynamoDbUserService;
import tools.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class getUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private final dynamoDbUserService userService = new dynamoDbUserService();
    private static final Logger logger = LoggerFactory.getLogger(getUserController.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Get User Method Invoked");
        Map<String, Object> response = new HashMap<>();

        try {
            String userID = ((Map<String,String>) event.get("pathParameters")).get("userId");
            User user = userService.getUser(userID);

            if (user == null) {
                response.put("statusCode", 404);
                response.put("body", "{\"status\":404,\"message\":\"User not found.\"}");
                return response;
            }

            String userJson = mapper.writeValueAsString(user);
            response.put("statusCode", 200);
            response.put("body", userJson);
            return response;

        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: "+ e.getMessage() + "\"}");
            logger.error("Error fetching user: {}", e.getMessage());
            return response;
        }
    }
}