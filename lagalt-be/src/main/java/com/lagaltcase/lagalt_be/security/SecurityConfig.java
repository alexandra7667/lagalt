package com.lagaltcase.lagalt_be.security;

import com.lagaltcase.lagalt_be.security.jwt.AuthEntryPointJwt;
import com.lagaltcase.lagalt_be.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorisedHandler;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .exceptionHandling((exception) -> exception.authenticationEntryPoint(this.unauthorisedHandler))
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/auth/**", "/projects/getAllProjects", "/projects/getOneProject/**", "/swagger-ui/**", "/v3/api-docs", "/api-docs", "/webjars/**").permitAll()

                         //Allow signed-in users to perform GET, POST, and PUT requests on specified endpoints
                        .requestMatchers(HttpMethod.GET, "/projects/**", "/users/**", "/messages/**", "/associations/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/projects/**", "/users/**", "/messages/**", "/associations/**").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/projects/**", "/users/**", "/messages/**", "/associations/**").hasRole("USER")

                        //Allow only admin to perform DELETE requests on specified endpoints
                        .requestMatchers(HttpMethod.DELETE, "/projects/**", "/users/**", "/messages/**", "/associations/**").hasRole("ADMIN")

                         //Any other request needs to be authenticated
                        .anyRequest().authenticated()


                        //For test development with Swagger
//                        .anyRequest().permitAll()
                );

        http.authenticationProvider(this.authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.builder()
                .username("customuser")
                .password(passwordEncoder.encode("custompassword"))
                .roles("USER") //ROLE_ is automatically added
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this.userDetailsService);
        authProvider.setPasswordEncoder(this.passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
        return authConfig.getAuthenticationManager();
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
