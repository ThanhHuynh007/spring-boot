package com.example.demo2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
    private Integer id;
    private String name;
    private List<UserDTO> users;

    private List<String> userEmails;

    public CompanyDTO(Integer id, String name, List<UserDTO> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}
