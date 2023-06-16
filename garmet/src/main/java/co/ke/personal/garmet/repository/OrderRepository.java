package co.ke.personal.garmet.repository;

import co.ke.personal.garmet.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM orders o  WHERE o.user_id = ?",nativeQuery = true)
    List<Order> findByUserId(Long id);

    @Query(value = "SELECT COUNT(o) FROM Order o")
    Integer getTotalOrders();
}
