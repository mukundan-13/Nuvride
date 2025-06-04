package com.nuvride_backend.nuvride.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nuvride_backend.nuvride.model.QuestionAnswer;
import com.nuvride_backend.nuvride.repository.QuestionAnswerRepository;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // for Vite dev server
public class QuestionAnswerController {

    @Autowired
    private QuestionAnswerRepository repository;

    @PostMapping
    public ResponseEntity<?> askQuestion(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        Optional<QuestionAnswer> match = repository.findByQuestionIgnoreCase(question);
        if (match.isPresent()) {
            return ResponseEntity.ok(Map.of("answer", match.get().getAnswer()));
        } else {
            return ResponseEntity.ok(Map.of("answer", "Sorry, I am not capable of it.Drop us on abc@gmail.com."));
        }
    }
}
