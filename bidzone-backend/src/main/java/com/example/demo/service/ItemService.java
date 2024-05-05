package com.example.demo.service;

import com.example.demo.dto.ItemDTO;
import com.example.demo.entity.ItemEntity;
import com.example.demo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Method to get an item by ID
    public ItemEntity getItemById(int id) {
        return itemRepository.findById(id).orElse(null);
    }

    // Method to save an item
    public ItemEntity saveItem(ItemEntity item) {
        return itemRepository.save(item);
    }

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    // Method to get all items
    // Convert Item to ItemDTO
    private ItemDTO convertToDTO(ItemEntity item) {
        return new ItemDTO(
                item.getId(),
                item.getCategory(),
                item.getTitle(),
                item.getDescription(),
                item.getImgSrc() != null ? item.getImgSrc().toString() : null, // Convert Blob to string
                item.getSeller(),
                item.getMinimum_price(),
                item.getStart_action(),
                item.getEnd_auction(),
                item.getMax_bid()
        );
    }

    // Convert List of Item to List of ItemDTO
    private List<ItemDTO> convertToDTOList(List<ItemEntity> items) {
        return items.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Method to get all items and return them as a list of ItemDTO
    public List<ItemDTO> getAllItems() {
        List<ItemEntity> items = itemRepository.findAll();
        int length = items.size();
        List<ItemDTO> itemDTOS = new ArrayList<>(length);
        for (ItemEntity item : items) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setCategory(item.getCategory());
            itemDTO.setSeller(item.getSeller());
            itemDTO.setDescription(item.getDescription());
            itemDTO.setTitle(item.getTitle());
            itemDTO.setMinimum_price(item.getMinimum_price());
            itemDTO.setMax_bid(item.getMax_bid());
            itemDTO.setStart_action(item.getStart_action());
            itemDTO.setEnd_auction(item.getEnd_auction());
            Blob image = item.getImgSrc();
            String imageStr = encodeToString(image);
            itemDTO.setImgSrc(imageStr);
            itemDTOS.add(itemDTO);
        }
        return itemDTOS;
    }

    // Method to update an item
    public ItemEntity updateItem(ItemEntity item) {
        if (itemRepository.existsById(item.getId())) {
            return itemRepository.save(item);
        } else {
            return null;
        }
    }

    // Method to delete an item by ID
    public void deleteItemById(int id) {
        itemRepository.deleteById(id);
    }
}
