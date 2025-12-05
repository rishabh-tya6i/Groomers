package com.internalgroomers.Internalgroomers.dto;

import java.util.List;

public class SalonDocumentsRequest {

    public static class LegalDocumentDto {
        private String type;
        private String number;
        private String frontImage;
        private String backImage;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }

        public String getFrontImage() {
            return frontImage;
        }

        public void setFrontImage(String frontImage) {
            this.frontImage = frontImage;
        }

        public String getBackImage() {
            return backImage;
        }

        public void setBackImage(String backImage) {
            this.backImage = backImage;
        }
    }

    private List<LegalDocumentDto> documents;

    public List<LegalDocumentDto> getDocuments() {
        return documents;
    }

    public void setDocuments(List<LegalDocumentDto> documents) {
        this.documents = documents;
    }
}
