package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.message.Message;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private int id;
    private int userId;
    private String username;
    private int projectId;
    private String message;
    private String type;

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.userId = message.getUserId();
        this.username = message.getUsername();
        this.projectId = message.getProject().getId();
        this.message = message.getMessage();
        this.type = message.getType();
    }
}
