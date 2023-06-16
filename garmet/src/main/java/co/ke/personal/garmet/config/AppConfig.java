package co.ke.personal.garmet.config;


import co.ke.personal.garmet.security.model.Role;
import co.ke.personal.garmet.security.model.User;
import co.ke.personal.garmet.security.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Configuration
@Slf4j
public class AppConfig {

//    @Bean
//    CommandLineRunner commandLineRunner(ApplicationContext ctx) {
//        return args -> {
//            UserService userService = ctx.getBean(UserService.class);
//            User user  =  new User();
//            user.setFirstName("Ali");
//            user.setLastName("Kalema");
//            user.setPhone("0740569487");
//            user.setUsername("aliKalema");
//            user.setPassword("admin");
//            List<Role> roles = new ArrayList<>();
//            roles.add(new Role("ADMIN"));
//            user.setRoles(roles);
//            userService.saveUser(user);
//        };
//    }

}
