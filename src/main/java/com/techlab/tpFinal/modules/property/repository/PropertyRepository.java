package com.techlab.tpFinal.modules.property.repository;

import com.techlab.tpFinal.modules.property.model.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByTitleContainingIgnoreCase(String title);

    List<Property> findByCityContainingIgnoreCase(String city);

    List<Property> findByOwnerEmail(String email);

    List<Property> findByStatus(com.techlab.tpFinal.modules.property.model.enums.PropertyStatus status);
}
