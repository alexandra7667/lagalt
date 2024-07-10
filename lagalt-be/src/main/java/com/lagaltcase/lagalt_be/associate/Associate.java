package com.lagaltcase.lagalt_be.associate;

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
@Table(name = "associates")
public class Associate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne //A project can have many associates. An associate belongs to only one project (a user has many associate objects)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column
    private boolean isOwner;

    @Column
    private boolean isVisitor;

    @Column
    private boolean isCollaborator;

    @Column
    private boolean isPortfolioProject; //User==collaborator && project.status==Completed

    public Associate(User user, Project project) {
        this.user = user;
        this.project = project;
    }
}
