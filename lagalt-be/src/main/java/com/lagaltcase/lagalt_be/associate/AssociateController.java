package com.lagaltcase.lagalt_be.associate;

import com.lagaltcase.lagalt_be.dto.AssociateDTO;
import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.request.AssociateRequest;
import com.lagaltcase.lagalt_be.response.AssociateResponse;
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
@RequestMapping("/associates")
public class AssociateController {
    @Autowired
    private AssociateRepository associateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/makeVisitor")
    public ResponseEntity<?> makeVisitor(@RequestBody AssociateRequest associateRequest) {
        User user = userRepository.findById(associateRequest.getUserId()).orElse(null); //The user who makes the request
        Project project = projectRepository.findById(associateRequest.getProjectId()).orElse(null);

        if (user == null || project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //TODO: Null check on request props & input sanitation

        Associate associate = new Associate(user, project);

        associateRepository.save(associate); //Must add associate to repository because it is a new Associate object (cascade only works on existing objects)
        userRepository.save(user);
        projectRepository.save(project);

        AssociateDTO associateDTO = new AssociateDTO(associate);

        AssociateResponse associateResponse = new AssociateResponse();
        associateResponse.set(associateDTO);

        return ResponseEntity.ok(associateResponse);
    }

    @PutMapping("/makeApplicant")
    public ResponseEntity<?> makeApplicant(@RequestBody AssociateRequest associateRequest) {
        User user = userRepository.findById(associateRequest.getUserId()).orElse(null);
        Project project = projectRepository.findById(associateRequest.getProjectId()).orElse(null);

        if (user == null || project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //TODO: Null check & input sanitation

        AssociateDTO associateDTO = null;

        List<Associate> associatedProjects = user.getAssociatedProjects();
        for(Associate associate : associatedProjects) {
            if(associate.getProject() == project) {
                addApplication(associate, associateRequest.getMotivationalLetter());
                associateDTO = new AssociateDTO(associate);
                break;
            }
        }

        userRepository.save(user);
        projectRepository.save(project);

        AssociateResponse associateResponse = new AssociateResponse();
        associateResponse.set(associateDTO);

        return ResponseEntity.ok(associateResponse);
    }

    @PutMapping("/handleApplication")
    public ResponseEntity<?> handleApplication(@RequestBody AssociateRequest associateRequest) {
        User user = userRepository.findById(associateRequest.getUserId()).orElse(null); //The project owner. May need later for authorization
        Project project = projectRepository.findById(associateRequest.getProjectId()).orElse(null);

        if (user == null || project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user/project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //TODO: Null check & input sanitation

        AssociateDTO associateDTO = null;

        List<Associate> associatedUsers = project.getAssociatedUsers();

        for(Associate associate : associatedUsers) {
            if(associate.getUser().getId() == associateRequest.getApplicantId()) {
                if(associateRequest.isApplicationAccepted()) acceptApplication(associate);
                else denyApplication(associate);
                associateDTO = new AssociateDTO(associate);
                break;
            }
        }

        userRepository.save(user);
        projectRepository.save(project);

        AssociateResponse associateResponse = new AssociateResponse();
        associateResponse.set(associateDTO);

        return ResponseEntity.ok(associateResponse);
    }

    private void addApplication(Associate associate, String motivationalLetter) {
        associate.setApplicationDenied(false);
        associate.setApplicant(true);
        associate.setMotivationalLetter(motivationalLetter);
    }

    private void acceptApplication(Associate associate) {
        associate.setApplicant(false);
        associate.setCollaborator(true);
    }

    private void denyApplication(Associate associate) {
        associate.setApplicationDenied(true);
        associate.setApplicant(false);
        associate.setMotivationalLetter(null);
    }
}
