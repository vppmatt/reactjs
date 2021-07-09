package com.multicode.payments.control;

import com.multicode.payments.domain.*;
import com.multicode.payments.exception.*;
import com.multicode.payments.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.*;

@RestController
@RequestMapping("/api/cctransaction")
@CrossOrigin
public class CCTransactionsController {

    @Autowired
    CCUtilsService service;

    @GetMapping(produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public Object mappingFunctionForGetAllAndSearch(
            @RequestParam(value ="order", required = false) String orderId,
            @RequestParam(value ="country", required = false) String country) {
        if(country != null) {
            return getForACountry(country);
        }
        else if (orderId != null) {
            return getForAnOrder(orderId);
        }
        else {
            return getAll();
        }
    }

    public List<CreditCardTransaction> getAll() {
        return service.getAllTransactions();
    }

    public List<CreditCardTransaction> getForAnOrder(String orderId) {
        return service.getAllForAnOrder(orderId);
    }

    public List<CreditCardTransaction> getForACountry(String country) {
        return service.getAllForACountry(country);
    }

    @GetMapping(value="/{id}",  produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public CreditCardTransaction getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public CreditCardTransaction addTransaction(@RequestBody CreditCardTransaction newTransaction) {
        newTransaction.setDate(new Date(System.currentTimeMillis()));
        try {
            return service.saveTransaction(newTransaction);
        }
        catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
