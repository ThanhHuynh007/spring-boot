package service;

import com.example.demo.model.UserDemo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void saveOrUpdate(UserDemo user) {
        userRepository.save(user);
    }
}