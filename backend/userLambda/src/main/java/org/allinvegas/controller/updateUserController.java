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

public class updateUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private final dynamoDbUserService userService = new dynamoDbUserService();
    private final ObjectMapper mapper = new ObjectMapper();
    private static final Logger logger = LoggerFactory.getLogger(updateUserController.class);

    @Override
    public Map<String,Object> handleRequest(Map<String,Object> event, Context context) {
        logger.info("Update User Method Invoked");
        Map<String,Object> response = new HashMap<>();

        try {
            String userID = ((Map<String,String>) event.get("pathParameters")).get("userId");
            String body = (String) event.get("body");
            User user = mapper.readValue(body, User.class);

            userService.updateUser(userID, user);

            response.put("statusCode", 200);
            response.put("body", "{\"status\":200,\"message\":\"User updated successfully.\"}");
            return response;

        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: "+ e.getMessage() + "\"}");
            logger.error("Error updating user {}: {}", event.get("pathParameters"), e.getMessage());
            return response;
        }
    }
}
