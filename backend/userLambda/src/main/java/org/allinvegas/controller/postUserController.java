package org.allinvegas.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import tools.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class postUserController implements RequestHandler<Map<String,Object>, Map<String,Object>> {
    private static final Logger logger = LoggerFactory.getLogger(postUserController.class);
    private final ObjectMapper mapper = new ObjectMapper();


    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {

        return null;
    }
}
