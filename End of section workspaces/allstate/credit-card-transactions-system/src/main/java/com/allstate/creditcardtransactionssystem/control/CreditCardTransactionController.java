package com.allstate.creditcardtransactionssystem.control;

import com.allstate.creditcardtransactionssystem.domain.CreditCardTransaction;
import com.allstate.creditcardtransactionssystem.service.CCUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/transaction")
public class CreditCardTransactionController {

    @Autowired
    private CCUtilsService service;

    @PostMapping()
    public Map<String, Object> addTransaction(@RequestBody CreditCardTransaction transaction) {
        transaction.setDate( new Date(System.currentTimeMillis()));
        int id = service.addCreditCardTransaction(transaction);

        Map<String,Object> map = new HashMap<>();
        map.put("id", id);
        return map;
    }

    @GetMapping()
    public List<CreditCardTransaction> getWithSearch(
            @RequestParam(value ="orderId", required = false) String orderId,
            @RequestParam(value = "country", required = false) String country) {
        if(orderId != null) {
            return service.findByOrderId(orderId);
        }
        else if(country != null) {
            return service.findByCountry(country);
        }
        else {
            return service.getAllTransactions();
        }
    }

    @GetMapping(value ="/{transId}", produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public CreditCardTransaction findById(@PathVariable("transId") int id)  {
        return service.findById(id);
    }


}
