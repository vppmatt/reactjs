package com.allstate.creditcardtransactionssystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
public class LegalException extends RuntimeException {

    public LegalException(String message) {
        super(message);
    }

}
