package co.ke.personal.garmet.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "Parent")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refId;

    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Category parent;

    @OneToMany
    @JoinTable(name="category_children")
    private List<Category> children;

    @Transient
    private String parentRefId;

    public void update(Category toUpdate){
        if(!toUpdate.getName().isEmpty()){
            this.name = toUpdate.getName();
        }
        if(toUpdate.getParent()!=null){
            this.parent = toUpdate.getParent();
        }
    }

    public void addChild(Category child){
        this.children.add(child);
    }
}
