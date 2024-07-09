package com.lagaltcase.lagalt_be.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssociateDTO {
    private int id;
    private String username;

    public AssociateDTO(int id, String username) {
        this.id = id;
        this.username = username;
    }
}
