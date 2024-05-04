package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private String id;
    private String userName;
    private String profilePicture;
    private String description;
    private String post;
    private int comments;
    private int likes;
}
