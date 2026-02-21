package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

public class getEventController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(getEventController.class);
    private final ObjectMapper mapper = new ObjectMapper();


    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {

        return null;
    }
}