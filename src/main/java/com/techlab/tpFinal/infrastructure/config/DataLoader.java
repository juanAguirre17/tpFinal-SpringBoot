package com.techlab.tpFinal.infrastructure.config;

import com.techlab.tpFinal.modules.property.model.entity.Property;
import com.techlab.tpFinal.modules.property.model.enums.PropertyStatus;
import com.techlab.tpFinal.modules.property.model.enums.PropertyType;
import com.techlab.tpFinal.modules.property.repository.PropertyRepository;
import com.techlab.tpFinal.modules.user.model.entity.Role;
import com.techlab.tpFinal.modules.user.model.entity.User;
import com.techlab.tpFinal.modules.user.repository.RoleRepository;
import com.techlab.tpFinal.modules.user.repository.UserRepository;
import com.techlab.tpFinal.modules.lead.repository.LeadRepository;
import com.techlab.tpFinal.modules.lead.model.entity.Lead;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final LeadRepository leadRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedRoles();
        User admin = seedAdminUser();
        User prof = seedProfessionalUser();
        List<Property> properties = seedProperties(admin);

        seedLeads(properties);
    }

    private void seedRoles() {
        List<String> roleNames = Arrays.asList("ROLE_ADMIN", "ROLE_PROFESIONAL", "ROLE_PARTICULAR");
        for (String name : roleNames) {
            if (roleRepository.findByName(name).isEmpty()) {
                roleRepository.save(Role.builder().name(name).build());
            }
        }
    }

    private User seedAdminUser() {
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow();

        User admin = userRepository.findByEmail("admin@techlab.com")
                .orElse(new User());

        admin.setEmail("admin@techlab.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFirstName("Admin");
        admin.setLastName("System");
        admin.setRoles(Set.of(adminRole));
        admin.setEnabled(true);

        System.out.println("DEBUG: Seeding/Updating Admin User: admin@techlab.com / admin123");
        return userRepository.save(admin);
    }

    private User seedProfessionalUser() {
        Role profRole = roleRepository.findByName("ROLE_PROFESIONAL").orElseThrow();

        User prof = userRepository.findByEmail("prof@techlab.com")
                .orElse(new User());

        prof.setEmail("prof@techlab.com");
        prof.setPassword(passwordEncoder.encode("prof123"));
        prof.setFirstName("Inmobiliaria");
        prof.setLastName("MDP");
        prof.setRoles(Set.of(profRole));
        prof.setAssignedCity("Mar del Plata");
        prof.setEnabled(true);

        System.out.println("DEBUG: Seeding/Updating Prof User: prof@techlab.com / prof123");
        return userRepository.save(prof);
    }

    private List<Property> seedProperties(User admin) {
        if (propertyRepository.count() == 0) {
            Property p1 = propertyRepository.save(Property.builder()
                    .title("Casa Moderna con Piscina")
                    .description("Hermosa casa a estrenar con todos los servicios.")
                    .price(250000.0)
                    .type(PropertyType.CASA)
                    .status(PropertyStatus.PUBLICADA)
                    .address("Av. Libertador 1200")
                    .city("Buenos Aires")
                    .surface(150.0)
                    .rooms(4)
                    .bathrooms(2)
                    .owner(admin)
                    .build());

            Property p2 = propertyRepository.save(Property.builder()
                    .title("Departamento Vista al Mar")
                    .description("Increíble departamento frente a la costa.")
                    .price(180000.0)
                    .type(PropertyType.DEPARTAMENTO)
                    .status(PropertyStatus.PUBLICADA)
                    .address("Bv. Marítimo 2500")
                    .city("Mar del Plata")
                    .surface(70.0)
                    .rooms(2)
                    .bathrooms(1)
                    .owner(admin)
                    .build());
            return Arrays.asList(p1, p2);
        }
        return propertyRepository.findAll();
    }

    private void seedLeads(List<Property> properties) {
        if (leadRepository.count() == 0 && properties.size() >= 2) {
            // Lead for Buenos Aires property
            leadRepository.save(Lead.builder()
                    .name("Carlos Gomez")
                    .email("carlos@gmail.com")
                    .phone("11-2233-4455")
                    .message("Me interesa visitar la casa la semana que viene.")
                    .property(properties.get(0))
                    .build());

            // Lead for Mar del Plata property
            leadRepository.save(Lead.builder()
                    .name("Elena Mar")
                    .email("elena@hotmail.com")
                    .phone("223-456-7890")
                    .message("¿Aceptan mascotas en el departamento?")
                    .property(properties.get(1))
                    .build());

            System.out.println("DEBUG: Seeding sample leads for testing.");
        }
    }

}
