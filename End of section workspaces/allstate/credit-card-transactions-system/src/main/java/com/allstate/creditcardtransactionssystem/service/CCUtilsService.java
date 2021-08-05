package com.allstate.creditcardtransactionssystem.service;

import com.allstate.creditcardtransactionssystem.domain.CreditCardTransaction;

import java.util.List;

public interface CCUtilsService {

    List<CreditCardTransaction> getAllTransactions();
    CreditCardTransaction findById(int id);

    List<CreditCardTransaction> findByOrderId(String orderId);
    List<CreditCardTransaction> findByCountry(String country);

    Integer addCreditCardTransaction(CreditCardTransaction trans);
    public List<String> getAllCountries();

}
