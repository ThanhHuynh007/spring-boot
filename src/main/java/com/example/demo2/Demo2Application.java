package com.example.demo2;

import com.example.demo2.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Demo2Application {

    @Autowired
    private RoleService roleService;

    public static void main(String[] args) {
        SpringApplication.run(Demo2Application.class, args);
    }

}
