package com.lagaltcase.lagalt_be.response;

import com.lagaltcase.lagalt_be.dto.ProjectDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProjectListResponse extends Response<List<ProjectDTO>> {
    protected long totalElements;
    protected int totalPages;
    protected boolean isLast;
}
