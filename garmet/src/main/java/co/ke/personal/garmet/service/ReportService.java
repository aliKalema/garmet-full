package co.ke.personal.garmet.service;

import co.ke.personal.garmet.model.Summary;
import co.ke.personal.garmet.repository.CategoryRepository;
import co.ke.personal.garmet.repository.OrderRepository;
import co.ke.personal.garmet.repository.ProductRepository;
import co.ke.personal.garmet.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public Summary getSummary(){
        Summary summary = new Summary();
        summary.setTotalCategories(categoryRepository.getTotalCategories());
        summary.setTotalProducts(productRepository.getTotalProducts());
        summary.setTotalOrders(orderRepository.getTotalOrders());
        summary.setTotalUsers(userRepository.getTotalUsers());
        log.info(summary.toString());
        return summary;
    }
}
