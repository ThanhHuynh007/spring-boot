// Company.java
package com.example.demo2.model;

import jakarta.persistence.*;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "COMPANY")
public class Company {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserDemo> users = new ArrayList<>();

    // Constructor
    public Company() {}

    public Company(String name) {
        this.name = name;
    }

    // Getters and setters for id and name
    public Long getId() { return id; }

    public String getName() { return name; }

    public List<UserDemo> getUsers() { return users; }

    // Helper method to add a user
    public void addUser(UserDemo user) {
        users.add(user);
        user.setCompany(this);
    }

    // Helper method to remove a user
    public void removeUser(UserDemo user) {
        users.remove(user);
        user.setCompany(null);
    }
}
