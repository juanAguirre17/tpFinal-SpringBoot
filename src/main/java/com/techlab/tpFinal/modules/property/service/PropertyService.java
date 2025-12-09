package com.techlab.tpFinal.modules.property.service;

import com.techlab.tpFinal.infrastructure.exception.ResourceNotFoundException;
import com.techlab.tpFinal.modules.property.model.dto.PropertyDTO;
import com.techlab.tpFinal.modules.property.model.entity.Property;
import com.techlab.tpFinal.modules.property.model.enums.PropertyStatus;
import com.techlab.tpFinal.modules.property.repository.PropertyRepository;
import com.techlab.tpFinal.modules.user.model.entity.User;
import com.techlab.tpFinal.modules.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository repository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public PropertyService(PropertyRepository repository, UserRepository userRepository, ModelMapper mapper) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public PropertyDTO create(PropertyDTO dto) {
        Property property = mapper.map(dto, Property.class);

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User owner = userRepository.findByEmail(email).orElseThrow();
        property.setOwner(owner);

        if (property.getStatus() == null) {
            property.setStatus(PropertyStatus.PENDIENTE_APROBACION);
        }

        return convertToDTO(repository.save(property));
    }

    public List<PropertyDTO> listAll() {
        boolean isManager = SecurityContextHolder.getContext().getAuthentication() != null &&
                SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")
                                || a.getAuthority().equals("ROLE_PROFESIONAL"));

        List<Property> properties;
        if (isManager) {
            properties = repository.findAll();
        } else {
            properties = repository.findByStatus(PropertyStatus.PUBLICADA);
        }

        return properties.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PropertyDTO findById(Long id) {
        Property property = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con ID: " + id));
        return convertToDTO(property);
    }

    public PropertyDTO update(Long id, PropertyDTO dto) {
        Property property = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con ID: " + id));

        // Security check: Only PROFESIONAL or ADMIN can set status to VENDIDA
        if (PropertyStatus.VENDIDA.equals(dto.getStatus())) {
            boolean isAuthorized = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(
                            a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_PROFESIONAL"));

            if (!isAuthorized) {
                throw new RuntimeException("No tiene permisos para marcar esta propiedad como VENDIDA");
            }
        }

        mapper.map(dto, property);
        property.setId(id); // Ensure ID doesn't change

        return convertToDTO(repository.save(property));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Propiedad no encontrada con ID: " + id);
        }
        repository.deleteById(id);
    }

    private PropertyDTO convertToDTO(Property property) {
        PropertyDTO dto = mapper.map(property, PropertyDTO.class);
        if (property.getOwner() != null) {
            dto.setOwnerEmail(property.getOwner().getEmail());
        }
        return dto;
    }

    public List<PropertyDTO> listMyProperties(String email) {
        return repository.findByOwnerEmail(email).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
