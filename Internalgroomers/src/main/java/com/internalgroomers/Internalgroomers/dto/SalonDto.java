package com.internalgroomers.Internalgroomers.dto;

public class SalonDto {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String contactPhone;
    private String contactEmail;
    private String businessType;
    private Integer employeeCount;
    private java.util.List<String> galleryPhotos;
    private com.fasterxml.jackson.databind.JsonNode legalDocuments;
    private com.fasterxml.jackson.databind.JsonNode bankDetails;
    private com.internalgroomers.Internalgroomers.entity.SalonStatus status;
    private java.util.List<Long> categoryIds;
    private java.util.List<Long> subCategoryIds;
    private boolean registrationCompleted;

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public Integer getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Integer employeeCount) {
        this.employeeCount = employeeCount;
    }

    public java.util.List<String> getGalleryPhotos() {
        return galleryPhotos;
    }

    public void setGalleryPhotos(java.util.List<String> galleryPhotos) {
        this.galleryPhotos = galleryPhotos;
    }

    public com.fasterxml.jackson.databind.JsonNode getLegalDocuments() {
        return legalDocuments;
    }

    public void setLegalDocuments(com.fasterxml.jackson.databind.JsonNode legalDocuments) {
        this.legalDocuments = legalDocuments;
    }

    public com.fasterxml.jackson.databind.JsonNode getBankDetails() {
        return bankDetails;
    }

    public void setBankDetails(com.fasterxml.jackson.databind.JsonNode bankDetails) {
        this.bankDetails = bankDetails;
    }

    public com.internalgroomers.Internalgroomers.entity.SalonStatus getStatus() {
        return status;
    }

    public void setStatus(com.internalgroomers.Internalgroomers.entity.SalonStatus status) {
        this.status = status;
    }

    public java.util.List<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(java.util.List<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public java.util.List<Long> getSubCategoryIds() {
        return subCategoryIds;
    }

    public void setSubCategoryIds(java.util.List<Long> subCategoryIds) {
        this.subCategoryIds = subCategoryIds;
    }

    public boolean isRegistrationCompleted() {
        return registrationCompleted;
    }

    public void setRegistrationCompleted(boolean registrationCompleted) {
        this.registrationCompleted = registrationCompleted;
    }
}
