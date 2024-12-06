package com.example.demo2.controller;


import com.example.demo2.dto.CompanyDTO;
import com.example.demo2.model.Company;
import com.example.demo2.service.CompanyService;
import com.example.demo2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService; // Thêm @Autowired cho UserService

    @GetMapping("/all")
    public String getAllCompanies(Model model) {
        List<CompanyDTO> companies = companyService.getAllCompanies();
        model.addAttribute("companies", companies);
        return "companies";
    }

    @GetMapping("/add")
    public String addCompanyForm(Model model) {
        model.addAttribute("company", new Company());
        model.addAttribute("users", userService.getAllUsers()); // Lấy danh sách người dùng
        return "addCompany";
    }

    @PostMapping("/add")
    public String saveCompany(@ModelAttribute("company") Company company) {
        companyService.saveOrUpdate(company);
        return "redirect:/companies/all";
    }

    @GetMapping("/update/{id}")
    public String updateCompanyForm(@PathVariable("id") Integer id, Model model) {
        Company company = companyService.getCompanyById(id);
        model.addAttribute("company", company);
        model.addAttribute("users", userService.getAllUsers()); // Lấy danh sách người dùng
        return "editCompany"; // Sửa lỗi chính tả
    }

    @PostMapping("/update")
    public String updateCompany(@ModelAttribute("company") Company company) {
        companyService.saveOrUpdate(company);
        return "redirect:/companies/all";
    }

    @GetMapping("/delete/{id}")
    public String deleteCompany(@PathVariable("id") Integer id) {
        companyService.deleteCompany(id);
        return "redirect:/companies/all";
    }
}
