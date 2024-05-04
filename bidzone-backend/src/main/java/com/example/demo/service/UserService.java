package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(String userName) {
        userRepository.deleteByUserName(userName);
    }

    private String encodeToString(byte[] image) {
        try {
            return Base64.getEncoder().encodeToString(image);
        } catch (Exception e) {
            return null;
        }
    }

    public String getProfilePicture(String userName) {
        List<User> users = userRepository.findByuserName(userName);
        User user = users.get(0);
        String profilePicture = encodeToString(user.getProfile());
        return profilePicture;
    }

    public boolean verifyPassword(String userName, String password) {
        User user = userRepository.findByUserNameAndPassword(userName, password);
        return user != null;
    }
}
