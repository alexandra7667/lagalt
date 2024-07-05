package com.lagaltcase.lagalt_be.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lagaltcase.lagalt_be.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty
    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String websiteUrl;

    //A project can have many messages
    //A message belongs to one project
    //mappedBy = "project_id" means that Project is the owning side of the relationship
    //cascade means to delete all messages if the project is deleted
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Message> messageBoard = new ArrayList<>();

    @ManyToOne  //A project has only one owner. One user can own many projects
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore //Do not include user's details when returning a project as JSON file. Can be removed if we use DTOs
    private User user;

    @ManyToMany //A project can have many collaborators. A user can be a collaborator of many projects
    @JoinColumn(name = "user_id", nullable = false)
    private List<User> collaborators;

    @ManyToMany //A project can have many applicants. A user can be an applicant of many projects
    @JoinColumn(name = "user_id", nullable = false)
    private List<User> applicants;

    public Project(String title, String description, String websiteUrl) {
        this.title = title;
        this.description = description;
        this.websiteUrl = websiteUrl;
    }
}
