package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AssociateRequest {
    private int projectId;
    private int userId;
    private int associateId;
    private String type;
    private String motivationalLetter;
    private boolean isOwner;
    private boolean isVisitor;
    private boolean isCollaborator;
    private boolean isPortfolioProject;
}