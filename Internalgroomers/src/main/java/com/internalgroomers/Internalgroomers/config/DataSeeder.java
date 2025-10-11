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
                               PasswordEncoder passwordEncoder) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();

            if (salonRepo.count() == 0) {
                Salon salon = new Salon();
                salon.setName("Star Groomers");
                salon.setImageUrl("https://via.placeholder.com/150");
                salon.setDescription("Best grooming services in town");
                salon.setAddressLine("123 Main Street");
                salon.setCity("New Delhi");
                salon.setContactPhone("9876543210");
                salon.setContactEmail("contact@stargroomers.com");

                // ✅ Proper JSON opening hours
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
                log.info("Created initial salon '{}' with id={}", salon.getName(), salon.getId());

                ServiceEntity haircut = new ServiceEntity();
                haircut.setName("Haircut");
                haircut.setDescription("Professional haircut service");
                haircut.setPriceCents(30000L); // $300.00
                haircut.setDurationMinutes(30);
                haircut.setSalon(salon);
                serviceRepo.save(haircut);
                log.info("Created initial service '{}' with id={}", haircut.getName(), haircut.getId());

                ServiceEntity shave = new ServiceEntity();
                shave.setName("Beard Trim");
                shave.setDescription("Professional beard grooming");
                shave.setPriceCents(15000L); // $150.00
                shave.setDurationMinutes(20);
                shave.setSalon(salon);
                serviceRepo.save(shave);
                log.info("Created initial service '{}' with id={}", shave.getName(), shave.getId());
            }

            if (customerRepo.count() == 0) {
                Customer cust = new Customer();
                cust.setFullName("Test User");
                cust.setEmail("test@example.com");
                // ✅ FIXED: Hash the password properly
                cust.setPassword(passwordEncoder.encode("password123"));
                cust.setPhone("1234567890");
                cust.setRoles(Set.of(Role.USER));
                customerRepo.save(cust);
                log.info("Created initial customer '{}' with id={}", cust.getEmail(), cust.getId());

                // Create an admin user
                Customer admin = new Customer();
                admin.setFullName("Admin User");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("9999999999");
                admin.setRoles(Set.of(Role.ADMIN));
                customerRepo.save(admin);
                log.info("Created admin user '{}' with id={}", admin.getEmail(), admin.getId());
            }

            // Ensure at least one ServiceEntity exists (in case salons already existed)
            if (serviceRepo.count() == 0) {
                Salon salonForService = salonRepo.findAll().stream().findFirst().orElse(null);
                if (salonForService == null) {
                    // create a minimal salon
                    Salon s = new Salon();
                    s.setName("Seed Salon");
                    s.setDescription("Seeded salon");
                    s.setCity("City");
                    s.setContactPhone("0000000000");
                    s.setContactEmail("seed@example.com");
                    salonForService = salonRepo.save(s);
                    log.info("Created fallback salon id={}", salonForService.getId());
                }

                ServiceEntity svc = new ServiceEntity();
                svc.setName("Default Service");
                svc.setDescription("Auto-created default service");
                svc.setPriceCents(10000L);
                svc.setDurationMinutes(30);
                svc.setSalon(salonForService);
                svc = serviceRepo.save(svc);
                log.info("Created fallback service '{}' with id={}", svc.getName(), svc.getId());
            }

            log.info("✅ Data seeding completed successfully!");
        };
    }
}