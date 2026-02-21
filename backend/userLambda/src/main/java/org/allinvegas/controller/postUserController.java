//package org.allinvegas.controller;
//
//import com.amazonaws.services.lambda.runtime.Context;
//import com.amazonaws.services.lambda.runtime.RequestHandler;
//import org.allinvegas.model.User;
//import org.allinvegas.services.dynamoDbUserService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import tools.jackson.databind.ObjectMapper;
//import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class postUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
//    private final dynamoDbUserService userService = new dynamoDbUserService();
//    private static final Logger logger = LoggerFactory.getLogger(postUserController.class);
//    private final ObjectMapper mapper = new ObjectMapper();
//
//    @Override
//    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
//        logger.info("Post User Method Invoked");
//        Map<String, Object> response = new HashMap<>();
//        try {
////            String userId = ((Map<String,String>) event.get("pathParameters")).get("userID");
//            String body = (String) event.get("body");
//            User user = mapper.readValue(body, User.class);
//
//            userService.postUser(user);
//
//            response.put("statusCode", 201);
//            response.put("body", "{\"status\":200,\"message\":\"User created.\"}");
//            return response;
//
//        } catch (ConditionalCheckFailedException e) {
//            response.put("statusCode", 400);
//            response.put("body", "{\"status\":400,\"message\":\"User already exists.\"}");
//            return response;
//        } catch (Exception e) {
//            response.put("statusCode", 500);
//            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error: "+ e.getMessage() + "\"}");
//            logger.error("Error creating user: {}", e.getMessage());
//            return response;
//        }
//    }
//}

package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.model.User;
import org.allinvegas.services.dynamoDbUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class postUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {

    private final dynamoDbUserService userService = new dynamoDbUserService();
    private static final Logger logger = LoggerFactory.getLogger(postUserController.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {

        logger.info("Post User Method Invoked");

        Map<String, Object> response = new HashMap<>();

        try {
            String body = (String) event.get("body");

            if (body == null || body.isBlank()) {
                response.put("statusCode", 400);
                response.put("body", "{\"status\":400,\"message\":\"Request body is required.\"}");
                return response;
            }

            User user = mapper.readValue(body, User.class);

            UUID newUserId = userService.postUser(user);

            response.put("statusCode", 201);
            response.put("body", "{\"userID\":\"" + newUserId + "\"}");
            return response;

        } catch (IllegalArgumentException e) {
            response.put("statusCode", 409);
            response.put("body", "{\"status\":409,\"message\":\"User already exists.\"}");
            return response;

        } catch (Exception e) {
            logger.error("Error creating user: {}", e.getMessage());
            response.put("statusCode", 500);
            response.put("body", "{\"status\":500,\"message\":\"Internal Server Error.\"}");
            return response;
        }
    }
}