// CompanyController.java
package com.example.demo.controller;

import com.example.demo.model.Company;
import com.example.demo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/companies")
    public String listCompanies(Model model) {
        model.addAttribute("companies", companyService.getAllCompanies());
        return "companyList";  // Ensure this template lists companies and associated users
    }

    @GetMapping("/addCompany")
    public String addCompanyForm(Model model) {
        model.addAttribute("company", new Company());
        return "addCompany";  // Form to add a new company
    }

    @PostMapping("/addCompany")
    public String saveCompany(@ModelAttribute("company") Company company, RedirectAttributes redirectAttributes) {
        companyService.saveOrUpdate(company);
        redirectAttributes.addFlashAttribute("message", "Company added successfully!");
        return "redirect:/companies";
    }

    @GetMapping("/editCompany/{id}")
    public String editCompanyForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Company company = companyService.getCompanyById(id);
        if (company == null) {
            redirectAttributes.addFlashAttribute("error", "Company not found");
            return "redirect:/companies";
        }
        model.addAttribute("company", company);
        return "editCompany";  // Form to edit an existing company
    }

    @PostMapping("/updateCompany/{id}")
    public String updateCompany(@PathVariable Long id, @ModelAttribute("company") Company company, RedirectAttributes redirectAttributes) {
        company.setId(id);  // Set ID to update
        companyService.saveOrUpdate(company);
        redirectAttributes.addFlashAttribute("message", "Company updated successfully!");
        return "redirect:/companies";
    }

    @GetMapping("/deleteCompany/{id}")
    public String deleteCompany(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        companyService.deleteCompany(id);
        redirectAttributes.addFlashAttribute("message", "Company deleted successfully!");
        return "redirect:/companies";
    }
}
