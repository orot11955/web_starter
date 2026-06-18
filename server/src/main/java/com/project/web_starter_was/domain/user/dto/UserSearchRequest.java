package com.project.web_starter_was.domain.user.dto;

public record UserSearchRequest(
        String keyword,
        Boolean enabled
) {
}
