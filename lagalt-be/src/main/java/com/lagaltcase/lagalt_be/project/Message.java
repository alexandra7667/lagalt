package com.lagaltcase.lagalt_be.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String userId;

    @Column
    private String message;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
