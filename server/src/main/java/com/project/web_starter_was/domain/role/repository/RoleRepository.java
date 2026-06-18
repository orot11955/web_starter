package com.project.web_starter_was.domain.role.repository;

import com.project.web_starter_was.domain.role.entity.Permission;
import com.project.web_starter_was.domain.role.entity.Role;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public class RoleRepository {
    private final JdbcClient jdbcClient;

    public RoleRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Role> findByCodeIn(Collection<String> codes) {
        if (codes == null || codes.isEmpty()) {
            return List.of();
        }

        return jdbcClient.sql("select id, code, name from roles where code in (:codes) order by id")
                .param("codes", codes)
                .query(Role.class)
                .list();
    }

    public List<Permission> findPermissionsByUserId(Long userId) {
        return jdbcClient.sql("""
                select distinct p.id, p.code, p.name
                from permissions p
                join role_permissions rp on rp.permission_id = p.id
                join user_roles ur on ur.role_id = rp.role_id
                where ur.user_id = :userId
                order by p.id
                """)
                .param("userId", userId)
                .query(Permission.class)
                .list();
    }

    public List<Role> findRolesByUserId(Long userId) {
        return jdbcClient.sql("""
                select distinct r.id, r.code, r.name
                from roles r
                join user_roles ur on ur.role_id = r.id
                where ur.user_id = :userId
                order by r.id
                """)
                .param("userId", userId)
                .query(Role.class)
                .list();
    }
}
