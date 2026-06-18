package com.project.web_starter_was.global.response;

public record ApiResponse<T>(
        boolean success,
        T data,
        String message,
        String code
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, null, "OK");
    }

    public static <T> ApiResponse<T> ok(T data, String message) {
        return new ApiResponse<>(true, data, message, "OK");
    }

    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(true, null, null, "OK");
    }

    public static ApiResponse<Void> message(String message) {
        return new ApiResponse<>(true, null, message, "OK");
    }
}
