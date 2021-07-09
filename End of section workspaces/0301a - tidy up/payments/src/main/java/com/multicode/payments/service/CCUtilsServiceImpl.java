package com.multicode.payments.service;

import com.multicode.payments.data.*;
import com.multicode.payments.domain.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;
import java.util.stream.*;

@Service
public class CCUtilsServiceImpl implements CCUtilsService {

    @Autowired
    private CreditCardTransactionRepository ccTransactionRepository;

    public List<CreditCardTransaction> getAllTransactions() {
        return ccTransactionRepository.findAll();
    }

    public CreditCardTransaction getById(int id) {
        Optional<CreditCardTransaction> ccTrans = ccTransactionRepository.findById(id);
        if (ccTrans.isPresent()) {
            return ccTrans.get();
        }
        else {
            return null;
        }
    }

    public List<CreditCardTransaction> getAllForAnOrder(String orderId) {
        return ccTransactionRepository.findAllByOrderId(orderId);
    }

    public List<CreditCardTransaction> getAllForACountry(String country) {
        return ccTransactionRepository.findAllByCountry(country);
    }

    public CreditCardTransaction saveTransaction(CreditCardTransaction ccTransaction) {
        return ccTransactionRepository.save(ccTransaction);
    }

    public List<String> getAllCountries() {
        Set<String> uniqueCountries = ccTransactionRepository.findAll().stream()
                .map( it -> it.getCountry().toLowerCase())
                .filter( it -> it.trim().length() > 0)
                .collect(Collectors.toSet());
        System.out.println(uniqueCountries);
        return new ArrayList<>(uniqueCountries);
    };
}
