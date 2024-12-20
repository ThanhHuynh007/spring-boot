package com.example.demo2.service;

import com.example.demo2.dto.CompanyDTO;
import com.example.demo2.dto.UserDTO;
import com.example.demo2.model.Company;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // Lấy danh sách tất cả các công ty với roleName thay vì roleId
    public List<CompanyDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();

        return companies.stream()
                .map(company -> new CompanyDTO(
                        company.getId(),
                        company.getName(),
                        company.getUsers().stream()
                                .map(user -> new UserDTO(
                                        user.getId(),
                                        user.getEmail(),
                                        user.getFirstName(),
                                        user.getLastName(),
                                        user.getRole() != null ? user.getRole().getName() : null // Lấy roleName thay vì roleId
                                ))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    // Lấy công ty theo ID
    public Company getCompanyById(Integer id) {
        return companyRepository.findById(id).orElse(null);
    }

    // Xóa công ty theo ID
    public void deleteCompany(Integer id) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));
        for (UserDemo user : company.getUsers()) {
            user.setCompany(null);
        }
        companyRepository.delete(company);
    }

    @Transactional
    public void saveOrUpdate(Company company) {
        if (company.getUsers() != null) {
            for (UserDemo user : company.getUsers()) {
                user.setCompany(company);
            }
        }
        companyRepository.save(company);
    }
}
