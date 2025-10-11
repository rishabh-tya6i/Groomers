package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class RescheduleAppointmentRequest {

    @NotNull
    private OffsetDateTime newStartTime;

    private Long newSlotId; // Optional: if user selects a predefined slot

    public OffsetDateTime getNewStartTime() {
        return newStartTime;
    }

    public void setNewStartTime(OffsetDateTime newStartTime) {
        this.newStartTime = newStartTime;
    }

    public Long getNewSlotId() {
        return newSlotId;
    }

    public void setNewSlotId(Long newSlotId) {
        this.newSlotId = newSlotId;
    }
}