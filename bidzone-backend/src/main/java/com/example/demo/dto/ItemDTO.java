package com.example.demo.dto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private int id;
    private String category;
    private String title;
    private String description;
    private String imgSrc;
    private String seller;
    private int minimum_price;
    private String start_action;
    private String end_auction;
    private int max_bid;
}
