package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestParam("userName") String userName,
                                           @RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("profilePicture") MultipartFile profilePicture) {
        try {
            // Create a new User object
            User user = new User();
            user.setUserName(userName);
            user.setEmail(email);
            user.setPassword(password);  // Store the plain text password (not recommended in production)

            // Set the profile picture, if provided
            if (profilePicture != null && !profilePicture.isEmpty()) {
                byte[] profileData = profilePicture.getBytes();
                user.setProfile(profileData);
            }

            // Save the user using the UserService
            userService.saveUser(user);
            return ResponseEntity.ok("User saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @GetMapping("/profile-photo/{userName}")
    public ResponseEntity<String> getProfilePhoto(@PathVariable("userName") String userName) {
        String profilePhoto = userService.getProfilePicture(userName);
        if (profilePhoto != null) {
            return ResponseEntity.ok(profilePhoto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("verify/{userName}/{password}")
    public ResponseEntity<Boolean> verifyUser(@PathVariable("userName") String userName, @PathVariable("password") String password) {
        boolean isValid = userService.verifyPassword(userName, password);
        return ResponseEntity.ok(isValid);

    }

}
