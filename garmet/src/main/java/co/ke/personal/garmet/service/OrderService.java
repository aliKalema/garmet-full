package co.ke.personal.garmet.service;

import co.ke.personal.garmet.model.Order;
import co.ke.personal.garmet.model.OrderItem;
import co.ke.personal.garmet.model.OrderStatus;
import co.ke.personal.garmet.model.ProductVariety;
import co.ke.personal.garmet.payload.Cart;
import co.ke.personal.garmet.payload.CartItem;
import co.ke.personal.garmet.repository.OrderRepository;
import co.ke.personal.garmet.security.service.UserService;
import co.ke.personal.garmet.security.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;
    private final ProductVarietyService productVarietyService;

    public List<Order> getUserOrder(){
        User user  = userService.getProfile();
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(Cart cart) {
        User user =  userService.getProfile();
        Order order =  new Order();
        BigDecimal total =  BigDecimal.ZERO;
        if(cart.getCartItems().size()>0){
            for(CartItem cartItem : cart.getCartItems()){
                OrderItem orderItem = new OrderItem();
                ProductVariety productVariety = productVarietyService.getByRefId(cartItem.getRefId());
                orderItem.setProductVariety(productVariety);
                orderItem.setProductName(productVariety.getProduct().getName());
                orderItem.setPrice(productVariety.getPrice());
                orderItem.setQuantity(cartItem.getQuantity());
                order.addOrderItem(orderItem);
                total = total.add(productVariety.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            }
        }
        order.setOrderStatus(OrderStatus.PROCESSING);
        order.setTotal(total);
       order.setUser(user);
       order.setTimestamp(LocalDateTime.now());
       return orderRepository.save(order);
    }
}
