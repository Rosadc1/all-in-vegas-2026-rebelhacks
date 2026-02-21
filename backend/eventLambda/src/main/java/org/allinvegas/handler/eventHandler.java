package org.allinvegas.handler;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.controller.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class eventHandler implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(eventHandler.class);

    private final getEventController getEventController = new getEventController();
    private final updateEventController updateEventController = new updateEventController();
    private final postEventController postEventController = new postEventController();
    private final deleteEventController deleteEventController = new deleteEventController();
    private  final getListEventController getListEventController = new getListEventController();
    private  final getListEventByIDController getListEventByIDController = new getListEventByIDController();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Lambda function invoked.");

        // Retrieve the HTTP Method
        // GET: Get the Event
        // PATCH: Update the Event attributes
        String httpMethod = (String) event.get("httpMethod");
        String path = (String)event.get("path");

        logger.info("event: " + event);
        logger.info("Context: " + context.toString());

        if (httpMethod == null) {
            logger.error("HTTP Method is missing in the Lambda event. Check API Gateway configuration.{}", event.toString());
            return Map.of(
                    "statusCode", 400,
                    "body", "{\"status\":400,\"message\":\"Bad Request: HTTP method not supplied.\"}"
            );
        }

        if (path == null) {
            logger.error("path is missing in the Lambda event. Check API Gateway configuration.{}", event.toString());
            return Map.of(
                    "statusCode", 400,
                    "body", "{\"status\":400,\"message\":\"Bad Request: Path not supplied.\"}"
            );
        }

        if (httpMethod.equals("POST")) {
            // Calls and Return the POST eventHandler
            return postEventController.handleRequest(event, context);
        } else if (httpMethod.equals("GET")) {
            // Calls and Return the GET eventHandler
            if (path.startsWith("/events/{userID}")) {
                return getListEventByIDController.handleRequest(event, context);
            } else if (path.startsWith("/events")) {
                return getListEventController.handleRequest(event, context);
            } else if (path.startsWith("/event/{eventID}")) {
                return getEventController.handleRequest(event, context);
            } else {
                logger.error("Invalid HTTP Method. Check API Gateway configuration.{}", event.toString());
                return Map.of(
                        "statusCode", 405,
                        "body", "{\"status\":405,\"message\":\"Method Not Allowed\"}"
                );
            }
        } else if (httpMethod.equals("PATCH")) {
            // Call and return the PATCH eventHandler
            return updateEventController.handleRequest(event, context);
        } else if (httpMethod.equals("DELETE")) {
            return deleteEventController.handleRequest(event, context);
        }
        else {
            return Map.of(
                    "statusCode", 405,
                    "body", "{\"status\":405,\"message\":\"Method Not Allowed\"}"
            );
        }
    }

}
