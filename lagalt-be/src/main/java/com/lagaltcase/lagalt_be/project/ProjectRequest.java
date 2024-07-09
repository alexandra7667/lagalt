package com.lagaltcase.lagalt_be.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProjectRequest {
    private int userId;
    private String title;
    private String description;
    private String category;
    private String websiteUrl;
    //status, collaborators, applicants, message board, needed skills, tags, category
    private int projectId;
    private String status;
    private int newCollaboratorId;
    private String motivationalLetter;
    private String neededSkill;
    private String tag;
}
