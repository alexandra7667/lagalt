package com.lagaltcase.lagalt_be.response;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type;
    private int id;
    private String email;
    private String username;

    public JwtResponse(String token, int id, String email, String username) {
        this.token = token;
        this.type  = "Bearer";
        this.id = id;
        this.email = email;
        this.username = username;
    }
}