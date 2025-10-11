package com.internalgroomers.Internalgroomers.config;

import com.internalgroomers.Internalgroomers.entity.*;
import com.internalgroomers.Internalgroomers.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner initData(SalonRepository salonRepo,
                               ServiceRepository serviceRepo,
                               CustomerRepository customerRepo,
                               StaffRepository staffRepo,
                               PasswordEncoder passwordEncoder) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();

            // Create customers with different roles
            if (customerRepo.count() == 0) {
                // Regular user
                Customer user = new Customer();
                user.setFullName("Test User");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("password123"));
                user.setPhone("1234567890");
                user.setRoles(Set.of(Role.USER));
                customerRepo.save(user);
                log.info("Created USER '{}' with id={}", user.getEmail(), user.getId());

                // Admin user
                Customer admin = new Customer();
                admin.setFullName("Admin User");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("9999999999");
                admin.setRoles(Set.of(Role.ADMIN));
                customerRepo.save(admin);
                log.info("Created ADMIN user '{}' with id={}", admin.getEmail(), admin.getId());

                // Salon owner
                Customer salonOwner = new Customer();
                salonOwner.setFullName("Salon Owner");
                salonOwner.setEmail("salon@example.com");
                salonOwner.setPassword(passwordEncoder.encode("salon123"));
                salonOwner.setPhone("8888888888");
                salonOwner.setRoles(Set.of(Role.SALON));
                customerRepo.save(salonOwner);
                log.info("Created SALON owner '{}' with id={}", salonOwner.getEmail(), salonOwner.getId());

                // Create salon for the salon owner
                Salon salon = new Salon();
                salon.setName("Star Groomers");
                salon.setDescription("Best grooming services in town");
                salon.setAddressLine("123 Main Street");
                salon.setCity("New Delhi");
                salon.setContactPhone("9876543210");
                salon.setContactEmail("contact@stargroomers.com");
                salon.setOwner(salonOwner);

                ObjectNode hours = mapper.createObjectNode();
                hours.put("monday", "09:00-18:00");
                hours.put("tuesday", "09:00-18:00");
                hours.put("wednesday", "09:00-18:00");
                hours.put("thursday", "09:00-18:00");
                hours.put("friday", "09:00-18:00");
                hours.put("saturday", "10:00-16:00");
                hours.put("sunday", "Closed");
                salon.setOpeningHours(hours);

                salonRepo.save(salon);
                log.info("Created salon '{}' with id={}", salon.getName(), salon.getId());

                // Create services for the salon
                ServiceEntity haircut = new ServiceEntity();
                haircut.setName("Haircut");
                haircut.setDescription("Professional haircut service");
                haircut.setPriceCents(30000L); // ₹300.00
                haircut.setDurationMinutes(30);
                haircut.setSalon(salon);
                serviceRepo.save(haircut);
                log.info("Created service '{}' with id={}", haircut.getName(), haircut.getId());

                ServiceEntity beardTrim = new ServiceEntity();
                beardTrim.setName("Beard Trim");
                beardTrim.setDescription("Professional beard grooming");
                beardTrim.setPriceCents(15000L); // ₹150.00
                beardTrim.setDurationMinutes(20);
                beardTrim.setSalon(salon);
                serviceRepo.save(beardTrim);
                log.info("Created service '{}' with id={}", beardTrim.getName(), beardTrim.getId());

                // Create staff for the salon
                Staff staff1 = new Staff();
                staff1.setName("John Doe");
                staff1.setPhone("7777777777");
                staff1.setEmail("john@stargroomers.com");
                staff1.setSpecialization("Hair Stylist");
                staff1.setSalon(salon);
                staff1.setIsActive(true);
                staffRepo.save(staff1);
                log.info("Created staff '{}' with id={}", staff1.getName(), staff1.getId());

                Staff staff2 = new Staff();
                staff2.setName("Jane Smith");
                staff2.setPhone("6666666666");
                staff2.setEmail("jane@stargroomers.com");
                staff2.setSpecialization("Beard Specialist");
                staff2.setSalon(salon);
                staff2.setIsActive(true);
                staffRepo.save(staff2);
                log.info("Created staff '{}' with id={}", staff2.getName(), staff2.getId());
            }

            log.info("✅ Data seeding completed successfully!");
        };
    }
}