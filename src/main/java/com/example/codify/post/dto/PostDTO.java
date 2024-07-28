package com.example.codify.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private Long postId; // 게시물의 고유 id - 날짜
    private String title;
    private String content;
    private Long memberId;  // 게시물 작성한 회원의 id
    private String aiResponse; // 게시물에 대한 AI 응답
}