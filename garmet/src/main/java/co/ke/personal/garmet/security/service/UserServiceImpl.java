package co.ke.personal.garmet.security.service;

import co.ke.personal.garmet.exception.type.Exceptions;
import co.ke.personal.garmet.security.model.Role;
import co.ke.personal.garmet.security.model.User;
import co.ke.personal.garmet.security.repository.RoleRepository;
import co.ke.personal.garmet.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
     final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        Optional<User> exist = userRepository.findByPhone(user.getPhone());
        if(user.getRoles().size()==0){
            user.addRole(new Role("USER"));
        }
        if(exist.isEmpty()){
            log.info("Saving new user {} to the database", user.getFirstName());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
        else{
            String message = String.format("User with phone: %s Exist",user.getPhone());
            log.info(message);
            throw new Exceptions.UserExistException(message);
        }

    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Transactional
    @Override
    public void removeRoleFromUser(String username, String roleName) {
        Role role = roleRepository.findByName(roleName);
        User user = userRepository.findByUsername(username);
        for(Role rol : user.getRoles()){
            if(rol.getName().equals(role.getName())){
                user.getRoles().remove(rol);
            }
        }
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAllByActive();
    }

    @Override
    public User getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username =  authentication.getName();
            return userRepository.findByUsername(username);
        }
        return null;
    }

    @Override
    public void deleteUser(int id) {
        User user = userRepository.getById((long) id);
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public User updateUser(User user){
        User original  =  userRepository.getById(user.getId());
        original.setFirstName(user.getFirstName());
        original.setRoles(user.getRoles());
        original.setLastName(user.getLastName());
        original.setPhone(user.getPhone());
        return userRepository.save(original);
    }

}
