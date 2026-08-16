package com.fintrack.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(
            @Value("${jwt.secret}") String secret
    ) {

        this.secretKey =
                Keys.hmacShaKeyFor(
                        secret.getBytes(
                                StandardCharsets.UTF_8
                        )
                );
    }

    public String generateToken(
            UserDetails userDetails,
            Long userId
    ) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put(
                "userId",
                userId
        );

        claims.put(
                "role",
                userDetails
                        .getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
        );

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L * 60 * 60 * 24
                        )
                )
                .signWith(secretKey)
                .compact();
    }

    public String extractEmail(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    public Long extractUserId(
            String token
    ) {

        return extractAllClaims(token)
                .get("userId", Long.class);
    }

    private <T> T extractClaim(
            String token,
            Function<Claims, T> resolver
    ) {

        return resolver.apply(
                extractAllClaims(token)
        );
    }

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        try {

            String email =
                    extractEmail(token);

            Date expiration =
                    extractAllClaims(token)
                            .getExpiration();

            return email != null
                    && email.equals(
                            userDetails.getUsername()
                    )
                    && expiration.after(
                            new Date()
                    );

        } catch (Exception e) {

            return false;
        }
    }
}