// UserRepository.java
package com.example.demo2.repository;

import com.example.demo2.model.UserDemo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserDemo, Integer> {
}
