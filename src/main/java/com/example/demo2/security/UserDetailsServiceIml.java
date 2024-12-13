package com.example.demo2.security;

import com.example.demo2.model.Role;
import com.example.demo2.model.UserDemo;
import com.example.demo2.repository.RoleRepository;
import com.example.demo2.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Data
public class UserDetailsServiceIml implements UserDetailsService {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDemo user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        // Lấy danh sách roles từ repository
        List<Role> roles = roleRepository.findRolesByEmail(email);
        if (roles.isEmpty()) {
            System.out.println("No roles found for user: " + email);
        }

        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName())) // Nếu "ROLE_" đã có trong DB, không cần thêm nữa
                .collect(Collectors.toList());

        System.out.println("Granted Authorities: " + authorities);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                authorities
        );
    }

}
