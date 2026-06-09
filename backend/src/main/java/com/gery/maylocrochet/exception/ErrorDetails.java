package com.gery.maylocrochet.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorDetails(
        LocalDateTime timestamp,
        String message,
        int status,
        Map<String, String> errors) {
}