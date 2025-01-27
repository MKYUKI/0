package com.example.deepseek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@SpringBootApplication
@RestController
@RequestMapping("/deepseek")
public class DeepseekProxy {

    public static void main(String[] args) {
        SpringApplication.run(DeepseekProxy.class, args);
    }

    @PostMapping("/chat")
    public Map<String, Object> callDeepseek(@RequestBody Map<String,Object> body) {
        // body => { "messages": [...], "model": "..." } (無視してOK)
        String answer = "Hello from Java Mock! Everything is working. [ts="
                + System.currentTimeMillis() + "]";

        // 200 OK => { "content": "...mock..." }
        return Map.of("content", answer);
    }
}
