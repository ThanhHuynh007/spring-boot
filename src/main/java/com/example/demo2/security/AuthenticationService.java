package com.example.demo2.security;

import com.example.demo2.dto.AuthRequest;
import com.example.demo2.model.Authen;
import com.example.demo2.model.Role;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.RoleRepository;
import com.example.demo2.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public Authen register(UserDemo request) {
        // Tạo đối tượng UserDemo từ request
        UserDemo user = new UserDemo();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Gán vai trò mặc định là "ROLE_USER"
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_USER");
                    return roleRepository.save(newRole);
                });

        // Thiết lập vai trò cho user
        user.setRole(userRole);

        // Lưu user vào cơ sở dữ liệu
        user = repository.save(user);

        // Tạo token bằng email của user
        String token = jwtService.generateToken(user.getEmail());
        return new Authen(token);
    }


    public Authen login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        UserDemo user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());
        return new Authen(token);
    }
}
