package com.lagaltcase.lagalt_be.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type;
    private int id;
    private String email;
    private String username;
    private String description;
    private boolean hidden;
    private List<String> skills;

    public JwtResponse(String token, int id, String email, String username, String description, boolean hidden, List<String> skills) {
        this.token = token;
        this.type  = "Bearer";
        this.id = id;
        this.email = email;
        this.username = username;
        this.description = description;
        this.hidden = hidden;
        this.skills = skills;
    }
}