// File: 0/java/src/main/java/com/example/deepseek/DeepseekProxy.java
package com.example.deepseek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Random;

@SpringBootApplication
@RestController
@RequestMapping("/deepseek")
public class DeepseekProxy {

    private static final String[] RANDOMS = {
            "Java mock #1",
            "Java mock #2",
            "Java mock #3"
    };
    private final Random rand = new Random();

    public static void main(String[] args) {
        SpringApplication.run(DeepseekProxy.class, args);
    }

    @PostMapping("/chat")
    public Map<String,Object> handleChat(@RequestBody Map<String,Object> body){
        long now = System.currentTimeMillis();
        String base = "Hello from Java Mock! Everything is working. [ts="+now+"]";
        String extra = RANDOMS[rand.nextInt(RANDOMS.length)];
        return Map.of("content", base+" / "+ extra);
    }
}
