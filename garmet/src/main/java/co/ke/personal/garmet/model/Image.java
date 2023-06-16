package co.ke.personal.garmet.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.imagekit.sdk.models.results.Result;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name="image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(name = "file_id")
    private String fileId;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "is_private_file")
    private boolean isPrivateFile;

    @ElementCollection
    @CollectionTable(name = "image_tags")
    private List<String> tags;


    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference
    Product product;

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Image(Result result){
        name = result.getName();
        url= result.getUrl();
        fileId = result.getFileId();
        isPrivateFile = result.isPrivateFile();
        tags = result.getTags();
    }
}
