package com.example.demo.service;

import com.example.demo.model.UserDemo;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdate(UserDemo user) {
        userRepository.save(user);
    }

    public List<UserDemo> getAllUsers() {
        return (List<UserDemo>) userRepository.findAll(); // Chuyển đổi về List
    }
}
