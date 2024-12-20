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

    // Chuyển đổi CompanyDTO thành entity Company
    public Company convertCompanyToEntity(CompanyDTO companyDTO) {
        Company company = new Company();
        company.setId(companyDTO.getId());
        company.setName(companyDTO.getName());

        // Chuyển đổi email người dùng thành danh sách UserDemo
        if (companyDTO.getUserEmails() != null) {
            List<UserDemo> users = companyDTO.getUserEmails().stream()
                    .map(email -> userRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found with email: " + email)))
                    .collect(Collectors.toList());

            // Gán công ty cho mỗi người dùng
            users.forEach(user -> user.setCompany(company));
            company.setUsers(users);
        } else {
            System.out.println("No users found");
        }

        return company;
    }

    // Chuyển đổi Company thành CompanyDTO
    public CompanyDTO convertCompanyToDTO(Company company) {
        List<UserDTO> userDTOs = company.getUsers().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getCompany() != null ? user.getCompany().getName() : null, // companyName từ công ty
                        user.getRole() != null ? user.getRole().getName() : null  // Lấy roleName thay vì roleId
                ))
                .collect(Collectors.toList());

        return new CompanyDTO(
                company.getId(),
                company.getName(),
                userDTOs
        );
    }

    // Chuyển đổi UserDemo thành UserDTO
    public UserDTO convertUserToDTO(UserDemo user) {
        String companyName = (user.getCompany() != null) ? user.getCompany().getName() : null;

        // Trả về UserDTO với roleName từ Role thay vì roleId
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                companyName,
                user.getRole() != null ? user.getRole().getName() : null  // roleName lấy từ Role thay vì roleId
        );
    }
}
