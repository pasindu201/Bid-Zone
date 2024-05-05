package com.example.demo.service;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    public void deleteUser(String userName) {
        userRepository.deleteByUserName(userName);
    }

    private String encodeToString(Blob imageBlob) {
        try {
            byte[] imageBytes = imageBlob.getBytes(1, (int)imageBlob.length());
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public String getProfilePicture(String userName) {
        List<UserEntity> users = userRepository.findByuserName(userName);
        UserEntity user = users.get(0);
        return encodeToString(user.getProfile());
    }

    public boolean verifyPassword(String userName, String password) {
        UserEntity user = userRepository.findByUserNameAndPassword(userName, password);
        return user != null;
    }
}
