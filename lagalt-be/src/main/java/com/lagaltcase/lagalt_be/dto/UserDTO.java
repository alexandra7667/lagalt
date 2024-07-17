package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
public class UserDTO {
    private int userId;
    private String username;
    private String email;
    private String description;
    private boolean isHidden;
    private List<AssociateDTO> associatedProjects;
    private List<String> skills;

    public UserDTO(User user) {
        List<AssociateDTO> associatedProjectDTOs = user.getAssociatedProjects().stream()
                .map(AssociateDTO::new)
                .collect(Collectors.toList());

        this.userId = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.description = user.getDescription();
        this.isHidden = user.isHidden();
        this.associatedProjects = associatedProjectDTOs;
        this.skills = user.getSkills();
    }
}