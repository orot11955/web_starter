package com.project.web_starter_was.domain.user.service;

import com.project.web_starter_was.domain.role.entity.Permission;
import com.project.web_starter_was.domain.role.entity.Role;
import com.project.web_starter_was.domain.role.repository.RoleRepository;
import com.project.web_starter_was.domain.user.entity.User;
import com.project.web_starter_was.domain.user.repository.UserRepository;
import com.project.web_starter_was.global.security.CustomUserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public CustomUserDetailsService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for (Permission permission : roleRepository.findPermissionsByUserId(user.id())) {
            authorities.add(new SimpleGrantedAuthority(permission.code()));
        }

        for (Role role : roleRepository.findRolesByUserId(user.id())) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.code()));
        }

        return new CustomUserDetails(
                user.id(),
                user.username(),
                user.password(),
                user.enabled(),
                authorities
        );
    }
}
