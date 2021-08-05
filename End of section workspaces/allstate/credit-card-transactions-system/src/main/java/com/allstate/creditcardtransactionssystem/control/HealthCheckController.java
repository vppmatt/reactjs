package com.allstate.creditcardtransactionssystem.control;

import com.allstate.creditcardtransactionssystem.domain.CreditCardTransaction;
import com.allstate.creditcardtransactionssystem.service.CCUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class HealthCheckController {

    @GetMapping("/health")
    public String systemIsHealthy() {
        return "The system is running";
    }


}
