package org.allinvegas.handler;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.controller.deleteUserController;
import org.allinvegas.controller.getUserController;
import org.allinvegas.controller.postUserController;
import org.allinvegas.controller.updateUserController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class userHandler implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(userHandler.class);

    private final getUserController getUserController = new getUserController();
    private final updateUserController updateUserController = new updateUserController();
    private final postUserController postUserController = new postUserController();
    private final deleteUserController deleteUserController = new deleteUserController();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Lambda function invoked.");

        // Retrieve the HTTP Method
        // GET: Get the User
        // PATCH: Update the User attributes
        String httpMethod = (String) event.get("httpMethod");

        logger.info("event: " + event);
        logger.info("Context: " + context.toString());

        if (httpMethod == null) {
            logger.error("HTTP Method is missing in the Lambda event. Check API Gateway configuration.{}", event.toString());
            return Map.of(
                    "statusCode", 400,
                    "body", "{\"status\":400,\"message\":\"Bad Request: HTTP method not supplied.\"}"
            );
        }

        if (httpMethod.equals("POST")) {
            // Calls and Return the POST userHandler
            return postUserController.handleRequest(event, context);
        } else if (httpMethod.equals("GET")) {
            // Calls and Return the GET userHandler
            return getUserController.handleRequest(event, context);
        } else if (httpMethod.equals("PATCH")) {
            // Call and return the PATCH userHandler
            return updateUserController.handleRequest(event, context);
        } else if (httpMethod.equals("DELETE")) {
            return deleteUserController.handleRequest(event, context);
        }
        else {
            return Map.of(
                    "statusCode", 405,
                    "body", "{\"status\":405,\"message\":\"Method Not Allowed\"}"
            );
        }
    }
}
