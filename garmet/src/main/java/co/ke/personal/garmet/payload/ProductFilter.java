package co.ke.personal.garmet.payload;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ProductFilter {
    private static final DateTimeFormatter dateTimeFormatter  = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String name;
    private BigDecimal startPrice;
    private BigDecimal endPrice;
    private String categoryRefId;

    public void parseStartDate(String startDate){
        this.startDate= LocalDateTime.parse(startDate,dateTimeFormatter);
    }

    public void parseEndDate(String startDate){
        this.endDate= LocalDateTime.parse(startDate,dateTimeFormatter);
    }
}
