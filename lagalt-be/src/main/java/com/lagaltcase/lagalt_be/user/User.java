package com.lagaltcase.lagalt_be.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String screenName;

    @Email(message = "Not valid email")
    @NotEmpty(message = "Email cannot be empty")
    @Column
    private String email;

    @Size(min = 8, message = "Password should have at least 8 characters")
    @NotEmpty(message = "Password cannot be empty")
    @Column
    private String password;

    //Projects this user owns. A user can own many projects. A project can have only one owner
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Project> ownedProjects  = new ArrayList<>();

    //Projects this user is a collaborator of
    @ManyToMany(mappedBy = "collaborators")
    @JsonIgnoreProperties("collaborators")
    private List<Project> collaborationProjects = new ArrayList<>();

    //Projects this user has applied to but not yet been accepted
    @ManyToMany(mappedBy = "applicants")
    @JsonIgnoreProperties("applicants")
    private List<Project> applicationProjects = new ArrayList<>();


    public User(String email, String password) {
        this.screenName = "john doe"; //Replace with randomly generated name
        this.email = email;
        this.password = password;
    }
}
