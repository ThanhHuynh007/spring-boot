package com.example.demo2.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "COMPANY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "company", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = false)
    private List<UserDemo> users = new ArrayList<>();
}
