package org.allinvegas.services;
import kong.unirest.Unirest;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class eventTagGenerator {
    private static final String apiKey = System.getenv("apiKey");



    List<String> createTagsFromAi(String description) {
        List<String> tags = new ArrayList<>();

        String prompt = """
    You will receive an event description.

    Return ONLY in this format:

    Summary: <one sentence>
    Tags: <comma-separated tags>

    Event:
    """ + description;

        JSONArray messages = new JSONArray()
                .put(new JSONObject()
                        .put("role", "user")
                        .put("content", prompt));

        JSONObject body = new JSONObject()
                .put("model", "deepseek-ai/DeepSeek-V3-0324")
                .put("messages", messages)
                .put("temperature", 0.3);

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

        String[] lines = output.split("\n");

        for (String line : lines) {
            if (line.startsWith("Tags:")) {
                String tagString = line.replace("Tags:", "").trim();

                String[] splitTags = tagString.split(",");

                for (String tag : splitTags) {
                    tags.add(tag.trim());
                }
                break;
            }
        }

        return tags;
    }


}
