package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.application.Application;

public class ApplicationDTO {
    private int id;
    private int userId;
    private String motivationalLetter;

    public ApplicationDTO(Application application) {
        this.id = application.getId();
        this.userId = application.getUser().getId();
        this.motivationalLetter = application.getMotivationalLetter();
    }
}
