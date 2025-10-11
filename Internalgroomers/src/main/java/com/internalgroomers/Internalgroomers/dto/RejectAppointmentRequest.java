package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.NotBlank;

public class RejectAppointmentRequest {

    @NotBlank
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}