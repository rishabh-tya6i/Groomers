package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class CreateAppointmentRequest {

    @NotNull
    private Long salonId;

    @NotNull
    private Long serviceId;

    @NotNull
    private OffsetDateTime startTime;

    private Long slotId; // Optional: if user selects a predefined slot

    // ---- Getters and Setters ----
    public Long getSalonId() { return salonId; }
    public void setSalonId(Long salonId) { this.salonId = salonId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public OffsetDateTime getStartTime() { return startTime; }
    public void setStartTime(OffsetDateTime startTime) { this.startTime = startTime; }

    public Long getSlotId() { return slotId; }
    public void setSlotId(Long slotId) { this.slotId = slotId; }
}