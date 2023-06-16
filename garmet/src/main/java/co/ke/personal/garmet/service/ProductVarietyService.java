package co.ke.personal.garmet.service;

import co.ke.personal.garmet.exception.type.Exceptions;
import co.ke.personal.garmet.model.Product;
import co.ke.personal.garmet.model.ProductVariety;
import co.ke.personal.garmet.repository.ProductVarietyRepository;
import co.ke.personal.garmet.utility.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductVarietyService {
    private final ProductVarietyRepository productVarietyRepository;

    public ProductVariety createProductVariety(Product product, ProductVariety productVariety){
        productVariety.setProduct(product);
        productVariety.setRefId(this.generateRefId());
        return productVarietyRepository.save(productVariety);
    }

    public ProductVariety getByRefId(String refId){
        Optional<ProductVariety> pv =  productVarietyRepository.findByRefId(refId);
        if(pv.isPresent()){
            return pv.get();
        }
        throw  new Exceptions.ProductVariertyException(String.format("Product Variety with refId: %s NOT FOUND", refId));
    }

    private String generateRefId(){
        String refId = StringUtils.generateRefId(16);
        while(productVarietyRepository.findByRefId(refId).isPresent()){
            refId = StringUtils.generateRefId(16);
        }
        return refId;
    }

    public void deleteVariety(ProductVariety variety) {
        productVarietyRepository.delete(variety);
    }
}
