package com.techlab.tpFinal.modules.lead.controller;

import com.techlab.tpFinal.modules.lead.model.dto.LeadDTO;
import com.techlab.tpFinal.modules.lead.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Tag(name = "Lead Management", description = "Endpoints for managing interested parties (leads)")
public class LeadController {

    private final LeadService service;

    @PostMapping
    @Operation(summary = "Create a new lead (public endpoint)")
    public ResponseEntity<LeadDTO> create(@Valid @RequestBody LeadDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PROFESIONAL')")
    @Operation(summary = "List all leads (Admin/Professional only)")
    public ResponseEntity<List<LeadDTO>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

    @GetMapping("/property/{propertyId}")
    @Operation(summary = "List leads for a specific property")
    public ResponseEntity<List<LeadDTO>> listByProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(service.listByProperty(propertyId));
    }

    @GetMapping("/my-leads")
    @Operation(summary = "List leads for properties owned by the current authenticated user")
    public ResponseEntity<List<LeadDTO>> listMyLeads(java.security.Principal principal) {
        return ResponseEntity.ok(service.listMyLeads(principal.getName()));
    }
}
