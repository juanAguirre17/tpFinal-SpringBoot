package com.techlab.tpFinal.modules.lead.repository;

import com.techlab.tpFinal.modules.lead.model.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByPropertyId(Long propertyId);

    List<Lead> findByEmail(String email);

    List<Lead> findByPropertyOwnerEmail(String email);

    List<Lead> findByPropertyCity(String city);
}
