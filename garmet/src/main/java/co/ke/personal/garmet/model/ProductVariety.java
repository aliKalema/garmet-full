package co.ke.personal.garmet.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@ToString(exclude = "product")
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariety {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refId;

    @Column(name="name")
    private String name;


    @Column(name = "price")
    private BigDecimal price;

    private String code;


    @Column(name = "quantity", length = 200)
    private Integer quantity;


    @Column(name = "min_quantity", length = 200)
    private Integer minQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
