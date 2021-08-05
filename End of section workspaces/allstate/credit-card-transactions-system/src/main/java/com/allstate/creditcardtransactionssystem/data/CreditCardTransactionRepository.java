package com.allstate.creditcardtransactionssystem.data;

import com.allstate.creditcardtransactionssystem.domain.CreditCardTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditCardTransactionRepository extends JpaRepository<CreditCardTransaction, Integer> {

    public List<CreditCardTransaction> findAllByOrderId(String orderId);
    public List<CreditCardTransaction> findAllByCountry(String country);

}
