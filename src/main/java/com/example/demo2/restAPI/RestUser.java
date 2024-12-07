package com.example.demo2.restAPI;

import com.example.demo2.dto.Convert;
import com.example.demo2.dto.UserDTO;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.UserRepository;
import com.example.demo2.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestUser {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Convert convert;

    //GET ALL USER
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDemo> users = userRepository.findAll();
            List<UserDTO> userDTOs = users.stream()
                    .map(convert::convertUserToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(userDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<>());
        }
    }

    //GET USER BY ID
    @GetMapping("/admin/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        try {
            UserDemo user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

            UserDTO userDTO = convert.convertUserToDTO(user);

            return ResponseEntity.ok(userDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user: " + e.getMessage());
        }
    }

    //REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserDemo> register(@RequestBody UserDemo request){
        return ResponseEntity.ok(userService.createUser(request));
    }

    //UPDATE USER
    @PostMapping("/admin/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDemo user, @PathVariable int id){
        return new ResponseEntity<UserDemo>(userService.updateUser(id, user), HttpStatus.OK);
    }

    //DELETE USER
    @DeleteMapping("/admin/delete/{id}")
    @Transactional
    public String deleteUser(@PathVariable int id) throws IOException {
        Optional<UserDemo> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteByUserId(id);
            userRepository.deleteById(id);
            return "Delete Successfully";
        } else {
            return "User not found";
        }
    }
}
