package com.example.codify.post.controller;

import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.dto.PostRequest;
import com.example.codify.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/month")
    public ResponseEntity<List<PostDTO>> getPostsByMonth(
            @RequestBody PostRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        List<PostDTO> posts = postService.getPostsByMonth(request.getPostIdPrefix(), userId);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/post/{id}")
    public ResponseEntity<PostDTO> getPostById(
            @PathVariable String id,
            @RequestHeader("X-User-Id") Long userId) {
        Optional<PostDTO> post = postService.getPostById(id, userId);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(
            @RequestBody PostDTO postDTO,
            @RequestHeader("X-User-Id") Long userId) {
        PostDTO createdPost = postService.createPost(postDTO, userId);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(
            @PathVariable String id,
            @RequestBody PostDTO postDTO,
            @RequestHeader("X-User-Id") Long userId) {
        PostDTO updatedPost = postService.updatePost(id, postDTO, userId);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable String id,
            @RequestHeader("X-User-Id") Long userId) {
        postService.deletePost(id, userId);
        return ResponseEntity.noContent().build();
    }
}
