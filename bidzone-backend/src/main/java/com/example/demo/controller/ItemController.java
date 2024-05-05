package com.example.demo.controller;

import com.example.demo.dto.ItemDTO;
import com.example.demo.entity.ItemEntity;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/save")
    public ResponseEntity<String> saveItem(
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("imgSrc") MultipartFile imgSrc,
            @RequestParam("seller") String seller,
            @RequestParam("minimum_price") int minimumPrice,
            @RequestParam("start_auction") String startAuction,
            @RequestParam("end_auction") String endAuction,
            @RequestParam("max_bid") int maxBid
    ) {
        try {
            // Create a new Item object
            ItemEntity item = new ItemEntity();
            item.setCategory(category);
            item.setTitle(title);
            item.setDescription(description);
            item.setSeller(seller);
            item.setMinimum_price(minimumPrice);
            item.setStart_action(startAuction);
            item.setEnd_auction(endAuction);
            item.setMax_bid(maxBid);

            // Set the image source if provided
            if (imgSrc != null && !imgSrc.isEmpty()) {
                byte[] imgData = imgSrc.getBytes();
                Blob imgBlob = new javax.sql.rowset.serial.SerialBlob(imgData);
                item.setImgSrc(imgBlob);
            }

            // Save the item using the ItemService
            itemService.saveItem(item);
            return ResponseEntity.ok("Item saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save item");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    // Endpoint to update the max_bid of an item
    @PutMapping("/{id}/{max_bid}")
    public ResponseEntity<String> updateMaxBid(@PathVariable("id") int id,
                                               @RequestParam("max_bid") int maxBid) {
        ItemEntity item = itemService.getItemById(id);
        if (item != null) {
            item.setMax_bid(maxBid);
            itemService.updateItem(item);
            return ResponseEntity.ok("Max bid updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }

    // Endpoint to update the end_auction of an item
    @PutMapping("/{id}/{end_auction}")
    public ResponseEntity<String> updateEndAuction(@PathVariable("id") int id,
                                                   @RequestParam("end_auction") String endAuction) {
        ItemEntity item = itemService.getItemById(id);
        if (item != null) {
            item.setEnd_auction(endAuction);
            itemService.updateItem(item);
            return ResponseEntity.ok("End auction updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }

    // Endpoint to update the description of an item
    @PutMapping("/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @RequestParam("description") String description) {
        ItemEntity item = itemService.getItemById(id);
        if (item != null) {
            item.setDescription(description);
            itemService.updateItem(item);
            return ResponseEntity.ok("Description updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItemById(@PathVariable("id") int id) {
        itemService.deleteItemById(id);
        return ResponseEntity.ok("Item deleted successfully");
    }
}
