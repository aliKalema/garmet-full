package co.ke.personal.garmet.security.service;

import co.ke.personal.garmet.security.model.Role;
import co.ke.personal.garmet.security.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    void removeRoleFromUser(String username, String roleName);

    List<Role> getRoles();
    User getUser(String username);
    List<User> getUsers();

    User getProfile();

    void deleteUser(int id);

    User updateUser(User user);
}
