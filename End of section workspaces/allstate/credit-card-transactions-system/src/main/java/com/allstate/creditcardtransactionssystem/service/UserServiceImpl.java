package com.allstate.creditcardtransactionssystem.service;

import com.allstate.creditcardtransactionssystem.data.UserRepository;
import com.allstate.creditcardtransactionssystem.domain.User;
import com.allstate.creditcardtransactionssystem.domain.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        List<UserDTO> dtoUsers = users.stream().map(user -> new UserDTO(user)).collect(Collectors.toList());
        return dtoUsers;
    }
}
