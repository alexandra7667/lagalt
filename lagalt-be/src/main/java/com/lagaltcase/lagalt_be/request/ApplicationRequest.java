package com.lagaltcase.lagalt_be.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ApplicationRequest {
    private int projectId;
    private int userId;
    private int applicationId;
    private String message;
}
