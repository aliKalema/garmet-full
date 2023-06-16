package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
