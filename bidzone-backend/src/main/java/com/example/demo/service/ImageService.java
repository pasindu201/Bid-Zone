package com.example.demo.service;

import com.example.demo.dto.PostDTO;
import com.example.demo.entity.Item;
import com.example.demo.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    public void saveImage(Item image) {
        imageRepository.save(image);
    }

    private String encodeToString(byte[] image) {
        try {
            return Base64.getEncoder().encodeToString(image);
        } catch (Exception e) {
            return null;
        }
    }

    public List<PostDTO> getAllImages() {
        List<Item> images = imageRepository.findAll();
        int length = images.size();
        List<PostDTO> posts = new ArrayList<>(length);
        for (Item image : images) {
            PostDTO postDTO = new PostDTO();
            String userName = image.getUserName();
            postDTO.setUserName(userName);
            byte[] imageBytes = image.getImageData();
            String post = encodeToString(imageBytes);
            postDTO.setPost(post);
            postDTO.setId(image.getId());
            String profilePicture = userService.getProfilePicture(userName);
            postDTO.setProfilePicture(profilePicture);
            postDTO.setDescription(image.getDisciption());
            posts.add(postDTO);
        }
        return posts;
    }
    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }
}