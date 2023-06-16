package co.ke.personal.garmet.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refId;

    @Column(name="name")
    private String name;

    @Column(name="description",length = 800)
    private String description;

    @ManyToMany
    @JoinTable(name="product_categories")
    private List<Category> categories;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Image> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ProductVariety> varieties;

    private Boolean active =true;

    @Transient
    private int worth;

    @Transient
    private int totalQuantity;

    public void removeCategory(int index){
        this.categories.remove(index);
    }

    @PostLoad
    public void  calculateTotalQuantity(){
         totalQuantity = 0;
         worth = 0;
        if (varieties != null && varieties.size()>0) {
            for (ProductVariety variety : varieties) {
                totalQuantity += variety.getQuantity();
                worth += variety.getPrice().intValue() * variety.getQuantity();
            }
        }
    }

    public void addCategory(Category category) {
        if(categories ==null){
            this.categories = new ArrayList<>();
        }
        this.categories.add(category);
    }
}
