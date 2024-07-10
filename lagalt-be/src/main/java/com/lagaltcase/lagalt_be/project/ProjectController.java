package com.lagaltcase.lagalt_be.project;


import com.lagaltcase.lagalt_be.associate.Associate;
import com.lagaltcase.lagalt_be.associate.AssociateRepository;
import com.lagaltcase.lagalt_be.dto.ProjectDTO;
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
import java.util.stream.Collectors;

@CrossOrigin(origins = "*") //Ändra till localhost
@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AssociateRepository associateRepository;

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
                projectRequest.getWebsiteUrl()
        );

        //Set associate
        Associate associate = new Associate(user, newProject);
        associate.setOwner(true);
        associate.setVisitor(true);
        associate.setCollaborator(true);
        newProject.getAssociatedUsers().add(associate);
        user.getAssociatedProjects().add(associate);

        Project savedProject = projectRepository.save(newProject);
        associateRepository.save(associate);

        ProjectDTO projectDTO = new ProjectDTO(savedProject);

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(projectDTO);

        return new ResponseEntity<>(projectResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ProjectListResponse> getAllProjects() {
        List<Project> allProjects = this.projectRepository.findAll();

        List<ProjectDTO> projectDTOS = allProjects.stream()
                .map(ProjectDTO::new) //"method reference" same functionality as .map(project -> new ProjectDTO(project))
                .collect(Collectors.toList());

        ProjectListResponse projectListResponse = new ProjectListResponse();
        projectListResponse.set(projectDTOS);

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

        ProjectDTO projectDTO = new ProjectDTO(project);

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(projectDTO);

        return ResponseEntity.ok(projectResponse);
    }

    @PutMapping
    public ResponseEntity<?> updateProject(@RequestBody ProjectRequest projectRequest) {
        Project project = projectRepository.findById(projectRequest.getProjectId()).orElse(null);
        if(project == null) return new ResponseEntity<>("No project found with that id", HttpStatus.NOT_FOUND);

        if(projectRequest.getDescription() != null) project.setDescription(projectRequest.getDescription());
        if(projectRequest.getWebsiteUrl() != null) project.setWebsiteUrl(projectRequest.getWebsiteUrl());

        if(projectRequest.getStatus() != null) {
            project.setStatus(projectRequest.getStatus());

//            if(projectRequest.getStatus().equalsIgnoreCase("Completed")) {
//                //Move all current collaborators to contributor list
//                List<User> collaborators = project.getCollaborators();
//                //project.getContributors().addAll(collaborators);
//                //Add project to users' portfolio
//                for(User user : collaborators) {
//                    user.getContributedProjects().add(project);
//                }
//            }
        }

        //TODO: Add needed skill and tag

        Project updatedProject = projectRepository.save(project);

        ProjectDTO projectDTO = new ProjectDTO(updatedProject);

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.set(projectDTO);

        return new ResponseEntity<>(projectResponse, HttpStatus.CREATED);
    }
}
