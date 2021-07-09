package com.multicode.payments.control;

import com.multicode.payments.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SupportUtilitiesController {

    @Autowired
    CCUtilsService service;

    @GetMapping("/countries")
    public Map<String, String[]> getAllCountries() {
        List<String> countries = service.getAllCountries();
        String[] array = new String[countries.size()];
        countries.toArray(array);
        Map<String, String[]> result = new HashMap<>();
        result.put("country", array);
        return  result;
    }
}
