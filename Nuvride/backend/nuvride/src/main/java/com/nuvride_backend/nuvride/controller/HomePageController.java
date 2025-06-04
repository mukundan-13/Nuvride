

package com.nuvride_backend.nuvride.controller;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/home")
public class HomePageController {

  
    @GetMapping("/new")
    public String register() {
        return "User registered successfully!";
    }

  
}
