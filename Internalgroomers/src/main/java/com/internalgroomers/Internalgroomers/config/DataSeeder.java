package com.internalgroomers.Internalgroomers.config;

import com.internalgroomers.Internalgroomers.entity.*;
import com.internalgroomers.Internalgroomers.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);


    @Bean
    CommandLineRunner initData(SalonRepository salonRepo,
                               ServiceRepository serviceRepo,
                               CustomerRepository customerRepo) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();

            if (salonRepo.count() == 0) {
                Salon salon = new Salon();
                salon.setName("Star Groomers");
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
                salon.setOpeningHours(hours);

                salonRepo.save(salon);

                ServiceEntity haircut = new ServiceEntity();
                haircut.setName("Haircut");
                haircut.setDescription("Professional haircut service");
                haircut.setPriceCents(30000L);
                haircut.setDurationMinutes(30);
                haircut.setSalon(salon);
                serviceRepo.save(haircut);
                log.info("Created initial service '{}' with id={}", haircut.getName(), haircut.getId());
            }

            if (customerRepo.count() == 0) {
                Customer cust = new Customer();
                cust.setFullName("Test User");
                cust.setEmail("test@example.com");
                cust.setPassword("password"); // ⚠️ TODO: hash this
                cust.setPhone("1234567890");
                customerRepo.save(cust);
                log.info("Created initial customer id={}", cust.getId());
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
        };
    }
}
