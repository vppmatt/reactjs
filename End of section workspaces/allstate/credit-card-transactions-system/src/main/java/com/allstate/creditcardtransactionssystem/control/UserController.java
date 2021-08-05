package com.allstate.creditcardtransactionssystem.control;


import com.allstate.creditcardtransactionssystem.domain.User;
import com.allstate.creditcardtransactionssystem.domain.UserDTO;
import com.allstate.creditcardtransactionssystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/api/user")
    public List<UserDTO> getAll() {
        return service.getAll();
    }
}
