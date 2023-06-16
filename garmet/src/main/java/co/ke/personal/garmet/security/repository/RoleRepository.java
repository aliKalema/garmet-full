package co.ke.personal.garmet.security.repository;

import co.ke.personal.garmet.security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
