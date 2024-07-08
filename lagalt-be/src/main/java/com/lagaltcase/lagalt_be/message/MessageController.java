package com.lagaltcase.lagalt_be.message;

import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Ändra till localhost
@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<?> createMessage(@RequestBody MessageRequest messageRequest) {
        Project project = projectRepository.findById(messageRequest.getProjectId()).orElse(null);
        if(project == null) return new ResponseEntity<>("No project found with that id", HttpStatus.NOT_FOUND);

        //Check for null & sanitize
        System.out.println("In message controller. User id: " + messageRequest.getUserId());

        Message newMessage = new Message();
        newMessage.setProject(project);
        newMessage.setUserId(messageRequest.getUserId());
        newMessage.setMessage(messageRequest.getMessage());

        //project.getMessageBoard().add(newMessage); OBS Creates duplicates
        projectRepository.save(project);    //Needed?

        Message savedMessage = messageRepository.save(newMessage);

        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getAllMessages(@PathVariable int projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);

        List<Message> allMessages = project.getMessageBoard();

        return new ResponseEntity<>(allMessages, HttpStatus.OK);
    }
}
