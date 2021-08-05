package com.allstate.creditcardtransactionssystem.service;

import com.allstate.creditcardtransactionssystem.domain.User;
import com.allstate.creditcardtransactionssystem.domain.UserDTO;

import java.util.List;

public interface UserService {

    public List<UserDTO> getAll();

}
