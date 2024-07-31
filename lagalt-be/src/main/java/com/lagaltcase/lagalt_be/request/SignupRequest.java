package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SignupRequest {
    private String email;
    private String password;

    public SignupRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}