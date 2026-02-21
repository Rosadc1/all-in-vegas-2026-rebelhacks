package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.services.dynamoDbUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class getUserIDByUserNameController implements RequestHandler<Map<String,Object>, Map<String,Object>> {

    private final dynamoDbUserService userService = new dynamoDbUserService();
    private static final Logger logger = LoggerFactory.getLogger(getUserIDByUserNameController.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {

        logger.info("GetUserIDByUserName invoked");

        Map<String, Object> response = new HashMap<>();

        try {
            String userName = ((Map<String,String>) event.get("pathParameters")).get("userName");
            String body = (String) event.get("body");

            if (body == null || body.isBlank()) {
                response.put("statusCode", 400);
                response.put("body", "{\"status\":400,\"message\":\"Request body is required.\"}");
                return response;
            }

            Map<String, String> credentials = mapper.readValue(body, Map.class);

            String passwordHash = credentials.get("passwordHash");

            if (userName == null || passwordHash == null) {
                response.put("statusCode", 400);
                response.put("body", "{\"status\":400,\"message\":\"Missing userName or passwordHash.\"}");
                return response;
            }

            String userID = userService.getUserIDByUserName(userName, passwordHash);

            if (userID == null) {
                response.put("statusCode", 404);
                response.put("body", "{\"status\":404,\"message\":\"Invalid credentials.\"}");
                return response;
            }

            response.put("statusCode", 200);
            response.put("body", "{\"userID\":\"" + userID + "\"}");
            return response;

        } catch (Exception e) {
            logger.error("Error in getUserIDByUserNameController: {}", e.getMessage());
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error.\"}");
            return response;
        }
    }
}