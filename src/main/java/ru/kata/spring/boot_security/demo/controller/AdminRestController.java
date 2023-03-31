package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/admin")
@RestController
public class AdminRestController {


    private final UserService userService;



    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping()
    public  ResponseEntity<List<User>> getUserTab() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }


    @PostMapping()
    public ResponseEntity<HttpStatus> createUser(@RequestBody  User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(HttpStatus.OK);

    }
    @PatchMapping ("/{id}")
    public ResponseEntity<HttpStatus> update( @RequestBody User user){

        userService.saveUser(user);
        return new ResponseEntity <> (HttpStatus.OK);
    }



/*    @PatchMapping("/{id}")
    public  ResponseEntity<HttpStatus> updateUser(@RequestBody @Valid User user, @PathVariable("id") long id) {
        userService.update(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }*/

    @DeleteMapping( "/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);

    }


}

