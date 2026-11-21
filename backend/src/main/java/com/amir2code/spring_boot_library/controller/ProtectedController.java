package com.amir2code.spring_boot_library.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/protected")
public class ProtectedController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String getProtectedRoute(){
        return "protected route here";
    }

}
