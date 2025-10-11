
package com.internalgroomers.Internalgroomers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class VendorRegistrationRequest {

    // User fields
    @NotBlank
    private String fullName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotBlank
    private String phone;

    // Salon fields
    @NotBlank
    private String salonName;

    private String salonDescription;

    @NotBlank
    private String salonCity;

    @NotBlank
    private String salonContactPhone;

    @NotBlank
    @Email
    private String salonContactEmail;

    private String salonImageUrl;

    // Getters and Setters

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSalonName() {
        return salonName;
    }

    public void setSalonName(String salonName) {
        this.salonName = salonName;
    }

    public String getSalonDescription() {
        return salonDescription;
    }

    public void setSalonDescription(String salonDescription) {
        this.salonDescription = salonDescription;
    }

    public String getSalonCity() {
        return salonCity;
    }

    public void setSalonCity(String salonCity) {
        this.salonCity = salonCity;
    }

    public String getSalonContactPhone() {
        return salonContactPhone;
    }

    public void setSalonContactPhone(String salonContactPhone) {
        this.salonContactPhone = salonContactPhone;
    }

    public String getSalonContactEmail() {
        return salonContactEmail;
    }

    public void setSalonContactEmail(String salonContactEmail) {
        this.salonContactEmail = salonContactEmail;
    }

    public String getSalonImageUrl() {
        return salonImageUrl;
    }

    public void setSalonImageUrl(String salonImageUrl) {
        this.salonImageUrl = salonImageUrl;
    }
}
