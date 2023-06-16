package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.ProductVariety;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductVarietyRepository extends JpaRepository<ProductVariety, Long> {
    Optional<ProductVariety> findByRefId(String refId);
}
