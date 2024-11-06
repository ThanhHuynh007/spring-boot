// CompanyService.java
package com.example.demo2.service;

import com.example.demo2.model.Company;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.CompanyRepository;
import com.example.demo2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    // Retrieve all companies
    public List<Company> getAllCompanies() {
        return (List<Company>) companyRepository.findAll();
    }

    // Save or update a company
    public Company saveOrUpdate(Company company) {
        return companyRepository.save(company);
    }

    // Retrieve a single company by ID
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    // Delete a company by ID
    @Transactional
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }

    // Add a user to a company
    @Transactional
    public void addUserToCompany(Long companyId, UserDemo user) {
        Company company = getCompanyById(companyId);  // getCompanyById throws if company is not found
        user.setCompany(company);  // Set the company for the user
        company.addUser(user);     // Add user to the company's list
        companyRepository.save(company);  // Save changes in both entities
    }

    // Remove a user from a company
    @Transactional
    public void removeUserFromCompany(Long companyId, Long userId) {
        Company company = getCompanyById(companyId);  // Ensure the company exists
        UserDemo user = userRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        company.removeUser(user);  // Remove user from the company's list
        user.setCompany(null);     // Unset company for the user
        companyRepository.save(company);  // Save changes
        userRepository.save(user);  // Persist changes in user as well
    }
}
