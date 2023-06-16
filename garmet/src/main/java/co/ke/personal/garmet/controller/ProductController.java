package co.ke.personal.garmet.controller;

import co.ke.personal.garmet.utility.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import co.ke.personal.garmet.model.Product;
import co.ke.personal.garmet.service.ProductService;
import co.ke.personal.garmet.payload.ProductFilter;


import java.util.List;

@RestController
@RequestMapping("api/v1/products")
public record ProductController(ProductService productService) {

    @GetMapping
    public ResponseEntity<Page<Product>> getProduct(@RequestParam(defaultValue = "0", name="page") int page,
                                                    @RequestParam(defaultValue = "10", name="size") int size,
                                                    @RequestParam(required = false, name="search_term") String searchTerm){
        ProductFilter productFilter = new ProductFilter();
        Pageable pageable =  PageRequest.of(page, size);
        return  ResponseEntity.ok(productService.getProducts(pageable, searchTerm));
    }

    @DeleteMapping("/{refId}")
    public void deleteProduct(@PathVariable String refId){
        productService.deleteProduct(refId);
    }

    @GetMapping("/{refId}")
    public Product getProductByRefId(@PathVariable String refId){
        return productService.getByRefId(refId);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Product> addProduct(@RequestPart("product") Product product,
                                              @RequestPart(value = "images", required = false) MultipartFile[] images){
        return new ResponseEntity<>(productService.createProduct(product, images), HttpStatus.CREATED);
    }

    @PutMapping(value="/{ref_id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Product> updateProduct(@RequestPart("product") Product product,
                                                @PathVariable(name = "ref_id") String refId,
                                                @RequestPart(value = "images", required = false) MultipartFile[] images){
        return new ResponseEntity<>(productService.updateProduct(product, images, refId), HttpStatus.OK
        );
    }
}
