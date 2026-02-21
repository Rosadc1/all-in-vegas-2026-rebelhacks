package org.allinvegas.services;

import kong.unirest.*;
import kong.unirest.json.*;

import org.allinvegas.model.Event;

import java.util.*;

public class aiService {

    private static final String apiKey = System.getenv("apiKey");
    private final tools.jackson.databind.ObjectMapper mapper = new tools.jackson.databind.ObjectMapper();

    public String recommendEvents(String userPrompt, List<Event> events) {

        String prompt = buildRecommendationPrompt(userPrompt, events);

        JSONArray messages = new JSONArray()
                .put(new JSONObject()
                        .put("role", "user")
                        .put("content", prompt));

        JSONObject body = new JSONObject()
                .put("model", "deepseek-ai/DeepSeek-V3-0324")
                .put("messages", messages)
                .put("temperature", 0.2);

        HttpResponse<JsonNode> response = Unirest.post("https://api.featherless.ai/v1/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(body)
                .asJson();




        return response.getBody().getObject()
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");
    }

    private String buildRecommendationPrompt(String userPrompt, List<Event> events) {

        JSONArray eventArray = new JSONArray();

        String json = mapper.writeValueAsString(events);

        return """
        You are an event recommendation system.

        User preferences:
        """ + userPrompt + """

        From the list of events below, return ONLY the title of events the user would like.

        Rules:
       
        
        STRICT RULES:
            - Output ONLY plain text.
            - NO Markdown formatting (no **, no ##, no backticks).
            - NO bullet points or lists.
            - NO bolding or italics.
            - Write it as a single, natural paragraph.
            - Start with a friendly greeting.
            - Use tags, title, and description ONLY
            - Return as a Single String
            - No explanations,
            - No List, only a a plain string

        Events:
        """ + eventArray.toString();
    }
}