package com.techlab.tpFinal.repository;

import com.techlab.tpFinal.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Producto, Long> {

    // Buscar por nombre
    List<Producto> findByNameContainingIgnoreCase(String name);

    // Buscar por categoría
    List<Producto> findByCategoryContainingIgnoreCase(String category);

    // Buscar por nombre y categoría
    List<Producto> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(String name, String category);
}
