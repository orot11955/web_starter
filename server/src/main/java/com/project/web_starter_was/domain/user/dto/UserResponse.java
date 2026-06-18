package com.project.web_starter_was.domain.user.dto;

import java.time.Instant;
import java.util.List;

public record UserResponse(
        Long id,
        String name,
        String username,
        boolean enabled,
        List<String> roles,
        List<String> permissions,
        Instant createdAt,
        Instant updatedAt
) {
}
