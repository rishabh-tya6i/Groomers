package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.Set;

public class UpdateRoleRequest {

    @NotEmpty
    private Set<String> roles;

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}