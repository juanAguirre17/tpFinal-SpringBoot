package com.techlab.tpFinal.modules.property.controller;

import com.techlab.tpFinal.modules.property.model.dto.PropertyDTO;
import com.techlab.tpFinal.modules.property.service.PropertyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@Tag(name = "Property Management", description = "Endpoints for managing real estate properties")
public class PropertyController {

    private final PropertyService service;

    public PropertyController(PropertyService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Create a new property")
    public ResponseEntity<PropertyDTO> create(@Valid @RequestBody PropertyDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "List all properties")
    public ResponseEntity<List<PropertyDTO>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a property by ID")
    public ResponseEntity<PropertyDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/my-properties")
    @Operation(summary = "List properties for the current authenticated user")
    public ResponseEntity<List<PropertyDTO>> listMyProperties(java.security.Principal principal) {
        return ResponseEntity.ok(service.listMyProperties(principal.getName()));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing property")
    public ResponseEntity<PropertyDTO> update(@PathVariable Long id, @Valid @RequestBody PropertyDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a property")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
