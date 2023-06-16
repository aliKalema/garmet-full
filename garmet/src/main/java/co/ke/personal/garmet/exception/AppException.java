package co.ke.personal.garmet.exception;

import org.springframework.http.HttpStatus;

public class AppException extends  IllegalArgumentException{
    private HttpStatus httpStatus;

    public AppException(String message){
        super(message);
    }
    public AppException(HttpStatus httpStatus, String message){
        super(message);
        this.httpStatus = httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus){
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus(){
        return this.httpStatus;
    }

}
