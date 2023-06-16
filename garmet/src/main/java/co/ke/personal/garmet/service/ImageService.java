package co.ke.personal.garmet.service;

import co.ke.personal.garmet.model.Image;
import co.ke.personal.garmet.model.Product;
import co.ke.personal.garmet.repository.ImageRepository;
import co.ke.personal.garmet.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final StorageService storageService;
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;
    public void processImages(MultipartFile[] files, Product product) {
        List<Image> images = storageService.uploadFile(files);
        for(Image image: images){
           image.setProduct(product);
           imageRepository.save(image);
        }
    }

    public void deleteImages(Product product){
        if(product.getImages().size()>0){
           List<String> succesfullFileIds = storageService.deleteBulk(product.getImages().stream()
                                                                                           .map(Image::getFileId)
                                                                                           .toList());
            deleteImage(product,succesfullFileIds);
        }
    }

    private void deleteImage(Product product, List<String> fileIds){
        product.setImages(product.getImages()
                .stream()
                .filter(image -> !fileIds.contains(image.getFileId()))
                .collect(Collectors.toList()));
        productRepository.save(product);
    }



}
