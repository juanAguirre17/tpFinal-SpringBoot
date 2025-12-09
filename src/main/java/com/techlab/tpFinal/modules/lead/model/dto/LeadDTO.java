package com.techlab.tpFinal.modules.lead.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeadDTO {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email inválido")
    private String email;

    private String phone;
    private String message;

    @NotNull(message = "El ID de la propiedad es obligatorio")
    private Long propertyId;

    private LocalDateTime createdAt;
}
