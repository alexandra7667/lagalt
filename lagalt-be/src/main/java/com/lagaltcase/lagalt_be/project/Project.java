package com.lagaltcase.lagalt_be.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lagaltcase.lagalt_be.message.Message;
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
    private String category;

    @Column
    private String websiteUrl;

    @Column
    private String status;

    @ElementCollection
    @CollectionTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"))
    @Column
    private List<String> neededSkills;

    @ElementCollection
    @CollectionTable(name = "project_tags", joinColumns = @JoinColumn(name = "project_id"))
    @Column
    private List<String> tags;

    //A project can have many messages
    //A message belongs to one project
    //mappedBy = "project" means that Project is the owning side of the relationship
    //cascade means to delete all messages if the project is deleted
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Message> messageBoard = new ArrayList<>();

    @ManyToOne  //A project has only one owner. One user can own many projects
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore //Do not include user's details when returning a project as JSON file. Can be removed if we use DTO that exclude User
    private User user;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Application> applications = new ArrayList<>();

    //Create an in-between table for a many to many relationship
    @ManyToMany
    @JoinTable(
            name = "user_collaboration_projects",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties("collaborationProjects") //Ignore the user's projects to avoid looping. List of collaborators will be returned
    private List<User> collaborators = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_visited_projects",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties("visitedProjects")
    private List<User> visitors = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_contributed_projects",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties("contributedProjects")
    private List<User> contributors = new ArrayList<>();


    public Project(String title, String description, String category, String websiteUrl, User user) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.websiteUrl = websiteUrl;
        this.user = user;
        this.status = "Founding";
    }
}
