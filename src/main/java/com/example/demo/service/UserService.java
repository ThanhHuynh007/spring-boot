package com.example.demo2.service;

import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveOrUpdate(UserDemo user) {
        userRepository.save(user);
    }


    public List<UserDemo> getAllUsers() {
        return (List<UserDemo>) userRepository.findAll();
    }
}
