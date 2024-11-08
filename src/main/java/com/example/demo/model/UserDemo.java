// UserDemo.java
package com.example.demo2.model;

import jakarta.persistence.*;

@Entity
@Table(name = "USER_DEMO")
public class UserDemo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "company_id") // Maps this column to the company table
    private Company company;

    // Constructors, getters, and setters
    public UserDemo() {
    }

    public UserDemo(String firstName, String lastName, Company company) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
