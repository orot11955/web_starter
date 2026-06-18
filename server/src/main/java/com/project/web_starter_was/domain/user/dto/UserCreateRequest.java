package com.project.web_starter_was.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UserCreateRequest(
        @NotBlank(message = "이름은 필수입니다.")
        String name,

        @NotBlank(message = "아이디는 필수입니다.")
        @Size(min = 3, max = 80, message = "아이디는 3자 이상 80자 이하로 입력해주세요.")
        String username,

        @NotBlank(message = "비밀번호는 필수입니다.")
        String password,

        @NotEmpty(message = "역할은 하나 이상 선택해야 합니다.")
        List<String> roles
) {
}
