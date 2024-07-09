package com.lagaltcase.lagalt_be.application;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column
    private String motivationalLetter;

    @ManyToOne //A project can have many applications. An application belongs to only one project
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Project project;

    public Application(User user, Project project, String motivationalLetter) {
        this.user = user;
        this.project = project;
        this.motivationalLetter = motivationalLetter;
    }
}
