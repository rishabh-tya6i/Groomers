package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.CustomerResponseDto;
import com.internalgroomers.Internalgroomers.entity.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<CustomerResponseDto> getMyProfile(@AuthenticationPrincipal Customer customer) {
        CustomerResponseDto response = new CustomerResponseDto(customer);
        return ResponseEntity.ok(response);
    }
}