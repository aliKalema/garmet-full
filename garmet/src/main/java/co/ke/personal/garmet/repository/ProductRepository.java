package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("Select p FROM Product p WHERE p.refId =:refid AND p.active = true")
    Optional<Product> findByRefId(@Param("refid") String refId);
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:searchTerm% AND p.active = true")
    Page<Product> findAllBySearchTerm(Pageable pageable,  @Param("searchTerm") String searchTerm);

    @Query(value = "SELECT COUNT(p) FROM Product p")
    Integer getTotalProducts();

    @Query("SELECT p FROM Product p WHERE p.active = true")
    Page<Product> findAllActiveProducts(Pageable pageable);
}
