package com.lagaltcase.lagalt_be.associate;

import com.lagaltcase.lagalt_be.dto.AssociateDTO;
import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.project.ProjectRequest;
import com.lagaltcase.lagalt_be.response.AssociateResponse;
import com.lagaltcase.lagalt_be.user.User;
import com.lagaltcase.lagalt_be.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping
    public ResponseEntity<?> updateAssociation(@RequestBody ProjectRequest projectRequest) { //Change to Associate request
        User user = userRepository.findById(projectRequest.getUserId()).orElse(null);
        Project project = projectRepository.findById(projectRequest.getProjectId()).orElse(null);

        //TODO: Null check & input sanitation

        AssociateDTO associateDTO = null;

        List<Associate> associatedProjects = user.getAssociatedProjects();
        for(Associate associate : associatedProjects) {
            if(associate.getProject() == project) {
                //if associate is collaborator. make a switch?
                associate.setCollaborator(false);
                associateDTO = new AssociateDTO(associate);
                break;
            }
        }

        //Since both user and project is a parent of associate, both repos need to be updated.
        //Since cascade type is all, the associate (child) repo does not need to be updated
        userRepository.save(user);
        projectRepository.save(project);

        AssociateResponse associateResponse = new AssociateResponse();
        associateResponse.set(associateDTO);

        return ResponseEntity.ok(associateResponse);
    }
}
