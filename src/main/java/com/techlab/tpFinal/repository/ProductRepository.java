package com.techlab.tpFinal.repository;

import com.techlab.tpFinal.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Producto, Long> {
}
