package com.lagaltcase.lagalt_be.security.jwt;

import com.lagaltcase.lagalt_be.security.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {  //Checks if token is valid and if the user has the right role/s that can access the resource
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain
    )
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUsernameFromJwtToken(jwt); //Get the username from token

                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username); //Get the user from database

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()); //Get the user's roles

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //Check what the user is trying to access

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        catch (Exception e) {
            logger.error("Cannot set user authenticaion: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); //returnerar det som är efter "Bearer "
        }
        return null;
    }
}
