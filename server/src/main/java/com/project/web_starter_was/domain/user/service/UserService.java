package com.project.web_starter_was.domain.user.service;

import com.project.web_starter_was.domain.role.entity.Permission;
import com.project.web_starter_was.domain.role.entity.Role;
import com.project.web_starter_was.domain.role.repository.RoleRepository;
import com.project.web_starter_was.domain.user.dto.UserCreateRequest;
import com.project.web_starter_was.domain.user.dto.UserResponse;
import com.project.web_starter_was.domain.user.dto.UserSearchRequest;
import com.project.web_starter_was.domain.user.dto.UserUpdateRequest;
import com.project.web_starter_was.domain.user.entity.User;
import com.project.web_starter_was.domain.user.repository.UserRepository;
import com.project.web_starter_was.global.exception.BusinessException;
import com.project.web_starter_was.global.exception.ErrorCode;
import com.project.web_starter_was.global.response.PageResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> search(UserSearchRequest request, int page, int pageSize) {
        int safePage = Math.max(page, 1);
        int safePageSize = Math.min(Math.max(pageSize, 1), 100);
        List<UserResponse> items = userRepository.search(request, safePage, safePageSize)
                .stream()
                .map(this::toResponse)
                .toList();
        long total = userRepository.count(request);

        return PageResponse.of(items, safePage, safePageSize, total);
    }

    @Transactional(readOnly = true)
    public UserResponse get(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND));

        return toResponse(user);
    }

    @Transactional
    public UserResponse create(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessException(ErrorCode.DUPLICATE_USERNAME);
        }

        List<Role> roles = roleRepository.findByCodeIn(request.roles());
        validateRoles(request.roles(), roles);

        Long userId = userRepository.save(
                request.name(),
                request.username(),
                passwordEncoder.encode(request.password())
        );
        userRepository.replaceRoles(userId, roles.stream().map(Role::id).toList());

        return get(userId);
    }

    @Transactional
    public UserResponse update(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND));
        List<Role> roles = roleRepository.findByCodeIn(request.roles());
        validateRoles(request.roles(), roles);

        userRepository.update(user.id(), request.name(), request.enabled());
        userRepository.replaceRoles(user.id(), roles.stream().map(Role::id).toList());

        return get(user.id());
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND));

        userRepository.delete(user.id());
    }

    private UserResponse toResponse(User user) {
        List<String> roles = roleRepository.findRolesByUserId(user.id())
                .stream()
                .map(Role::code)
                .toList();
        List<String> permissions = roleRepository.findPermissionsByUserId(user.id())
                .stream()
                .map(Permission::code)
                .toList();

        return new UserResponse(
                user.id(),
                user.name(),
                user.username(),
                user.enabled(),
                roles,
                permissions,
                user.createdAt(),
                user.updatedAt()
        );
    }

    private void validateRoles(List<String> requestedRoleCodes, List<Role> roles) {
        if (roles.size() != requestedRoleCodes.stream().distinct().count()) {
            throw new BusinessException(ErrorCode.INVALID_REQUEST, "존재하지 않는 역할이 포함되어 있습니다.");
        }
    }
}
