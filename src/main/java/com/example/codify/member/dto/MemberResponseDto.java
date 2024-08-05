package com.example.codify.member.dto;

import com.example.codify.member.Member;
import com.example.codify.post.dto.PostDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MemberResponseDto {
    private Long memberId;
    //private String name;
    //private String email;
    //private String password;
    private String accessToken;
    private String refreshToken;
    private List<PostDTO> posts;


    public MemberResponseDto(Member member, String accessToken, String refreshToken) {
        this.memberId = member.getMemberId();
        //this.name = member.getName();
        //this.email = member.getEmail();
        //this.password = member.getPassword();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.posts = member.getPosts().stream()
                .map(post -> new PostDTO(post.getPostId(), post.getTitle(), post.getContent(), member.getMemberId(), post.getAiResponse()))
                .collect(Collectors.toList());
    }
}