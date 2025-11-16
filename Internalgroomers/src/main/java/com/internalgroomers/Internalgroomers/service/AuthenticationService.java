package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.auth.SignInRequest;
import com.internalgroomers.Internalgroomers.dto.auth.SignUpRequest;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Role;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.repository.CustomerRepository;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class AuthenticationService {

    private final CustomerRepository customerRepository;
    private final SalonRepository salonRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;

    public AuthenticationService(CustomerRepository customerRepository,
                                 SalonRepository salonRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtTokenProvider jwtTokenProvider,
                                 AuthenticationManager authenticationManager,
                                 OtpService otpService) {
        this.customerRepository = customerRepository;
        this.salonRepository = salonRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.otpService = otpService;
    }

    @Transactional
    public void signUp(SignUpRequest signUpRequest) {
        // Check if email already exists
        if (customerRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email address already in use.");
        }

        // Create new customer
        Customer customer = new Customer();
        customer.setFullName(signUpRequest.getFullName());
        customer.setEmail(signUpRequest.getEmail());
        customer.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        customer.setPhone(signUpRequest.getPhone());

        // Set default role as USER
        customer.setRoles(Set.of(Role.USER));

        customerRepository.save(customer);
    }

    public String signIn(SignInRequest signInRequest) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getEmail(),
                        signInRequest.getPassword()
                )
        );

        // Generate and return JWT token
        return jwtTokenProvider.generateToken(authentication);
    }

    @Transactional
    public void signUpVendor(com.internalgroomers.Internalgroomers.dto.VendorRegistrationRequest request) {
        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email address already in use.");
        }

        // Create customer with SALON role
        Customer customer = new Customer();
        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setPhone(request.getPhone());
        customer.setRoles(Set.of(Role.SALON)); // Changed from ADMIN to SALON

        Customer savedCustomer = customerRepository.save(customer);

        // Create salon linked to this customer
        Salon salon = new Salon();
        salon.setName(request.getSalonName());
        salon.setDescription(request.getSalonDescription());
        salon.setCity(request.getSalonCity());
        salon.setContactPhone(request.getSalonContactPhone());
        salon.setContactEmail(request.getSalonContactEmail());
        salon.setImagePath(request.getSalonImageUrl()); // This will be null initially, can be updated later
        salon.setOwner(savedCustomer);

        salonRepository.save(salon);
    }

    public void requestOtp(String phone) {
        String normalized = normalizeIndianNumber(phone);
        otpService.createAndSendOtp(normalized);
    }

    public String verifyOtpAndLogin(String phone, String otp) {
        String normalized = normalizeIndianNumber(phone);
        if (!otpService.verifyOtp(normalized, otp)) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        Customer customer = customerRepository.findByPhone(normalized).orElseGet(() -> {
            Customer c = new Customer();
            c.setFullName("User");
            c.setPhone(normalized);
            c.setEmail(normalized.replace("+", "").replace(" ", "") + "@groomers.local");
            c.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
            c.setRoles(Set.of(Role.USER));
            return customerRepository.save(c);
        });
        Authentication auth = new UsernamePasswordAuthenticationToken(customer, null, customer.getAuthorities());
        return jwtTokenProvider.generateToken(auth);
    }

    private String normalizeIndianNumber(String phone) {
        String p = phone.trim().replaceAll("[^0-9]", "");
        if (p.startsWith("91") && p.length() == 12) return "+" + p.substring(0, 2) + p.substring(2);
        if (p.length() == 10) return "+91" + p;
        if (p.startsWith("+91") && p.length() == 13) return p;
        throw new IllegalArgumentException("Invalid Indian phone number");
    }
}