package com.example.codify.post.controller;

import com.example.codify.post.dto.PostDTO;
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
    private PostService postService; //PostService 객체 자동 주입

    @GetMapping
    public List<PostDTO> getAllPosts() { //PostService 호출하여 DTO로 변환된 모든 게시물 목록 반환
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) { //url에서 id 추출하여 메서드 파라미터로 전달
        Optional<PostDTO> post = postService.getPostById(id); //PostService 호출하여 해당 id의 게시물 조회
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); //게시물 존재 시 200 OK와 데이터 반환, 미존재 시 404 not found
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO) {
        PostDTO createdPost = postService.createPost(postDTO);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        PostDTO updatedPost = postService.updatePost(id, postDTO); //PostService 호출하여 해당 id의 게시물 수정
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id); //PostService 호출해서 해당 ID의 게시물 삭제
        return ResponseEntity.noContent().build();
    }
}