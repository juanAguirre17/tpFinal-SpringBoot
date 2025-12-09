package com.techlab.tpFinal.modules.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    private String assignedCity;
}
