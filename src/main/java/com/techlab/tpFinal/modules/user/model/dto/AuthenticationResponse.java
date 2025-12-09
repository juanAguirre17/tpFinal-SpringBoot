package com.techlab.tpFinal.modules.user.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;
    private String email;
    private String firstName;
    private List<String> roles;
}
