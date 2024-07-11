package com.lagaltcase.lagalt_be.user;


import com.lagaltcase.lagalt_be.dto.UserDTO;
import com.lagaltcase.lagalt_be.project.Project;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.response.ErrorResponse;
import com.lagaltcase.lagalt_be.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") //Ändra
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) { //Matches User json object props to User model fields. Does not use constructor for this
        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user with that id found");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        User newUser = this.userRepository.save(user);

        UserDTO userDTO = new UserDTO(user);

        UserResponse userResponse = new UserResponse();
        userResponse.set(userDTO);

        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId) {
        User user = this.userRepository.findById(userId).orElse(null);

        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        UserDTO userDTO = new UserDTO(user);

        UserResponse userResponse = new UserResponse();
        userResponse.set(userDTO);

        return ResponseEntity.ok(userResponse);
    }
}

