package com.lagaltcase.lagalt_be.response;

import com.lagaltcase.lagalt_be.associate.Associate;
import com.lagaltcase.lagalt_be.dto.AssociateDTO;
import com.lagaltcase.lagalt_be.dto.ProjectDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type;
    private int id;
    private String email;
    private String username;
    private String description;
    private boolean hidden;
    private List<String> skills;
    private List<AssociateDTO> associations;

    public JwtResponse(String token, int id, String email, String username, String description, boolean hidden, List<String> skills, List<Associate> associatedProjects) {
        List<AssociateDTO> associateDTOS = associatedProjects.stream()
                .map(AssociateDTO::new)
                .collect(Collectors.toList());

        this.token = token;
        this.type  = "Bearer";
        this.id = id;
        this.email = email;
        this.username = username;
        this.description = description;
        this.hidden = hidden;
        this.skills = skills;
        this.associations = associateDTOS;
    }
}