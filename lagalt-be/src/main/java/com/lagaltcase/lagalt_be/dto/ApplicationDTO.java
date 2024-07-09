package com.lagaltcase.lagalt_be.dto;

public class ApplicationDTO {
    private int id;
    private int userId;
    private String motivationalLetter;

    public ApplicationDTO(int id, int userId, String motivationalLetter) {
        this.id = id;
        this.userId = userId;
        this.motivationalLetter = motivationalLetter;
    }
}
