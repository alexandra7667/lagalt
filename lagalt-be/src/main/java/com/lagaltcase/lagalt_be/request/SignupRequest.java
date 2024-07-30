package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SignupRequest {
    private String email;
    private String username;
    private String password;
}