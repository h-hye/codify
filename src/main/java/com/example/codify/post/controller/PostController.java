package com.example.codify.post.controller;

import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService; //PostService 객체 자동 주입

    @GetMapping("/get")
    public ResponseEntity<PostDTO> getPostById(@RequestBody PostDTO postDTO) { //url에서 id 추출하여 메서드 파라미터로 전달
        Optional<PostDTO> post = postService.getPostByPostIdAndMember_MemberId(postDTO.getPostId(), postDTO.getMemberId()); //PostService 호출하여 해당 id의 게시물 조회
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); //게시물 존재 시 200 OK와 데이터 반환, 미존재 시 404 not found
    }

    @PostMapping("/create")
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO) {
        PostDTO createdPost = postService.createPost(postDTO);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/update")
    public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO postDTO) {
        PostDTO updatedPost = postService.updatePost(postDTO.getPostId(), postDTO); //PostService 호출하여 해당 id의 게시물 수정
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePost(@RequestBody PostDTO postDTO) {
        postService.deletePost(postDTO.getPostId()); //PostService 호출해서 해당 ID의 게시물 삭제
        return ResponseEntity.noContent().build();
    }
}