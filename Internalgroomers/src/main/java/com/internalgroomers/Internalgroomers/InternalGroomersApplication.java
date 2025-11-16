package com.internalgroomers.Internalgroomers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class InternalGroomersApplication {
    public static void main(String[] args) {
        SpringApplication.run(InternalGroomersApplication.class, args);
    }
}

