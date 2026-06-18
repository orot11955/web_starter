package com.project.web_starter_was.domain.user.repository;

import com.project.web_starter_was.domain.user.dto.UserSearchRequest;
import com.project.web_starter_was.domain.user.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    private final JdbcClient jdbcClient;
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcClient jdbcClient, JdbcTemplate jdbcTemplate) {
        this.jdbcClient = jdbcClient;
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findById(Long id) {
        return jdbcClient.sql("""
                select id, name, username, password, enabled, created_at, updated_at
                from users
                where id = :id
                """)
                .param("id", id)
                .query(User.class)
                .optional();
    }

    public Optional<User> findByUsername(String username) {
        return jdbcClient.sql("""
                select id, name, username, password, enabled, created_at, updated_at
                from users
                where username = :username
                """)
                .param("username", username)
                .query(User.class)
                .optional();
    }

    public boolean existsByUsername(String username) {
        Integer count = jdbcClient.sql("select count(*) from users where username = :username")
                .param("username", username)
                .query(Integer.class)
                .single();

        return count != null && count > 0;
    }

    public List<User> search(UserSearchRequest request, int page, int pageSize) {
        String keyword = normalizeKeyword(request.keyword());
        int offset = Math.max(page - 1, 0) * pageSize;

        return jdbcClient.sql("""
                select id, name, username, password, enabled, created_at, updated_at
                from users
                where (:keyword is null or lower(name) like :keyword or lower(username) like :keyword)
                  and (:enabled is null or enabled = :enabled)
                order by id desc
                limit :limit offset :offset
                """)
                .param("keyword", keyword)
                .param("enabled", request.enabled())
                .param("limit", pageSize)
                .param("offset", offset)
                .query(User.class)
                .list();
    }

    public long count(UserSearchRequest request) {
        String keyword = normalizeKeyword(request.keyword());
        Long count = jdbcClient.sql("""
                select count(*)
                from users
                where (:keyword is null or lower(name) like :keyword or lower(username) like :keyword)
                  and (:enabled is null or enabled = :enabled)
                """)
                .param("keyword", keyword)
                .param("enabled", request.enabled())
                .query(Long.class)
                .single();

        return count == null ? 0 : count;
    }

    public Long save(String name, String username, String password) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    "insert into users (name, username, password, enabled) values (?, ?, ?, true)",
                    Statement.RETURN_GENERATED_KEYS
            );
            statement.setString(1, name);
            statement.setString(2, username);
            statement.setString(3, password);
            return statement;
        }, keyHolder);

        Number key = keyHolder.getKey();

        if (key == null) {
            throw new IllegalStateException("User id was not generated.");
        }

        return key.longValue();
    }

    public void update(Long id, String name, boolean enabled) {
        jdbcClient.sql("""
                update users
                set name = :name,
                    enabled = :enabled,
                    updated_at = current_timestamp
                where id = :id
                """)
                .param("id", id)
                .param("name", name)
                .param("enabled", enabled)
                .update();
    }

    public void delete(Long id) {
        jdbcClient.sql("delete from user_roles where user_id = :id")
                .param("id", id)
                .update();
        jdbcClient.sql("delete from users where id = :id")
                .param("id", id)
                .update();
    }

    public void replaceRoles(Long userId, List<Long> roleIds) {
        jdbcClient.sql("delete from user_roles where user_id = :userId")
                .param("userId", userId)
                .update();

        for (Long roleId : roleIds) {
            jdbcClient.sql("insert into user_roles (user_id, role_id) values (:userId, :roleId)")
                    .param("userId", userId)
                    .param("roleId", roleId)
                    .update();
        }
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }

        return "%" + keyword.trim().toLowerCase() + "%";
    }
}
