package com.lagaltcase.lagalt_be.message;

import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.response.ErrorResponse;
import com.lagaltcase.lagalt_be.response.MessageListResponse;
import com.lagaltcase.lagalt_be.response.MessageResponse;
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

        if (project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //TODO: Check for null & sanitize. Re-style to fit constructor

        Message newMessage = new Message();
        newMessage.setProject(project);
        newMessage.setUserId(messageRequest.getUserId());
        newMessage.setMessage(messageRequest.getMessage());

        Message savedMessage = messageRepository.save(newMessage);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.set(savedMessage);

        return new ResponseEntity<>(messageResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getAllMessages(@PathVariable int projectId) { //TODO: Change to List response
        Project project = projectRepository.findById(projectId).orElse(null);

        if (project == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No project with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        List<Message> allMessages = project.getMessageBoard();

        MessageListResponse messageListResponse = new MessageListResponse();
        messageListResponse.set(allMessages);

        return ResponseEntity.ok(messageListResponse);
    }
}
