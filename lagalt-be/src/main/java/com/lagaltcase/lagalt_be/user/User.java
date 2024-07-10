package com.lagaltcase.lagalt_be.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lagaltcase.lagalt_be.application.Application;
import com.lagaltcase.lagalt_be.project.Project;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String username;

    @Email(message = "Not valid email")
    @NotEmpty(message = "Email cannot be empty")
    @Column
    private String email;

    @Size(min = 8, message = "Password should have at least 8 characters")
    @NotEmpty(message = "Password cannot be empty")
    @Column
    private String password;

    @Column
    private String description;

    @Column
    private boolean hidden = false;

    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;

    @ElementCollection //To store a collection of strings in database (OneToMany is only for objects that are entities/tables)
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_id")) //Sets FK and names table and column
    @Column
    private List<String> skills;

    //Projects this user owns. A user can own many projects. A project can have only one owner
    @OneToMany(mappedBy = "user")
    private List<Project> ownedProjects  = new ArrayList<>();

    //Projects this user has applied to but not yet been accepted to
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) //Updates in the Application repository will update user automatically
    private List<Application> applications = new ArrayList<>();

    //Projects this user is a collaborator of
    @ManyToMany(mappedBy = "collaborators")
    private List<Project> collaborationProjects = new ArrayList<>();

    //Projects this user has visited (clicked on)
    @ManyToMany(mappedBy = "visitors")
    private List<Project> visitedProjects = new ArrayList<>();

    //Projects this user has collaborated on that have status "Completed" aka user's portfolio
    @ManyToMany(mappedBy = "contributors")
    private List<Project> contributedProjects = new ArrayList<>();


    public User(String email, String password) { //Not needed. User is created directly by mapping the JSON object to this model's fields
        //this.userName = "john doe"; //Replace with randomly generated name
        this.email = email;
        this.password = password;
    }
}
