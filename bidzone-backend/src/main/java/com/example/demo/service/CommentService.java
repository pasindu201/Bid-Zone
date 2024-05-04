package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    public List<CommentDTO> getCommentsById(String postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        int length = comments.size();
        List<CommentDTO> commentDTOS = new ArrayList<>(length);
        for (Comment comment : comments) {
            CommentDTO commentDTO = new CommentDTO();
            String commenterName = comment.getCommenterUserName();
            commentDTO.setCommenter(commenterName);
            String profilePicture = userService.getProfilePicture(commenterName);
            commentDTO.setProfilePicture(profilePicture);
            commentDTO.setComment(comment.getContent());
            commentDTO.setId(comment.getId());
            commentDTOS.add(commentDTO);
        }
        return commentDTOS;
    }

    public void deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
    }
}