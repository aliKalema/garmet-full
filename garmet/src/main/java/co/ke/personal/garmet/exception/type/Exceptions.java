package co.ke.personal.garmet.exception.type;

import co.ke.personal.garmet.exception.AppException;
import org.springframework.http.HttpStatus;

public class Exceptions {

    public static class ProductNotFoundException extends AppException {
        public ProductNotFoundException(String refId) {
            super(String.format("Product with RefId : %s not found",refId));
            super.setHttpStatus(HttpStatus.BAD_REQUEST);
        }
    }

    public static class UserExistException extends AppException {
        public UserExistException(String message) {
            super(message);
            super.setHttpStatus(HttpStatus.BAD_REQUEST);
        }
    }

    public static class ProductVariertyException extends AppException {
        public ProductVariertyException(String message) {
            super(message);
            super.setHttpStatus(HttpStatus.BAD_REQUEST);
        }
    }

    public static class CategoryNotFoundException extends AppException {
        public CategoryNotFoundException(String refId) {
            super(String.format("Category with RefId : %s not found",refId));
            super.setHttpStatus(HttpStatus.BAD_REQUEST);
        }
    }

    public static class CategoryExistException extends AppException {
        public CategoryExistException(String name) {
            super(String.format("Category with name : %s already exist",name));
            super.setHttpStatus(HttpStatus.BAD_REQUEST);
        }
    }

}
