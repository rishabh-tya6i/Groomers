package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class CreateAppointmentRequest {

    @NotNull
    private Long salonId;

    @NotNull
    private Long serviceId;

    @NotNull
    private Long customerId;

    @NotNull
    private OffsetDateTime startTime;

    // ---- Getters and Setters ----
    public Long getSalonId() { return salonId; }
    public void setSalonId(Long salonId) { this.salonId = salonId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public OffsetDateTime getStartTime() { return startTime; }
    public void setStartTime(OffsetDateTime startTime) { this.startTime = startTime; }
}
