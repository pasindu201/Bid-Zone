package com.example.demo.controller;

import com.example.demo.dto.PostDTO;
import com.example.demo.entity.Item;
import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("userName") String userName,
                                              @RequestParam("description") String description) {
        try {
            byte[] imageData = file.getBytes();
            Item image = new Item(null, userName, description, imageData);
            imageService.saveImage(image);
            return ResponseEntity.ok().body("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/all-images")
    public ResponseEntity<List<PostDTO>> getImages() {
        List<PostDTO> images = imageService.getAllImages();
        if (images != null) {
            return ResponseEntity.ok(images);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable("id") String id){
        imageService.deleteImage(id);
        return ResponseEntity.ok("success");
    }
}
