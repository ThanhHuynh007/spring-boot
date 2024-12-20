package com.example.demo2.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String companyName;
    private String roleName;  // Changed roleId to roleName

    // Constructor with roleName
    public UserDTO(Integer id, String email, String firstName, String lastName, String roleName) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleName = roleName;  // Assign roleName instead of roleId
    }
}
