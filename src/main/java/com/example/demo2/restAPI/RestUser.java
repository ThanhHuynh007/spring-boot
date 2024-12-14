package com.example.demo2.restAPI;

import com.example.demo2.dto.AuthRequest;
import com.example.demo2.dto.Convert;
import com.example.demo2.dto.UserDTO;
import com.example.demo2.model.Authen;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.UserRepository;
import com.example.demo2.security.AuthenticationService;
import com.example.demo2.security.JwtService;
import com.example.demo2.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

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
    public ResponseEntity<Authen> register(@RequestBody UserDemo request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    //LOGIN
    @PostMapping("/login")
    public ResponseEntity<Authen> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }

//    @PostMapping("/generateToken")
//    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
//        Authentication authentication =
//                authenticationManager
//                        .authenticate(new UsernamePasswordAuthenticationToken(
//                                authRequest.getEmail(),
//                                authRequest.getPassword()));
//
//        if (authentication.isAuthenticated()) {
//            return jwtService.generateToken(authRequest.getEmail());
//        } else {
//            throw new UsernameNotFoundException("Invalid user request!");
//        }
//    }

    //UPDATE USER
    @PostMapping("/admin/update/{id}")
    public ResponseEntity<String> updateUser(@RequestBody UserDemo user, @PathVariable int id) {
        userService.updateUser(id, user);
        return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
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
