// Company.java
package com.example.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "COMPANY")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "company", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<UserDemo> users = new ArrayList<>();

    // Constructor
    public Company() {}

    public Company(String name) {
        this.name = name;
    }

    // Getters and setters for id and name
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

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
