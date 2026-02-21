package org.allinvegas.services;

import kong.unirest.*;
import kong.unirest.json.*;

import org.allinvegas.model.Event;

import java.util.*;

public class aiService {

    private static final String apiKey = System.getenv("apiKey");

    public List<String> recommendEvents(String userPrompt, List<Event> events) {

        List<String> recommended = new ArrayList<>();

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

        String output = response.getBody()
                .getObject()
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");

        JSONArray result = new JSONArray(output);

        for (int i = 0; i < result.length(); i++) {
            recommended.add(result.getString(i));
        }

        return recommended;
    }

    private String buildRecommendationPrompt(String userPrompt, List<Event> events) {

        JSONArray eventArray = new JSONArray();

        for (Event e : events) {
            JSONObject obj = new JSONObject()
                    .put("eventID", e.getEventID().toString())
                    .put("title", e.getTitle())
                    .put("description", e.getDescription())
                    .put("location", e.getLocation())
                    .put("tags", e.getTag());

            eventArray.put(obj);
        }

        return """
        You are an event recommendation system.

        User preferences:
        """ + userPrompt + """

        From the list of events below, return ONLY the title of events the user would like.

        Rules:
        - Use tags, title, and description
        - Return as a JSON array of Strings 
        - No explanations

        Events:
        """ + eventArray.toString();
    }
}