package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private List<String> neededSkills;
    private List<String> tags;
}