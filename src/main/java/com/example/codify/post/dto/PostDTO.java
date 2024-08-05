package com.example.codify.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private String postId; // 게시물의 고유 id - 날짜
    private String title;
    private String content;
    private Long memberId;  // 게시물 작성한 회원의 id
    private String aiResponse; // 게시물에 대한 AI 응답

    public PostDTO(String postId, String title, String content, Long memberId, String aiResponse) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.memberId = memberId;
        this.aiResponse = aiResponse;
    }

    public PostDTO() {

    }
}