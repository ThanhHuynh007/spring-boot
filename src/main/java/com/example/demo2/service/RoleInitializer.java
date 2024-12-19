package com.example.demo2.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer {

    private final RoleService roleService;

    public RoleInitializer(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostConstruct
    public void initializeRoles() {
        roleService.initializeDefaultRoles();
    }
}

