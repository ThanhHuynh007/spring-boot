package com.example.demo2.dto;

import com.example.demo2.model.Company;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Configuration
public class Convert {

    @Autowired
    private UserRepository userRepository;

    public Company convertCompanyToEntity(CompanyDTO companyDTO) {
        Company company = new Company();
        company.setId(companyDTO.getId());
        company.setName(companyDTO.getName());

        if (companyDTO.getUserEmails() != null) {
            List<UserDemo> users = companyDTO.getUserEmails().stream()
                    .map(email -> userRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found with email: " + email)))
                    .collect(Collectors.toList());
            users.forEach(user -> user.setCompany(company));
            company.setUsers(users);
        }else {
            System.out.println("user not found");
        }

        return company;
    }

    public CompanyDTO convertCompanyToDTO(Company company) {
        List<UserDTO> userDTOs = company.getUsers().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName()
                ))
                .collect(Collectors.toList());

        return new CompanyDTO(
                company.getId(),
                company.getName(),
                userDTOs
        );
    }

    public UserDTO convertUserToDTO(UserDemo user) {
        String companyName = (user.getCompany() != null) ? user.getCompany().getName() : null;
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                companyName
        );
    }
}
