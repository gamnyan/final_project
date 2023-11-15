package com.avado.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import com.avado.backend.security.JwtAccessDeniedHandler;
import com.avado.backend.security.JwtAuthenticationEntryPoint;
import com.avado.backend.security.TokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {

        private final TokenProvider tokenProvider;
        private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
        private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

        @Bean
        PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .httpBasic(basic -> basic.disable())
                                .csrf(csrf -> csrf.disable())
                                .sessionManagement(management -> management
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .exceptionHandling(handling -> handling
                                                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                                                .accessDeniedHandler(jwtAccessDeniedHandler))
                    .authorizeHttpRequests(requests -> requests
                                .requestMatchers("/ws/chat/**").permitAll()
                .requestMatchers("/chat/**").permitAll()
                                                .requestMatchers("/auth/**", "/article/**", "/recommend/**",
                                                                "/comment/**", "/img/**", "/club/**", "/clubjoin/**", "/gallery/comment/**", "/galleryRecommend/**")
                                                .permitAll()
                                                .requestMatchers("/article/img/**").permitAll()
                                                .requestMatchers("/member/**", "/member/withdraw").permitAll() // 엔드포인트 추가 구글 때문에
                                                .requestMatchers(
                                                                "/member/check-email")
                                                .permitAll()
                                                .requestMatchers("/gallery/**").permitAll()
                                                .anyRequest().authenticated())
                                .apply(new JwtSecurityConfig(tokenProvider));
                log.info("jwt: "); // .oauth2Login()

                return http.build();
        }
}