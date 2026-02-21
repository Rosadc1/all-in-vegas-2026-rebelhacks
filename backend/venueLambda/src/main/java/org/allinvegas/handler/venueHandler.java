package org.allinvegas.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.allinvegas.controller.deleteVenueController;
import org.allinvegas.controller.getVenueController;
import org.allinvegas.controller.postVenueController;
import org.allinvegas.controller.updateVenueController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class venueHandler implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(venueHandler.class);

    private final getVenueController getVenueController = new getVenueController();
    private final updateVenueController updateVenueController = new updateVenueController();
    private final postVenueController postVenueController = new postVenueController();
    private final deleteVenueController deleteVenueController = new deleteVenueController();

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        logger.info("Lambda function invoked.");

        // Retrieve the HTTP Method
        // GET: Get the Venue
        // PATCH: Update the Venue attributes
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
            // Calls and Return the POST venueHandler
            return postVenueController.handleRequest(event, context);
        } else if (httpMethod.equals("GET")) {
            // Calls and Return the GET venueHandler
            return getVenueController.handleRequest(event, context);
        } else if (httpMethod.equals("PATCH")) {
            // Call and return the PATCH venueHandler
            return updateVenueController.handleRequest(event, context);
        } else if (httpMethod.equals("DELETE")) {
            return deleteVenueController.handleRequest(event, context);
        }
        else {
            return Map.of(
                    "statusCode", 405,
                    "body", "{\"status\":405,\"message\":\"Method Not Allowed\"}"
            );
        }
    }

}
