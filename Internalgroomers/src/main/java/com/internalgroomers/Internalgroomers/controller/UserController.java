package com.internalgroomers.Internalgroomers.controller;

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
    public ResponseEntity<Customer> getMyProfile(@AuthenticationPrincipal Customer customer) {
        return ResponseEntity.ok(customer);
    }
}
