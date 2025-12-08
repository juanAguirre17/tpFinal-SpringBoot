package com.techlab.tpFinal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="productos")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;
    private String category;
    private Integer stock;
}