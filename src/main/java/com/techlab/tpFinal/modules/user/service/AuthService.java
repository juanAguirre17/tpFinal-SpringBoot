package com.techlab.tpFinal.modules.user.service;

import com.techlab.tpFinal.infrastructure.security.JwtService;
import com.techlab.tpFinal.modules.user.model.dto.AuthenticationRequest;
import com.techlab.tpFinal.modules.user.model.dto.AuthenticationResponse;
import com.techlab.tpFinal.modules.user.model.dto.RegisterRequest;
import com.techlab.tpFinal.modules.user.model.entity.Role;
import com.techlab.tpFinal.modules.user.model.entity.User;
import com.techlab.tpFinal.modules.user.repository.RoleRepository;
import com.techlab.tpFinal.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                // Always register as ROLE_PARTICULAR — role cannot be chosen by the client
                Role role = roleRepository.findByName("ROLE_PARTICULAR")
                                .orElseThrow(() -> new RuntimeException("Rol ROLE_PARTICULAR no encontrado"));

                var user = User.builder()
                                .firstName(request.getFirstName())
                                .lastName(request.getLastName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .roles(Collections.singleton(role))
                                .enabled(true)
                                .build();

                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                                .build();
        }
}
