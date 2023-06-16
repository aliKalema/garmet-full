package co.ke.personal.garmet.service;

import co.ke.personal.garmet.exception.type.Exceptions;
import co.ke.personal.garmet.model.Product;
import co.ke.personal.garmet.model.ProductVariety;
import co.ke.personal.garmet.payload.ProductFilter;
import co.ke.personal.garmet.repository.ProductRepository;
import co.ke.personal.garmet.model.Category;
import co.ke.personal.garmet.utility.StringUtils;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductVarietyService productVarietyService;
    private final CategoryService categoryService;
    private final ImageService imageService;
    public Page<Product> getProducts(Pageable pageable, String searchTerm) {
        if(StringUtils.isNotEmpty(searchTerm)){
            return productRepository.findAllBySearchTerm(pageable, searchTerm);
        }
        return productRepository.findAllActiveProducts(pageable);
    }

    public Product createProduct(Product product, MultipartFile[] images) {
        List<ProductVariety> varietySet = varietiesCopy(product.getVarieties());
        product.setVarieties(new ArrayList<>());
        String refId = StringUtils.generateRefId(16);
        while(productRepository.findByRefId(refId).isPresent()){
            refId = StringUtils.generateRefId(16);
        }
        product.setRefId(refId);
        if(product.getCategories().size()>0){
            for(int i=0;i<product.getCategories().size();i++){
                Optional<Category> exist = categoryService.exist(product.getCategories().get(i).getRefId());
                if(exist.isEmpty()){
                    product.removeCategory(i);
                }
                else{
                    product.getCategories().set(i, exist.get());
                }
            }
        }
        product =  productRepository.save(product);
        if(varietySet.size()>0){
            for(ProductVariety productVariety : varietySet){
                productVarietyService.createProductVariety(product, productVariety);
            }
        }
        if(images.length>0){
            imageService.processImages(images, product);
        }
        return product;
    }


    public Product updateProduct(Product product, MultipartFile[] images, String refId) {
        Product original =  getByRefId(refId);
        original.setCategories(new ArrayList<Category>());
        if(product.getCategories()!= null && product.getCategories().size()>0){
            for(Category cat : product.getCategories()){
                Optional<Category> catOptional = categoryService.exist(cat.getRefId());
                if(catOptional.isPresent()){
                    original.addCategory(catOptional.get());
                }
            }
        }

        original =  productRepository.save(original);
        log.info("Categories Updated");

        if(original.getVarieties().size()>0){
            original.getVarieties().forEach(productVarietyService::deleteVariety);
        }
        log.info("Varieties Cleaned");

        if(product.getVarieties()!= null && product.getVarieties().size()>0){
            for(ProductVariety productVariety : product.getVarieties()){
                productVarietyService.createProductVariety(original, productVariety);
            }
        }

        log.info("Varieties Updated");

        imageService.deleteImages(original);

        log.info("Images Cleaned");
        if(images.length>0){
            imageService.processImages(images, original);
        }
        log.info("Images Updated");

        return productRepository.save(original);
    }

    public Product getByRefId(String refId) {
        Optional<Product> productOptional = productRepository.findByRefId(refId);
        if(productOptional.isEmpty()){
            throw new Exceptions.ProductNotFoundException(refId);
        }
        return productOptional.get();
    }

    public List<ProductVariety> varietiesCopy(List<ProductVariety> productVarieties){
        List<ProductVariety>copy = new ArrayList<>();
        if(productVarieties.size()>0){
            copy.addAll(productVarieties);
        }
        return copy;
    }

    private String generateRefId(){
        String refId = StringUtils.generateRefId(16);
        while(productRepository.findByRefId(refId).isPresent()){
            refId = StringUtils.generateRefId(16);
        }
        return refId;
    }

    public void deleteProduct(String refId) {
        Product product =  getByRefId(refId);
        product.setActive(false);
        productRepository.save(product);
    }


}
