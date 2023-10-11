package com.avado.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = true)
    @NotEmpty
    private String userid;

    @Column(length = 10, nullable = true)
    @NotEmpty
    private String nickname;

    @Column(length = 30, nullable = true)
    @NotEmpty
    private String title;

    @Column(nullable = true)
    @NotEmpty
    private String content;

    @Column(nullable = true, updatable = false)
    @CreatedDate
    private LocalDateTime time;

    @PrePersist
    public void time() {
        this.time = LocalDateTime.now();
    }

}