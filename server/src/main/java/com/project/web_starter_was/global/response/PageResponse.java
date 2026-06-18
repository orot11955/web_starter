package com.project.web_starter_was.global.response;

import java.util.List;

public record PageResponse<T>(
        List<T> items,
        int page,
        int pageSize,
        long total,
        int totalPages,
        boolean hasNext,
        boolean hasPrevious
) {
    public static <T> PageResponse<T> of(List<T> items, int page, int pageSize, long total) {
        int totalPages = pageSize <= 0 ? 0 : (int) Math.ceil((double) total / pageSize);

        return new PageResponse<>(
                items,
                page,
                pageSize,
                total,
                totalPages,
                page < totalPages,
                page > 1
        );
    }
}
