package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Role;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.repository.AppointmentRepository;
import com.internalgroomers.Internalgroomers.repository.CustomerRepository;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final CustomerRepository customerRepository;
    private final SalonRepository salonRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminService(CustomerRepository customerRepository,
                        SalonRepository salonRepository,
                        AppointmentRepository appointmentRepository) {
        this.customerRepository = customerRepository;
        this.salonRepository = salonRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsBySalon(Long salonId) {
        return appointmentRepository.findBySalonId(salonId);
    }

    @Transactional
    public Customer updateCustomerRole(Long customerId, Set<String> roleStrings) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        // Convert string roles to Role enum
        Set<Role> roles = roleStrings.stream()
                .map(String::toUpperCase)
                .map(Role::valueOf)
                .collect(Collectors.toSet());

        customer.setRoles(roles);
        return customerRepository.save(customer);
    }

    @Transactional
    public void deleteCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));
        customerRepository.delete(customer);
    }

    @Transactional
    public void deleteSalon(Long salonId) {
        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + salonId));
        salonRepository.delete(salon);
    }
}