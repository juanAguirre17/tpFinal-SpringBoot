package com.techlab.tpFinal.modules.user.controller;

import com.techlab.tpFinal.modules.user.model.dto.UserDTO;
import com.techlab.tpFinal.modules.user.model.entity.User;
import com.techlab.tpFinal.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        return ResponseEntity.ok(UserDTO.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .assignedCity(user.getAssignedCity())
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        if (dto.getAssignedCity() != null) {
            user.setAssignedCity(dto.getAssignedCity());
        }

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
