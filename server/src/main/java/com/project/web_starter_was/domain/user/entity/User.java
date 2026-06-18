package com.project.web_starter_was.domain.user.entity;

import java.time.Instant;

public record User(
        Long id,
        String name,
        String username,
        String password,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt
) {
}
