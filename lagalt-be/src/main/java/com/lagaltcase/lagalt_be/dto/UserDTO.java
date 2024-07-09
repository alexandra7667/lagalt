package com.lagaltcase.lagalt_be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserDTO {
    private int id;
    private String username;
    private String email;
    private String description;
    private boolean hidden;
    private List<ProjectDTO> ownedProjects;
    private List<String> skills;
    // other fields as needed


    public UserDTO(int id, String username, String email, String description, boolean hidden, List<ProjectDTO> ownedProjects, List<String> skills) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.description = description;
        this.hidden = hidden;
        this.ownedProjects = ownedProjects;
        this.skills = skills;
    }
}