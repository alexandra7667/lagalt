package com.lagaltcase.lagalt_be.user;


import com.lagaltcase.lagalt_be.dto.UserDTO;
import com.lagaltcase.lagalt_be.project.ProjectRepository;
import com.lagaltcase.lagalt_be.request.UserRequest;
import com.lagaltcase.lagalt_be.response.ErrorResponse;
import com.lagaltcase.lagalt_be.response.UserResponse;
import com.lagaltcase.lagalt_be.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private RoleRepository roleRepository;


    //If admin wants to create a user. Not used for regular sign up - See AuthController
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) { //Matches User json object props to User model fields. Does not use constructor for this
        //Add Role manually because the role name needs to be retrieved from RoleRepository
        List<Role> roles = new ArrayList<>();
        Role role = roleRepository.findByName(user.getRoles().get(0).getName())
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        roles.add(role);
        user.setRoles(roles);

        User newUser = this.userRepository.save(user);

        UserDTO userDTO = new UserDTO(newUser);

        UserResponse userResponse = new UserResponse();
        userResponse.set(userDTO);

        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        User user = this.userRepository.findById(userRequest.getId()).orElse(null);

        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user with that id found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        //Fields not provided in request will be ignored
        user.setUsername(userRequest.getUsername());
        user.setDescription(userRequest.getDescription());
        user.setHidden(userRequest.isHidden());
        user.setSkills(userRequest.getSkills());

        User updatedUser = this.userRepository.save(user);

        UserDTO userDTO = new UserDTO(updatedUser);

        UserResponse userResponse = new UserResponse();
        userResponse.set(userDTO);

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId) {
        System.out.println("Looking for user " + userId);
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

    @GetMapping //token is sent in header
    public ResponseEntity<?> getUserByToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("Could not authenticate user with provided token.");

            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetailsImpl.getEmail()).orElse(null);

        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("No user with that token found.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        UserDTO userDTO = new UserDTO(user);
        UserResponse userResponse = new UserResponse();
        userResponse.set(userDTO);

        return ResponseEntity.ok(userResponse);
    }
}

