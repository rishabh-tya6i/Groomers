package com.internalgroomers.Internalgroomers.dto;

import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Role;

import java.util.Set;

public class CustomerResponseDto {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private Set<Role> roles;

    public CustomerResponseDto() {}

    public CustomerResponseDto(Customer customer) {
        this.id = customer.getId();
        this.email = customer.getEmail();
        this.fullName = customer.getFullName();
        this.phone = customer.getPhone();
        this.roles = customer.getRoles();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}