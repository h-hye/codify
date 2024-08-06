package com.example.codify.post.controller;

import com.example.codify.jwt.JwtService;
import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService; //PostService 객체 자동 주입
    private final JwtService jwtService;


//    @PostMapping("/post/{id}")
//    public ResponseEntity<PostDTO> getPost(@PathVariable("id") String postId, @RequestHeader("Authorization") String token) {
//        try {
//            Long memberId = jwtService.extractMemberId(token);
//            Optional<PostDTO> postDTO = postService.getPostByIdAndMemberId(postId, memberId);
//            return postDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

    @PostMapping("/month")
    public ResponseEntity<List<PostDTO>> getPostsByMonth(@RequestBody PostRequest request, @RequestHeader("Authorization") String token) {
        try {
            Long memberId = jwtService.extractMemberId(token);
            List<PostDTO> posts = postService.getPostsByMonth(request.getPostIdPrefix(), memberId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PostMapping("/post/{id}")
    public ResponseEntity<PostDTO> getPostById(
            @PathVariable String id,
            @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            Long memberId = jwtService.extractMemberId(token); // JWT에서 memberId 추출
            Optional<PostDTO> postDTO = postService.getPostById(id, memberId); // 수정된 메서드 호출
            return postDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /*
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable String id) { //url에서 id 추출하여 메서드 파라미터로 전달
        Optional<PostDTO> post = postService.getPostById(id); //PostService 호출하여 해당 id의 게시물 조회
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); //게시물 존재 시 200 OK와 데이터 반환, 미존재 시 404 not found
    }
    */

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO) {
        PostDTO createdPost = postService.createPost(postDTO);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable String id, @RequestBody PostDTO postDTO) {
        PostDTO updatedPost = postService.updatePost(id, postDTO); //PostService 호출하여 해당 id의 게시물 수정
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id); //PostService 호출해서 해당 ID의 게시물 삭제
        return ResponseEntity.noContent().build();
    }
}