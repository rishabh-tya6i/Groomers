package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @GetMapping("/recommended")
    public ResponseEntity<List<SalonDto>> getRecommendedSalons() {
        return ResponseEntity.ok(collectionService.getRecommendedSalons());
    }

    @GetMapping("/new")
    public ResponseEntity<List<SalonDto>> getNewSalons() {
        return ResponseEntity.ok(collectionService.getNewSalons());
    }

    @GetMapping("/trending")
    public ResponseEntity<List<SalonDto>> getTrendingSalons() {
        return ResponseEntity.ok(collectionService.getTrendingSalons());
    }
}
