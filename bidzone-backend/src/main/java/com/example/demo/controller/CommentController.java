package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public ResponseEntity<String> addComment(@RequestParam("postId") String postId,
                                             @RequestParam("commenterUserName") String commenterUserName,
                                             @RequestParam("content") String content) {
        Comment comment = new Comment();
        comment.setCommenterUserName(commenterUserName);
        comment.setContent(content);
        comment.setPostId(postId);
        commentService.saveComment(comment);
        return ResponseEntity.ok().body("Comment added successfully");
    }

    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable("postId") String postId) {
        List<CommentDTO> comments = commentService.getCommentsById(postId);
        return ResponseEntity.ok(comments);
    }
}