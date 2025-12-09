package com.techlab.tpFinal.modules.lead.service;

import com.techlab.tpFinal.infrastructure.exception.ResourceNotFoundException;
import com.techlab.tpFinal.modules.lead.model.dto.LeadDTO;
import com.techlab.tpFinal.modules.lead.model.entity.Lead;
import com.techlab.tpFinal.modules.lead.repository.LeadRepository;
import com.techlab.tpFinal.modules.property.model.entity.Property;
import com.techlab.tpFinal.modules.property.repository.PropertyRepository;
import com.techlab.tpFinal.modules.user.model.entity.User;
import com.techlab.tpFinal.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository repository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public LeadDTO create(LeadDTO dto) {
        Long propId = dto.getPropertyId();
        if (propId == null) {
            throw new IllegalArgumentException("El ID de la propiedad no puede ser nulo");
        }
        Property property = propertyRepository.findById(propId)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada"));

        Lead lead = mapper.map(dto, Lead.class);
        lead.setProperty(property);

        return mapper.map(repository.save(lead), LeadDTO.class);
    }

    public List<LeadDTO> listByProperty(Long propertyId) {
        return repository.findByPropertyId(propertyId).stream()
                .map(l -> mapper.map(l, LeadDTO.class))
                .collect(Collectors.toList());
    }

    public List<LeadDTO> listAll() {
        return repository.findAll().stream()
                .map(l -> mapper.map(l, LeadDTO.class))
                .collect(Collectors.toList());
    }

    public List<LeadDTO> listMyLeads(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        boolean isProfessional = user.getRoles().stream()
                .anyMatch(r -> r.getName().equals("ROLE_PROFESIONAL"));

        List<Lead> leads;

        if (isProfessional && user.getAssignedCity() != null) {
            // Professionals see all leads in their assigned city
            leads = repository.findByPropertyCity(user.getAssignedCity());
        } else {
            // Others (Particulars) only see leads for their own properties
            leads = repository.findByPropertyOwnerEmail(email);
        }

        return leads.stream()
                .map(l -> mapper.map(l, LeadDTO.class))
                .collect(Collectors.toList());
    }

}
