package com.allstate.creditcardtransactionssystem.service;

import com.allstate.creditcardtransactionssystem.data.CreditCardTransactionRepository;
import com.allstate.creditcardtransactionssystem.domain.CreditCardTransaction;
import com.allstate.creditcardtransactionssystem.exceptions.LegalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CCUtilsServiceImpl implements CCUtilsService {

    @Autowired
    private CreditCardTransactionRepository repository;

    @Override
    public List<CreditCardTransaction> getAllTransactions() {
        return repository.findAll();
    }


    @Override
    public CreditCardTransaction findById(int id) {
//        CreditCardTransaction trans = repository.getById(id);
//        System.out.println(trans);
//        return trans;
        Optional<CreditCardTransaction> trans = repository.findById(id);
        if (trans.isPresent()) {
            return trans.get();
        }
        else {
            return null;
        }
    }

    @Override
    public List<CreditCardTransaction> findByOrderId(String orderId) {
        return repository.findAllByOrderId(orderId);
    }

    @Override
    public List<CreditCardTransaction> findByCountry(String country) {
        return repository.findAllByCountry(country);
    }

    @Override
    public Integer addCreditCardTransaction(CreditCardTransaction trans) {
        if(trans.getAmount() <= 0) {
            throw new LegalException("Amount must be positive");
        }
        repository.save(trans);
        return trans.getId();
    }

    @Override
    public List<String> getAllCountries() {
        Set<String> uniqueCountries = repository.findAll().stream()
                .map( it -> it.getCountry().toLowerCase())
                .filter( it -> it.trim().length() > 0)
                .collect(Collectors.toSet());
        return new ArrayList<>(uniqueCountries);
    };
}
