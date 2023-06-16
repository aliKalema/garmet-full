package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findAll(Pageable pageable);
    Optional<Category> findByName(String name );

    Optional<Category> findByRefId(String refId);

    @Query(value = "Select * From category c WHERE parent_id IS NULL OR parent_id = 0", nativeQuery = true)
    public Page<Category> findAllParents(Pageable pageable);

    @Query(value = "SELECT * FROM category c WHERE (parent_id IS NULL OR parent_id = 0) AND (c.name LIKE %:searchTerm% )",nativeQuery = true)
    public Page<Category> findAllParentsByName(Pageable pageable, @Param("searchTerm") String searchTerm);

    @Query(value = "SELECT * FROM category c WHERE  (c.name LIKE %:searchTerm% )",nativeQuery = true)
    public Page<Category> findAllByName(Pageable pageable, @Param("searchTerm") String searchTerm);

    @Query(value = "SELECT c.* FROM category c LEFT JOIN (SELECT DISTINCT parent_id FROM category WHERE parent_id IS NOT NULL) children ON c.id = children.parent_id WHERE children.parent_id IS NULL", nativeQuery = true)
    public Page<Category> findLastChildNodesAndCategoriesWithoutChildren(Pageable pageable);

    @Query(value = "SELECT COUNT(c) FROM Category c")
    Integer getTotalCategories();
}
