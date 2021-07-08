package com.multicode.payments.service;

import com.multicode.payments.domain.*;
import org.springframework.stereotype.*;

import java.util.*;

public interface CCUtilsService {

    public List<CreditCardTransaction> getAllTransactions();
    public CreditCardTransaction getById(int id);
    public List<CreditCardTransaction> getAllForAnOrder(String orderId);
    public List<CreditCardTransaction> getAllForACountry(String country);

    public CreditCardTransaction saveTransaction(CreditCardTransaction ccTransaction);
}
