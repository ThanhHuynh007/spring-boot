package com.example.demo2.service;

import com.example.demo2.model.Role;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.CompanyRepository;
import com.example.demo2.repository.RoleRepository;
import com.example.demo2.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Data
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public List<UserDemo> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDemo> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public UserDemo createUser(UserDemo user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_USER");
                    return roleRepository.save(newRole);
                });

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public UserDemo updateUser(Integer id, UserDemo userDetails) {
        Optional<UserDemo> user = userRepository.findById(id);

        if (user.isPresent()) {
            UserDemo updatedUser = user.get();
            updatedUser.setEmail(userDetails.getEmail());
            updatedUser.setFirstName(userDetails.getFirstName());
            updatedUser.setLastName(userDetails.getLastName());
            updatedUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));

            return userRepository.save(updatedUser);
        }

        return null;
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}