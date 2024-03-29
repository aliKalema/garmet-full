package co.ke.personal.garmet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Summary {
    private Integer totalCategories;
    private Integer totalProducts;
    private Integer totalOrders;
    private Integer totalUsers;
}
