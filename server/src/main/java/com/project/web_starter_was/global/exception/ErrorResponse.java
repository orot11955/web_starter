package com.project.web_starter_was.global.exception;

import java.util.Map;

public record ErrorResponse(
        boolean success,
        String message,
        String code,
        Map<String, String[]> errors
) {
    public static ErrorResponse of(ErrorCode errorCode) {
        return new ErrorResponse(false, errorCode.message(), errorCode.code(), null);
    }

    public static ErrorResponse of(ErrorCode errorCode, String message) {
        return new ErrorResponse(false, message, errorCode.code(), null);
    }

    public static ErrorResponse validation(Map<String, String[]> errors) {
        return new ErrorResponse(false, ErrorCode.INVALID_REQUEST.message(), ErrorCode.INVALID_REQUEST.code(), errors);
    }
}
