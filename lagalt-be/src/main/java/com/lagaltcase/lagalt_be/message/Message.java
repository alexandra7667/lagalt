package com.lagaltcase.lagalt_be.message;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lagaltcase.lagalt_be.project.Project;
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
    private int userId;

    @Column
    private String message;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
