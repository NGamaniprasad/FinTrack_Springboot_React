package com.fintrack.controller;

import com.fintrack.dto.AnalysisResponse;
import com.fintrack.service.AnalysisService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @GetMapping
    public ResponseEntity<AnalysisResponse> getAnalysis(
            Authentication authentication) {

        AnalysisResponse response =
                analysisService.getAnalysis(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }
}