package com.lagaltcase.lagalt_be.security;

import com.lagaltcase.lagalt_be.request.GoogleRequest;
import com.lagaltcase.lagalt_be.request.LoginRequest;
import com.lagaltcase.lagalt_be.request.SignupRequest;
import com.lagaltcase.lagalt_be.response.JwtResponse;
import com.lagaltcase.lagalt_be.security.jwt.JwtUtils;
import com.lagaltcase.lagalt_be.user.Role;
import com.lagaltcase.lagalt_be.user.RoleRepository;
import com.lagaltcase.lagalt_be.user.User;
import com.lagaltcase.lagalt_be.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


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

    //To access variable in application.yml
    @Value("${lagalt.app.clientid}")
    private String googleClientId;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();

        JwtResponse jwtResponse = new JwtResponse(
                jwt,
                userDetailsImpl.getId(),
                userDetailsImpl.getEmail(),
                userDetailsImpl.getUsername(),
                userDetailsImpl.getDescription(),
                userDetailsImpl.isHidden(),
                userDetailsImpl.getSkills(),
                userDetailsImpl.getAssociatedProjects()
        );

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already taken.");
        }

        //Encode password so it's not in plain text in database
        User user = new User(signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));

        //Add Role manually because the role name needs to be retrieved from RoleRepository
        List<Role> roles = new ArrayList<>();
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleSignin(@RequestBody GoogleRequest googleRequest) {
        //Call google API to verify ID token
        String idToken = googleRequest.getIdToken();

        // Verify the ID token with Google's tokeninfo endpoint
        String url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        Map<String, Object> userInfo = response.getBody();
        String email = (String) userInfo.get("email");

        if (userRepository.existsByEmail(email)) {
            User user = userRepository.findByEmail(email).orElse(null);
            //Log in user and return JwtResponse
            return authenticateUser(new LoginRequest(user.getEmail(), user.getPassword()));
        }

        //Register user
        //Generate random password
        String password = "password";

        //Register
        return registerUser(new SignupRequest(email, password));
    }
}