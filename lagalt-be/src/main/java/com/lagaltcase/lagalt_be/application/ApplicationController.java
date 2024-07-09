package com.lagaltcase.lagalt_be.application;


import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.project.ProjectRequest;
import com.lagaltcase.lagalt_be.response.ApplicationResponse;
import com.lagaltcase.lagalt_be.response.ErrorResponse;
import com.lagaltcase.lagalt_be.user.User;
import com.lagaltcase.lagalt_be.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Ändra till localhost
@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> addApplication(@RequestBody ApplicationRequest applicationRequest) {

        //TODO: Input sanitation

        Project project = projectRepository.findById(applicationRequest.getProjectId()).orElse(null);
        User applicant = userRepository.findById(applicationRequest.getUserId()).orElse(null);

        if (project == null || applicant == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        Application newApplication = new Application(
                applicant,
                project,
                applicationRequest.getMessage() //Motivational letter from applicant
        );

        project.getApplications().add(newApplication);
        //Add application to applicant's list
        applicant.getApplications().add(newApplication);

        //Save user to repository? Not needed when using cascade all?
        //userRepository.save(applicant);

        //Save project to repository?
        //projectRepository.save(project);

        //Save application to repository
        Application savedApplication = applicationRepository.save(newApplication);

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.set(savedApplication);

        return new ResponseEntity<>(applicationResponse, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> acceptApplication(@RequestBody ApplicationRequest applicationRequest) {
        Project project = projectRepository.findById(applicationRequest.getProjectId()).orElse(null);
        User collaborator = userRepository.findById(applicationRequest.getUserId()).orElse(null);
        Application application = applicationRepository.findById(applicationRequest.getApplicationId()).orElse(null);

        if (project == null || collaborator == null || application == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project/application with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //Remove application
        project.getApplications().remove(application);
        collaborator.getApplications().remove(application);

        //Add collaborator
        project.getCollaborators().add(collaborator);
        collaborator.getCollaborationProjects().add(project);

        applicationRepository.delete(application);

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.set(application);

        return ResponseEntity.ok(applicationResponse);
    }

    @DeleteMapping
    public ResponseEntity<?> denyApplication(@RequestBody ApplicationRequest applicationRequest) {
        Project project = projectRepository.findById(applicationRequest.getProjectId()).orElse(null);
        User applicant = userRepository.findById(applicationRequest.getUserId()).orElse(null);
        Application application = applicationRepository.findById(applicationRequest.getApplicationId()).orElse(null);

        if (project == null || applicant == null || application == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project/application with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        project.getApplications().remove(application);
        applicant.getApplications().remove(application);

        //TODO: Update user that their application was denied. Eg new list in User: deniedApplications (maybe including a message from project owner)

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.set(application);

        return ResponseEntity.ok(applicationResponse);
    }
}
