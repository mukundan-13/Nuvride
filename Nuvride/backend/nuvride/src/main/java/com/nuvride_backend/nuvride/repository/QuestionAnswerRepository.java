package com.nuvride_backend.nuvride.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuvride_backend.nuvride.model.QuestionAnswer;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {
    Optional<QuestionAnswer> findByQuestionIgnoreCase(String question);
}
