package co.ke.personal.garmet.service;

import co.ke.personal.garmet.model.Image;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.DeleteFolderRequest;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import io.imagekit.sdk.models.results.ResultFileDelete;
import io.imagekit.sdk.models.FileUpdateRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class StorageService {

    @Autowired
    public StorageService(@Value("${PublicKey}") String publicKey,
                          @Value("${PrivateKey}")String privateKey,
                          @Value("${UrlEndpoint}")String url){
        ImageKit imageKit = ImageKit.getInstance();
        Configuration config = new Configuration(publicKey, privateKey, url);
        imageKit.setConfig(config);
    }

    public List<Image> uploadFile(MultipartFile[] files) {
        log.info(String.format("Preparing TO Upload %s files",String.valueOf(files.length)));
        List<Image>images = new ArrayList<>();
        for (MultipartFile file : files) {
            String originalName = file.getOriginalFilename();
            assert originalName != null;
            String extension = originalName.substring(originalName.lastIndexOf(".") + 1);
            String newName = String.format("%s.%s",RandomStringUtils.randomAlphanumeric(18), extension);
            try{
                FileCreateRequest fileCreateRequest = new FileCreateRequest(file.getBytes(),newName);
                fileCreateRequest.setFolder("garmet");
                Result result=ImageKit.getInstance().upload(fileCreateRequest);
                Image image = new Image(result);
                log.info(image.toString());
                images.add(image);
            }
            catch(IOException | InternalServerException | ForbiddenException |
                  BadRequestException | UnknownException |
                  TooManyRequestsException | UnauthorizedException e){
                log.error(e.getMessage());
            }
        }
        return  images;
    }

    public void deleteFile(String fileId) {
        try{
            Result result = ImageKit.getInstance().deleteFile(fileId);
        }
        catch ( InternalServerException | ForbiddenException | TooManyRequestsException |
               UnauthorizedException | BadRequestException | UnknownException e){
            log.error(e.getMessage());
        }
    }
    public List<String> deleteBulk(List<String> fileIds){
        try{
            DeleteFolderRequest deleteFolderRequest = new DeleteFolderRequest();
            deleteFolderRequest.setFolderPath("garmet");
            ResultFileDelete result = ImageKit.getInstance().bulkDeleteFiles(fileIds);
            return result.getSuccessfullyDeletedFileIds();
        }
        catch (InternalServerException | ForbiddenException | TooManyRequestsException | UnauthorizedException |
               BadRequestException | UnknownException | PartialSuccessException | NotFoundException e){
            log.error(e.getMessage());
            return null;
        }
    }

}
