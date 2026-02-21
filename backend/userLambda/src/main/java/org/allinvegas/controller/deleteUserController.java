package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.services.dynamoDbUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class deleteUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private final dynamoDbUserService userService = new dynamoDbUserService();
    private static final Logger logger = LoggerFactory.getLogger(deleteUserController.class);

    @Override
    public Map<String,Object> handleRequest(Map<String,Object> event, Context context) {
        logger.info("Delete User Method Invoked");
        Map<String,Object> response = new HashMap<>();

        try {
            String userID = ((Map<String,String>) event.get("pathParameters")).get("userId");
            userService.deleteUser(userID);

            response.put("statusCode", 200);
            response.put("body", "{\"status\":200,\"message\":\"User deleted successfully.\"}");
            return response;

        } catch (Exception e) {
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: "+ e.getMessage() + "\"}");
            logger.error("Error deleting user {}: {}", event.get("pathParameters"), e.getMessage());
            return response;
        }
    }
}