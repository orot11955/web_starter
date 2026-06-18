package com.project.web_starter_was.domain.auth.service;

import com.project.web_starter_was.domain.auth.dto.AuthUserResponse;
import com.project.web_starter_was.domain.auth.dto.LoginRequest;
import com.project.web_starter_was.domain.auth.dto.LoginResponse;
import com.project.web_starter_was.domain.role.entity.Permission;
import com.project.web_starter_was.domain.role.entity.Role;
import com.project.web_starter_was.domain.role.repository.RoleRepository;
import com.project.web_starter_was.domain.user.entity.User;
import com.project.web_starter_was.domain.user.repository.UserRepository;
import com.project.web_starter_was.global.exception.BusinessException;
import com.project.web_starter_was.global.exception.ErrorCode;
import com.project.web_starter_was.global.security.CustomUserDetails;
import com.project.web_starter_was.global.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider,
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED));
        AuthUserResponse authUser = toAuthUserResponse(user);
        String accessToken = jwtTokenProvider.createAccessToken(
                user.id(),
                user.username(),
                authUser.roles(),
                authUser.permissions()
        );

        return new LoginResponse(accessToken, null, authUser);
    }

    @Transactional(readOnly = true)
    public AuthUserResponse me(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED));

        return toAuthUserResponse(user);
    }

    private AuthUserResponse toAuthUserResponse(User user) {
        List<String> roles = roleRepository.findRolesByUserId(user.id())
                .stream()
                .map(Role::code)
                .toList();
        List<String> permissions = roleRepository.findPermissionsByUserId(user.id())
                .stream()
                .map(Permission::code)
                .toList();

        return new AuthUserResponse(
                String.valueOf(user.id()),
                user.name(),
                user.username(),
                roles,
                permissions
        );
    }
}
