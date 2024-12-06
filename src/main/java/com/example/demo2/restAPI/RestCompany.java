package com.example.demo2.restAPI;


import com.example.demo2.dto.CompanyDTO;
import com.example.demo2.dto.Convert;
import com.example.demo2.model.Company;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.UserRepository;
import com.example.demo2.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestCompany {
    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Convert convert;

    //GET ALL COMPANIES
    @GetMapping("/admin/companies")
    public ResponseEntity<?> getAllCompanies() {
        List<CompanyDTO> companies = companyService.getAllCompanies();
        if (companies.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(companies);
    }

    //DELETE COMPANY
    @DeleteMapping("/admin/company/delete/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Integer id) {
        try {
            companyService.deleteCompany(id);
            return ResponseEntity.ok("Company deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //ADD COMPANY
    @PostMapping("/admin/company/add")
    public ResponseEntity<?> saveOrUpdateCompany(@RequestBody CompanyDTO companyDTO) {
        try {
            Company company = convert.convertCompanyToEntity(companyDTO);

            companyService.saveOrUpdate(company);

            return ResponseEntity.status(HttpStatus.CREATED).body("Company saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving company: " + e.getMessage());
        }
    }

    //UPDATE COMPANY
    @PostMapping("/admin/company/edit/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable Integer id, @RequestBody CompanyDTO companyDTO) {
        try {
            Company company = companyService.getCompanyById(id);

            company.setName(companyDTO.getName());

            if (companyDTO.getUserEmails() != null) {
                List<UserDemo> users = companyDTO.getUserEmails().stream()
                        .map(email -> userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found with email: " + email)))
                        .collect(Collectors.toList());

                users.forEach(user -> user.setCompany(company));
                company.setUsers(users);
            }

            companyService.saveOrUpdate(company);

            return ResponseEntity.ok("Company updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating company: " + e.getMessage());
        }
    }

    //GET COMPANY BY ID
    @GetMapping("/admin/company/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Integer id) {
        try {
            Company company = companyService.getCompanyById(id);
            if (company == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Company not found with ID: " + id);
            }

            CompanyDTO companyDTO = convert.convertCompanyToDTO(company);
            return ResponseEntity.ok(companyDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching company: " + e.getMessage());
        }
    }
}
