package co.ke.personal.garmet.controller;

import co.ke.personal.garmet.model.Order;
import co.ke.personal.garmet.payload.Cart;
import co.ke.personal.garmet.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public record OrderController(OrderService orderService) {

    @GetMapping("/user")
    public List<Order> getUserOrder(){
        return orderService.getUserOrder();
    }

    @GetMapping
    public List<Order> getOrders(){
        return orderService.getOrders();
    }

    @PostMapping
    public Order makeOrder(@RequestBody Cart cart){
        return orderService.createOrder(cart);
    }
}
