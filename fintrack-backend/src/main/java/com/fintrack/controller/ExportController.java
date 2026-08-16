
package com.fintrack.controller;

import com.fintrack.service.ExportService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/export")
@CrossOrigin
public class ExportController {

    private final ExportService exportService;

    public ExportController(
            ExportService exportService) {

        this.exportService = exportService;
    }

    @GetMapping
    public ResponseEntity<byte[]> downloadAccountData(
            @RequestParam String period,
            Authentication authentication) {

        if (authentication == null) {

            throw new RuntimeException(
                    "User authentication not found"
            );
        }

        String email =
                authentication.getName();

        String csv =
                exportService.generateCsv(
                        email,
                        period
                );

        String safePeriod =
                period.toLowerCase();

        String filename =
                "FINTRACK_"
                        + safePeriod.toUpperCase()
                        + "_ACCOUNT_DATA.csv";

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + filename
                                + "\""
                )

                .contentType(
                        MediaType.parseMediaType(
                                "text/csv;charset=UTF-8"
                        )
                )

                .body(
                        csv.getBytes(
                                StandardCharsets.UTF_8
                        )
                );
    }
}

