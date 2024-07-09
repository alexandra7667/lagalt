package com.lagaltcase.lagalt_be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProjectDTO {
    private int id;
    private String title;
    private String description;
    private String category;
    private String websiteUrl;
    private String status;
    private List<String> neededSkills;
    private List<String> tags;
    private List<AssociateDTO> collaborators;
    private List<ApplicationDTO> applications;

    public ProjectDTO(int id,
                      String title,
                      String description,
                      String category,
                      String websiteUrl,
                      String status,
                      List<String> neededSkills,
                      List<String> tags,
                      List<AssociateDTO> collaborators,
                      List<ApplicationDTO> applications) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.websiteUrl = websiteUrl;
        this.status = status;
        this.neededSkills = neededSkills;
        this.tags = tags;
        this.collaborators = collaborators;
        this.applications = applications;
    }
}