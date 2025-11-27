package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CollectionService {

    public List<SalonDto> getRecommendedSalons() {
        SalonDto salon1 = new SalonDto();
        salon1.setId(1L);
        salon1.setName("Glamour Salon");
        salon1.setAddress("123 Main St, City");
        salon1.setImageUrl("https://picsum.photos/200/300?random=1");

        SalonDto salon2 = new SalonDto();
        salon2.setId(2L);
        salon2.setName("The Style Bar");
        salon2.setAddress("456 Oak Ave, Town");
        salon2.setImageUrl("https://picsum.photos/200/300?random=2");

        return Arrays.asList(salon1, salon2);
    }

    public List<SalonDto> getNewSalons() {
        SalonDto salon1 = new SalonDto();
        salon1.setId(3L);
        salon1.setName("Nail Envy");
        salon1.setAddress("789 Pine Ln, Village");
        salon1.setImageUrl("https://picsum.photos/200/300?random=3");

        SalonDto salon2 = new SalonDto();
        salon2.setId(4L);
        salon2.setName("Hair & Now");
        salon2.setAddress("101 Maple Rd, Suburb");
        salon2.setImageUrl("https://picsum.photos/200/300?random=4");

        return Arrays.asList(salon1, salon2);
    }

    public List<SalonDto> getTrendingSalons() {
        SalonDto salon1 = new SalonDto();
        salon1.setId(5L);
        salon1.setName("The Barber Shop");
        salon1.setAddress("212 Birch Ct, Hamlet");
        salon1.setImageUrl("https://picsum.photos/200/300?random=5");

        SalonDto salon2 = new SalonDto();
        salon2.setId(1L);
        salon2.setName("Glamour Salon");
        salon2.setAddress("123 Main St, City");
        salon2.setImageUrl("https://picsum.photos/200/300?random=6");

        return Arrays.asList(salon1, salon2);
    }
}
