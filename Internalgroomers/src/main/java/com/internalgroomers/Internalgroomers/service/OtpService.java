package com.internalgroomers.Internalgroomers.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;

@Service
public class OtpService {
    private final StringRedisTemplate redis;
    private final SecureRandom random = new SecureRandom();

    @Value("${app.otp.ttl-seconds:300}")
    private int otpTtlSeconds;

    public OtpService(StringRedisTemplate redis) {
        this.redis = redis;
    }

    public void createAndSendOtp(String normalizedPhone) {
        String otp = generateOtp();
        String key = otpKey(normalizedPhone);
        redis.opsForValue().set(key, otp, Duration.ofSeconds(otpTtlSeconds));
        // Integrate SMS provider here to send 'otp' to 'normalizedPhone'
    }

    public boolean verifyOtp(String normalizedPhone, String otp) {
        String key = otpKey(normalizedPhone);
        String stored = redis.opsForValue().get(key);
        if (stored != null && stored.equals(otp)) {
            redis.delete(key);
            return true;
        }
        return false;
    }

    private String otpKey(String phone) {
        return "otp:" + phone;
    }

    private String generateOtp() {
        int code = 100000 + random.nextInt(900000);
        return Integer.toString(code);
    }
}