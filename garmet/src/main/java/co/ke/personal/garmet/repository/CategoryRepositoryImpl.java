package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class CategoryRepositoryImpl {
    private final EntityManager entityManager;
    @Autowired
    CategoryRepositoryImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

//    public Page<Category> findAll(Pageable pageable, String searchTerm){
//        String query = "SELECT c FROM Category c";
//        if(searchTerm != null && !searchTerm.isEmpty()) {
//            if(searchTerm != null && !searchTerm.isEmpty()) {
//                query += " WHERE c.name LIKE CONCAT('%', :searchTerm, '%')";
//            }
//        }
//        TypedQuery<Category> typedQuery = entityManager.createQuery(query, Category.class);
//        if(searchTerm != null && !searchTerm.isEmpty()) {
//            typedQuery.setParameter("searchTerm", searchTerm);
//        }
//        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
//        typedQuery.setMaxResults(pageable.getPageSize());
//        List<Category> categories = typedQuery.getResultList();
//        long count = entityManager.createQuery(query, Category.class).getResultStream().count();
//        return new PageImpl<>(categories, pageable, count);
//    }

    public Page<Category> findAll(Pageable pageable, String searchTerm) {
        String query = "SELECT c FROM Category c";
        if (searchTerm != null && !searchTerm.isEmpty()) {
            query += " WHERE c.name LIKE CONCAT('%', :searchTerm, '%')";
        }
        TypedQuery<Category> typedQuery = entityManager.createQuery(query, Category.class);
        if (searchTerm != null && !searchTerm.isEmpty()) {
            typedQuery.setParameter("searchTerm", searchTerm);
        }
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<Category> categories = typedQuery.getResultList();
        long count = countQuery(pageable, searchTerm);
        return new PageImpl<>(categories, pageable, count);
    }

    private long countQuery(Pageable pageable, String searchTerm) {
        String query = "SELECT COUNT(c) FROM Category c";
        if (searchTerm != null && !searchTerm.isEmpty()) {
            query += " WHERE c.name LIKE CONCAT('%', :searchTerm, '%')";
        }
        TypedQuery<Long> typedQuery = entityManager.createQuery(query, Long.class);
        if (searchTerm != null && !searchTerm.isEmpty()) {
            typedQuery.setParameter("searchTerm", searchTerm);
        }
        return typedQuery.getSingleResult();
    }

    public Page<Category> findAllLastChildren(String searchTerm, Pageable pageable) {
        String query = "SELECT c FROM Category c WHERE NOT EXISTS (SELECT 1 FROM Category c2 WHERE c2.parent = c) AND (c.parent IS NOT NULL OR NOT EXISTS (SELECT 1 FROM Category c3 WHERE c3.parent = c))";
        if(searchTerm != null && !searchTerm.isEmpty()) {
            query += " AND c.name LIKE CONCAT('%', :searchTerm, '%')";
        }
        TypedQuery<Category> typedQuery = entityManager.createQuery(query, Category.class);
        if(searchTerm != null && !searchTerm.isEmpty()) {
            typedQuery.setParameter("searchTerm", searchTerm);
        }
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<Category> categories = typedQuery.getResultList();
        long count = entityManager.createQuery(query, Category.class).getResultStream().count();
        return new PageImpl<>(categories, pageable, count);
    }
}
