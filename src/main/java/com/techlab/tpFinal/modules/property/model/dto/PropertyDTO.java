package com.techlab.tpFinal.modules.property.model.dto;

import com.techlab.tpFinal.modules.property.model.enums.PropertyStatus;
import com.techlab.tpFinal.modules.property.model.enums.PropertyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyDTO {

    private Long id;

    @NotBlank(message = "El título es obligatorio")
    private String title;

    private String description;

    @NotNull(message = "el precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private Double price;

    @NotNull(message = "El tipo de propiedad es obligatorio")
    private PropertyType type;

    private PropertyStatus status;

    private String address;
    private String city;
    private Double surface;
    private Integer rooms;
    private Integer bathrooms;

    private String ownerEmail;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
