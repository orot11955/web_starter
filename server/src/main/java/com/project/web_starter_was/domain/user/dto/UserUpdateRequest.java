package com.project.web_starter_was.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record UserUpdateRequest(
        @NotBlank(message = "이름은 필수입니다.")
        String name,

        boolean enabled,

        @NotEmpty(message = "역할은 하나 이상 선택해야 합니다.")
        List<String> roles
) {
}
