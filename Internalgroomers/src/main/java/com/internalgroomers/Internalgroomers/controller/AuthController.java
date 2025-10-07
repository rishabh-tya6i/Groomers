package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.auth.JwtAuthenticationResponse;
import com.internalgroomers.Internalgroomers.dto.auth.SignInRequest;
import com.internalgroomers.Internalgroomers.dto.auth.SignUpRequest;
import com.internalgroomers.Internalgroomers.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        authenticationService.signUp(signUpRequest);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("email", signUpRequest.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        String jwt = authenticationService.signIn(signInRequest);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}