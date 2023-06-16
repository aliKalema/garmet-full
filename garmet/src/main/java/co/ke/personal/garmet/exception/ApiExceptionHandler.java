package co.ke.personal.garmet.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;
@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {AppException.class})
    public ResponseEntity<Object> handleApiRequestException(ExceptionResponse e){
        ExceptionResponse response = new ExceptionResponse(e.getMessage(), e.getHttpStatus(), ZonedDateTime.now(ZoneId.of("Z")));
        return new ResponseEntity<>(response, e.getHttpStatus());
    }
}
