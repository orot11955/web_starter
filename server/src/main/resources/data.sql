insert into users (id, name, username, password, enabled)
values (1, 'Admin', 'admin', '{noop}admin', true);

insert into roles (id, code, name) values
    (1, 'ADMIN', 'Administrator'),
    (2, 'MANAGER', 'Manager'),
    (3, 'USER', 'User');

insert into permissions (id, code, name) values
    (1, 'USER_READ', 'Read users'),
    (2, 'USER_WRITE', 'Write users'),
    (3, 'SYSTEM_READ', 'Read system'),
    (4, 'SYSTEM_WRITE', 'Write system');

insert into user_roles (user_id, role_id) values (1, 1);

insert into role_permissions (role_id, permission_id) values
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (3, 1);
