package com.lagaltcase.lagalt_be.dto;


import com.lagaltcase.lagalt_be.application.Application;
import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DtoMapper {
    public static UserDTO toUserDTO(User user) {
        List<ProjectDTO> ownedProjectDTOs = user.getOwnedProjects().stream()
                .map(DtoMapper::toProjectDTO)
                .collect(Collectors.toList());

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getDescription(),
                user.isHidden(),
                ownedProjectDTOs,
                user.getSkills()
        );

        return userDTO;
    }

    public static ProjectDTO toProjectDTO(Project project) {
        List<AssociateDTO> collaborators = project.getCollaborators().stream()
                .map(DtoMapper::toAssociateDTO) //Each user object in collaborators is mapped to an associate dto
                .collect(Collectors.toList());

        List<ApplicationDTO> applications = project.getApplications().stream()
                .map(DtoMapper::toApplicationDTO) //Each user object in collaborators is mapped to an associate dto
                .collect(Collectors.toList());

        ProjectDTO projectDTO = new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCategory(),
                project.getWebsiteUrl(),
                project.getStatus(),
                project.getNeededSkills(),
                project.getTags(),
                collaborators,
                applications
        );

        return projectDTO;
    }

    //Applicant, collaborator, contributor where there is only need for user's id and name
    public static AssociateDTO toAssociateDTO(User user) {
        AssociateDTO associateDTO = new AssociateDTO(
                user.getId(),
                user.getUsername()
        );

        return associateDTO;
    }

    public static ApplicationDTO toApplicationDTO(Application application) {
        ApplicationDTO applicationDTO = new ApplicationDTO(
                application.getId(),
                application.getUser().getId(),
                application.getMotivationalLetter()
        );

        return applicationDTO;
    }
}

