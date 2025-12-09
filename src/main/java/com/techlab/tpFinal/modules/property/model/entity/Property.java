package com.techlab.tpFinal.modules.property.model.entity;

import com.techlab.tpFinal.modules.property.model.enums.PropertyStatus;
import com.techlab.tpFinal.modules.property.model.enums.PropertyType;
import com.techlab.tpFinal.modules.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "properties")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private Double price;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    @Enumerated(EnumType.STRING)
    private PropertyStatus status;

    private String address;
    private String city;
    private Double surface;
    private Integer rooms;
    private Integer bathrooms;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    // SaaS Scalability
    private String tenantId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
