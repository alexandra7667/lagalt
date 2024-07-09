package com.lagaltcase.lagalt_be.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProjectRequest {
    private int userId;
    private int projectId;
    private String title;
    private String description;
    private String category;
    private String websiteUrl;
    private String status;
    private String neededSkill;
    private String tag;
}
