package com.internalgroomers.Internalgroomers.dto;

import java.util.List;

public class SalonCategoriesRequest {
    private List<Long> categoryIds;
    private List<Long> subCategoryIds;

    public List<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public List<Long> getSubCategoryIds() {
        return subCategoryIds;
    }

    public void setSubCategoryIds(List<Long> subCategoryIds) {
        this.subCategoryIds = subCategoryIds;
    }
}
