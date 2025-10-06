package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.repository.CustomerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    public ApplicationUserDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found with email: " + email));
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        return customerRepository.findById(id).orElseThrow(
            () -> new UsernameNotFoundException("Customer not found with id : " + id)
        );
    }
}
