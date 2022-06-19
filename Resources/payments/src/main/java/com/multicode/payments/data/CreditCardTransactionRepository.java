package com.multicode.payments.data;

import com.multicode.payments.domain.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.*;

import javax.annotation.PostConstruct;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.util.*;
import java.sql.Date;
import java.util.stream.Collectors;

@Service
public class CreditCardTransactionRepository {

    private List<CreditCardTransaction> transactions;

    @PostConstruct
    public void init() throws IOException {
        transactions = new ArrayList<>();
        Resource resource = new ClassPathResource("transactionData.csv");
        try (
                InputStreamReader streamReader = new InputStreamReader(resource.getInputStream());
                BufferedReader reader = new BufferedReader(streamReader);
        ) {
            reader.lines().forEach(line -> {
                        String[] cols = line.split(",");
                        cols = Arrays.stream(cols).map(value -> value.trim()).toArray(String[]::new);
                        CreditCardTransaction t = new CreditCardTransaction();
                        t.setId(Integer.parseInt(cols[0]));
                        t.setAmount(Double.valueOf(cols[1]));
                        t.setCountry(cols[2]);
                        t.setCurrency(cols[3]);
                        t.setDate(Date.valueOf(cols[4]));
                        t.setOrderId(cols[5]);
                        t.setTaxCode(Integer.parseInt(cols[6]));
                        t.setTaxRate(Double.valueOf(cols[7]));
                        t.setType(cols[8]);
                        transactions.add(t);
                    }
            );
            System.out.println(transactions.size() + " transactions loaded");
        }
        catch (Exception e) {
            throw (e);
        }
    }

    public List<CreditCardTransaction> findAll() {
        return transactions;
    }

    public Optional<CreditCardTransaction> findById(int id) {
        return transactions.stream().filter(t -> t.getId() == id).findFirst();
    }

    public List<CreditCardTransaction> findAllByOrderId(String orderId) {
        return transactions.stream().filter(t -> t.getOrderId().equals(orderId)).collect(Collectors.toList());
    }

    public List<CreditCardTransaction> findAllByCountry(String country) {
        return transactions.stream().filter(t -> t.getCountry().equals(country)).collect(Collectors.toList());
    }

    //WARNING - NOT THREAD SAFE!
    public CreditCardTransaction save(CreditCardTransaction transaction) {
        transaction.setId(transactions.size() + 1);
        transactions.add(transaction);
        return transaction;
    }


}