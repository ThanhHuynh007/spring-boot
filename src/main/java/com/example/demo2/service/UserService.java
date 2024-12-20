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

    public void createAdminAccountIfNotExists() {
        String adminEmail = "phongphama6@gmail.com";
        String adminPassword = "21042003";

        // Kiểm tra xem tài khoản admin đã tồn tại chưa
        Optional<UserDemo> existingAdmin = userRepository.findByEmail(adminEmail);
        if (existingAdmin.isEmpty()) {
            // Tạo vai trò ROLE_ADMIN nếu chưa có
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseGet(() -> {
                        Role newRole = new Role();
                        newRole.setName("ROLE_ADMIN");
                        return roleRepository.save(newRole);
                    });

            // Tạo tài khoản admin
            UserDemo admin = new UserDemo();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(adminRole);

            // Lưu tài khoản admin vào cơ sở dữ liệu
            userRepository.save(admin);
            System.out.println("Admin account created successfully.");
        } else {
            System.out.println("Admin account already exists.");
        }
    }

    public UserDemo createUser(UserDemo user) {
        // Mã hóa mật khẩu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Tìm vai trò "ROLE_USER", nếu chưa có thì tạo mới
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_USER");
                    return roleRepository.save(newRole);
                });

        // Thiết lập vai trò cho người dùng
        user.setRole(userRole);

        // Lưu người dùng vào cơ sở dữ liệu
        return userRepository.save(user);
    }


    public UserDemo updateUser(Integer id, UserDemo userDetails) {
        Optional<UserDemo> user = userRepository.findById(id);

        if (user.isPresent()) {
            UserDemo updatedUser = user.get();
            updatedUser.setEmail(userDetails.getEmail());
            updatedUser.setFirstName(userDetails.getFirstName());
            updatedUser.setLastName(userDetails.getLastName());
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                updatedUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

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