package com.example.demo2.service;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class AdminInitializer {

    private final UserService userService;

    public AdminInitializer(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initializeAdminAccount() {
        userService.createAdminAccountIfNotExists();
    }
}

