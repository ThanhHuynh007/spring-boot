package com.example.demo2.service;

import com.example.demo2.model.Role;
import com.example.demo2.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    public Role addRole(Role role) {

        return roleRepository.save(role);
    }

}
