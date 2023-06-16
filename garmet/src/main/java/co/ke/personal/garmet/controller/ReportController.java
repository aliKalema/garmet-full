package co.ke.personal.garmet.controller;

import co.ke.personal.garmet.model.Summary;
import co.ke.personal.garmet.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/report")
public record ReportController(ReportService reportService) {

    @GetMapping
    public Summary getSummary(){
        return reportService.getSummary();
    }
}
