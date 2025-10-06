package com.internalgroomers.Internalgroomers.dto;

import java.time.OffsetDateTime;

public class RescheduleAppointmentRequest {
    private OffsetDateTime newStartTime;

    public OffsetDateTime getNewStartTime() {
        return newStartTime;
    }

    public void setNewStartTime(OffsetDateTime newStartTime) {
        this.newStartTime = newStartTime;
    }
}
