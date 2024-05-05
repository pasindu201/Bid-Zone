package com.example.demo.repository;

import com.example.demo.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<ItemEntity, Integer> {
    // Custom query methods can be defined here if needed
}
