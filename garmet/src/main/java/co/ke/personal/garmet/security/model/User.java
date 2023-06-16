package co.ke.personal.garmet.security.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String phone;

    private String username;

    private String password;

    private Boolean active = true;

    @ManyToMany(cascade= CascadeType.ALL,fetch= FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public void addRole(Role role) {
        roles.add(role);
    }
}
