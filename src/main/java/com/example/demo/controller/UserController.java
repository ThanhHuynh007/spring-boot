// UserController.java
package com.example.demo2.controller;

import com.example.demo2.model.UserDemo;
import com.example.demo2.model.Company;
import com.example.demo2.service.UserService;
import com.example.demo2.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class UserController {

    private final UserService userService;
    private final CompanyService companyService;

    @Autowired
    public UserController(UserService userService, CompanyService companyService) {
        this.userService = userService;
        this.companyService = companyService;
    }

    // Display the add user form with a list of companies
    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new UserDemo());
        List<Company> companies = companyService.getAllCompanies(); // Get all companies
        model.addAttribute("companies", companies); // Pass the companies to the view
        return "addUser";
    }

    // Save user and redirect to the user list page
    @PostMapping("/addUser")
    public String saveUser(@ModelAttribute("user") UserDemo user) {
        userService.saveOrUpdate(user); // Save user to database
        return "redirect:/userList"; // Redirect to the user list page
    }

    // Display the list of all users
    @GetMapping("/userList")
    public String userList(Model model) {
        List<UserDemo> users = userService.getAllUsers(); // Fetch all users
        model.addAttribute("users", users);
        return "userList";
    }
}
