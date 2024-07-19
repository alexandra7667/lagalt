package com.lagaltcase.lagalt_be.dto;

import com.lagaltcase.lagalt_be.message.Message;
import com.lagaltcase.lagalt_be.project.Project;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ProjectDTO {
    private int id;
    private String title;
    private String description;
    private String category;
    private String websiteUrl;
    private String status;
    private List<String> neededSkills;
    private List<String> tags;
    private List<AssociateDTO> associates;
    //private List<MessageDTO> messageBoard;
    //private List<MessageDTO> projectUpdates;

    public ProjectDTO(Project project) {
        List<AssociateDTO> associateDTOS = project.getAssociatedUsers().stream()
                .map(AssociateDTO::new)
                .collect(Collectors.toList());

//        List<MessageDTO> messageDTOS = project.getMessages().stream()
//                .map(MessageDTO::new)
//                .collect(Collectors.toList());
//
//        List<MessageDTO> messageList = messageDTOS.stream()
//                .filter(dto -> "message".equals(dto.getType()))
//                .collect(Collectors.toList());
//
//        List<MessageDTO> updateList = messageDTOS.stream()
//                .filter(dto -> "update".equals(dto.getType()))
//                .collect(Collectors.toList());


        this.id = project.getId();
        this.title = project.getTitle();
        this.description = project.getDescription();
        this.category = project.getCategory();
        this.websiteUrl = project.getWebsiteUrl();
        this.status = project.getStatus();
        this.neededSkills = project.getNeededSkills();
        this.tags = project.getTags();
        this.associates = associateDTOS;
//        this.messageBoard = messageList;
//        this.projectUpdates = updateList;
    }
}