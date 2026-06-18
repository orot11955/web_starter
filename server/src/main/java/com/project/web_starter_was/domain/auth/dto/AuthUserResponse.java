package com.project.web_starter_was.domain.auth.dto;

import java.util.List;

public record AuthUserResponse(
        String id,
        String name,
        String username,
        List<String> roles,
        List<String> permissions
) {
}
