package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.associate.Associate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssociateDTO {
    private int id;
    private int userId;
    private int projectId;
    private boolean isOwner;
    private boolean isVisitor;
    private boolean isCollaborator;
    private boolean isPortfolioProject;

    public AssociateDTO(Associate associate) {
        this.id = associate.getId();
        this.userId = associate.getUser().getId();
        this.projectId = associate.getProject().getId();
        this.isOwner = associate.isOwner();
        this.isVisitor = associate.isVisitor();
        this.isCollaborator = associate.isCollaborator();
        this.isPortfolioProject = associate.isPortfolioProject();
    }
}
