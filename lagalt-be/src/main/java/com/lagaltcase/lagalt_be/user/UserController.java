package com.lagaltcase.lagalt_be.user;


import com.lagaltcase.lagalt_be.project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Ändra
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    //Lägg till Project Repo
    @Autowired
    private ProjectRepository projectRepository;


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User newUser = this.userRepository.save(user);

//        UserResponse userResponse = new UserResponse();
//        userResponse.set(newUser);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }


//    @GetMapping
//    public ResponseEntity<UserListResponse> getAllUsers() {
//        List<User> allUsers = this.userRepository.findAll();
//
//        UserListResponse userListResponse = new UserListResponse();
//        userListResponse.set(allUsers);
//
//        return ResponseEntity.ok(userListResponse);
//    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId) {
        User user = this.userRepository.findById(userId).orElse(null);

//        if (user == null) {
//            ErrorResponse errorResponse = new ErrorResponse();
//            errorResponse.set("No user with that id found.");
//
//            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
//        }
//
//        UserResponse userResponse = new UserResponse();
//        userResponse.set(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

