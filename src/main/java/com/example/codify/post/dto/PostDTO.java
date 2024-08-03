package com.example.codify.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private String postId; // 게시물의 고유 id - 날짜
    private String title;  // 게시물 제목
    private String content; // 게시물 내용
    private Long memberId; // 게시물 작성한 회원의 id
    private String aiResponse; // 게시물에 대한 AI 응답
    private Long emoticonId; // 게시물에 사용된 이모티콘 ID
    private String emoticonUrl; // 이모티콘 이미지 URL
}
