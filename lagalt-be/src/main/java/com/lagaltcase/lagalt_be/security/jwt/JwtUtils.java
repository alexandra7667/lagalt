package com.lagaltcase.lagalt_be.security.jwt;

import com.lagaltcase.lagalt_be.security.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${booleanuk.app.jwtSecret}") //Find the values in application.yml
    private String jwtSecret;

    @Value("${booleanuk.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) { //if someone logs in and everything works well, return a token
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + this.jwtExpirationMs))
                .signWith(this.key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUsernameFromJwtToken(String token) {   //If there is a token, use the key to return the name of the user
        return Jwts.parserBuilder().setSigningKey(key())
                .build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            //parserBuilder() is only available in jwt version 11.5 (see gradle build)
            Jwts.parserBuilder().setSigningKey(this.key())
                    .build().parse(authToken);
            return true;
        }
        catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        catch (ExpiredJwtException e) {
            logger.error("JWT token has expired: {}", e.getMessage());
        }
        catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());   // : {} is a placeholder for message
        }
        catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}