package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
public class UserDTO {
    private int id;
    private String username;
    private String email;
    private String description;
    private boolean isHidden;
    private List<AssociateDTO> associations;
    private List<String> skills;

    public UserDTO(User user) {
        List<AssociateDTO> associatedProjectDTOs = user.getAssociatedProjects().stream()
                .map(AssociateDTO::new)
                .collect(Collectors.toList());

        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.description = user.getDescription();
        this.isHidden = user.isHidden();
        this.associations = associatedProjectDTOs;
        this.skills = user.getSkills();
    }
}