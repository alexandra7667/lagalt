package com.lagaltcase.lagalt_be.project;


import com.lagaltcase.lagalt_be.response.ErrorResponse;
import com.lagaltcase.lagalt_be.response.ProjectListResponse;
import com.lagaltcase.lagalt_be.response.ProjectResponse;
import com.lagaltcase.lagalt_be.user.User;
import com.lagaltcase.lagalt_be.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Ändra till localhost
@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;


    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequest projectRequest) { //User id is sent as part of the body, not as a parameter according to case requirements
        User user = userRepository.findById(projectRequest.getUserId()).orElse(null);

        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //TODO: Do null check on projectRequest's properties. Also do sanitation

        //Create via Project's constructor
        Project newProject = new Project(
                projectRequest.getTitle(),
                projectRequest.getDescription(),
                projectRequest.getCategory(),
                projectRequest.getWebsiteUrl(),
                user
        );

        Project savedProject = projectRepository.save(newProject);

        //Add project to user's ownedProjects
        user.getOwnedProjects().add(savedProject);
        //Update user to link the user-project relationship in the database
        userRepository.save(user);

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(savedProject);

        return new ResponseEntity<>(projectResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ProjectListResponse> getAllProjects() {
        List<Project> allProjects = this.projectRepository.findAll();

        ProjectListResponse projectListResponse = new ProjectListResponse();
        projectListResponse.set(allProjects);

        return ResponseEntity.ok(projectListResponse);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable int projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);

        if (project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(project);

        return ResponseEntity.ok(projectResponse);
    }

    @PutMapping
    public ResponseEntity<?> updateProject(@RequestBody ProjectRequest projectRequest) {
        Project project = projectRepository.findById(projectRequest.getProjectId()).orElse(null);
        if(project == null) return new ResponseEntity<>("No project found with that id", HttpStatus.NOT_FOUND);

        if(projectRequest.getDescription() != null) project.setDescription(projectRequest.getDescription());
        if(projectRequest.getStatus() != null) project.setStatus(projectRequest.getStatus());
        if(projectRequest.getWebsiteUrl() != null) project.setWebsiteUrl(projectRequest.getWebsiteUrl());

        if(projectRequest.getNewApplicantId() > 0) {
            User applicant = userRepository.findById(projectRequest.getNewApplicantId()).orElse(null);

            if (applicant == null) {
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.set("No applicant user with that id found.");

                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }

            project.getApplicants().add(applicant);
            //Add project to applicant's list
            applicant.getApplicationProjects().add(project);

            userRepository.save(applicant);
        }

        if(projectRequest.getNewCollaboratorId() > 0) {
            User collaborator = userRepository.findById(projectRequest.getNewCollaboratorId()).orElse(null);

            if (collaborator == null) {
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.set("No collaborator user with that id found.");

                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }

            project.getCollaborators().add(collaborator);
            collaborator.getCollaborationProjects().add(project);

            //Remove user as an applicant
            project.getApplicants().remove(collaborator);
            collaborator.getApplicationProjects().remove(project);

            userRepository.save(collaborator);
        }

        //TODO: Add needed skill and tag

        Project updatedProject = projectRepository.save(project);

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(updatedProject);

        return new ResponseEntity<>(projectResponse, HttpStatus.CREATED);
    }
}
