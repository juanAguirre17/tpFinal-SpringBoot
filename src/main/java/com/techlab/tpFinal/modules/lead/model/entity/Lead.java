package com.techlab.tpFinal.modules.lead.model.entity;

import com.techlab.tpFinal.modules.property.model.entity.Property;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    @Column(length = 1000)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    private String tenantId;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
