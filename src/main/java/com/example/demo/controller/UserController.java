package com.example.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @GetMapping("/user")
    public String DetailPage(Model model) {
        model.addAttribute("userName", "Pham Dinh Phong");
        return "user";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "addUser";
    }

    @PostMapping("/addUser")
    public void saveUser(@ModelAttribute("user")User user) {
        System.out.println("firstName:" + user.getFirstName());
        System.out.println("lastName:" + user.getLastName());
    }
}