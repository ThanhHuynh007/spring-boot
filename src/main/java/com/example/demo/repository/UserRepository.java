// UserRepository.java
package com.example.demo.repository;

import com.example.demo.model.UserDemo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserDemo, Integer> {
}
