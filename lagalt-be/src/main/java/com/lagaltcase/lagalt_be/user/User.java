package com.lagaltcase.lagalt_be.user;

import com.lagaltcase.lagalt_be.associate.Associate;
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

    @Size(min = 4, max = 20, message = "Username should have 4-20 characters")
    @Column(unique = true)
    private String username;

    @Email(message = "Not valid email")
    @NotEmpty(message = "Email cannot be empty")
    @Column
    private String email;

    @Size(min = 8, max = 30, message = "Password should have 8-30 characters")
    @Column
    private String password;

    @Size(max = 750, message = "Description should have no more than 750 characters")
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

    //Associations this user has. A user has one associate per project that defines the user's role/s within that project
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Associate> associatedProjects  = new ArrayList<>();

    //Not needed in UserController. User is created directly by mapping the JSON object to this model's fields. Needed in AuthController
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
