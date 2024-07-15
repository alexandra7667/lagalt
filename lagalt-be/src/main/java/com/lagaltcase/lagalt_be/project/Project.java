package com.lagaltcase.lagalt_be.project;

import com.lagaltcase.lagalt_be.associate.Associate;
import com.lagaltcase.lagalt_be.message.Message;
import jakarta.persistence.*;
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
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty
    @Column
    private String title;

    @Size(max = 750, message = "Description should have no more than 750 characters")
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

    //A project can have many messages. A message belongs to one project
    //mappedBy = "project" means that Project is the owning side of the relationship
    //cascade means to delete all messages if the project is deleted
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Message> messageBoard = new ArrayList<>();

    //Associated users this project has. A project can have many associated users. An associate object belongs to only one project
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Associate> associatedUsers  = new ArrayList<>();

    public Project(String title, String description, String category, String websiteUrl) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.websiteUrl = websiteUrl;
        //this.user = user;
        this.status = "Founding";
    }
}
