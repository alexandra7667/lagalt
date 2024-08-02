package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.associate.Associate;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssociateDTO {
    private int id;
    private int userId;
    private String username;
    private List<String> skills;
    private int projectId;
    private String projectTitle;
    private boolean isOwner;
    private boolean isVisitor;
    private boolean isApplicant;
    private String motivationalLetter;
    private boolean isCollaborator;
    private boolean isPortfolioProject;
    private boolean applicationDenied;

    public AssociateDTO(Associate associate) {
        this.id = associate.getId();
        this.userId = associate.getUser().getId();
        this.username = associate.getUser().getUsername();
        this.skills = associate.getUser().getSkills();
        this.projectId = associate.getProject().getId();
        this.projectTitle = associate.getProject().getTitle();
        this.isOwner = associate.isOwner();
        this.isVisitor = associate.isVisitor();
        this.isApplicant = associate.isApplicant();
        this.motivationalLetter = associate.getMotivationalLetter();
        this.isCollaborator = associate.isCollaborator();
        this.isPortfolioProject = associate.isPortfolioProject();
        this.applicationDenied = associate.isApplicationDenied();
    }
}
