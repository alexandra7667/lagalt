package com.lagaltcase.lagalt_be.security;

import com.lagaltcase.lagalt_be.request.LoginRequest;
import com.lagaltcase.lagalt_be.response.JwtResponse;
import com.lagaltcase.lagalt_be.security.jwt.JwtUtils;
import com.lagaltcase.lagalt_be.user.Role;
import com.lagaltcase.lagalt_be.user.RoleRepository;
import com.lagaltcase.lagalt_be.user.User;
import com.lagaltcase.lagalt_be.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private RoleRepository roleRepository;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getUsername()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (this.userRepository.existsByUsername(signupRequest.getUsername())) {    //If the username is already taken
            return ResponseEntity.badRequest().body("Error: Username is already taken.");
        }

        //Encode password so it's not in plain text in database
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), this.encoder.encode(signupRequest.getPassword()));

        //Add Role manually because the role name needs to be retrieved from RoleRepository
        List<Role> roles = new ArrayList<>();
        Role userRole = this.roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        roles.add(userRole);
        user.setRoles(roles);

        this.userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}