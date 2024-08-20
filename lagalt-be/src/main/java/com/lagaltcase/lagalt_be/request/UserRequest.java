package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserRequest {
    private int id;
    private String username;
    private String description;
    private boolean isHidden;
    private List<String> skills;
}