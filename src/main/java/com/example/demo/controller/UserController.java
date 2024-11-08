package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.model.UserDemo;
import com.example.demo.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String trangChiTiet(Model model) {
        model.addAttribute("userName", "Nguyen Van A");
        return "user";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "addUser";
    }

    @PostMapping("/addUser")
    public String submitUser(@ModelAttribute("user") UserDemo user) {
        userService.saveOrUpdate(user);
        return "redirect:/userDetails";
    }

    @GetMapping("/userDetails")
    public String userDetails(Model model) {
        List<UserDemo> users = userService.getAllUsers();
        if (!users.isEmpty()) {
            UserDemo user = users.get(users.size() - 1);
            model.addAttribute("user", user);
            System.out.println("First Name: " + user.getFirstName());
            System.out.println("Last Name: " + user.getLastName());
        }
        return "userDetails";
    }

//    @PostMapping("/addUser")
//    public void saveUser(@ModelAttribute("user") UserDemo user) {
//        System.out.println("firstName: " + user.getFirstName());
//        System.out.println("lastName: " + user.getLastName());
//        userService.saveOrUpdate(user);
//    }


}