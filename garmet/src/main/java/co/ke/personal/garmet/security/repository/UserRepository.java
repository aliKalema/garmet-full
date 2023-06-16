package co.ke.personal.garmet.security.repository;

import co.ke.personal.garmet.security.model.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.active =true")
    User findByUsername(@Param("username") String username);

    Optional<User> findByPhone(String phone);

    @Query(value = "SELECT COUNT(u) FROM User u WHERE u.active = true")
    Integer getTotalUsers();


    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findAllByActive();
}
