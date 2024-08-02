package com.example.codify.post.mapper;

import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    // 엔티티를 DTO로 변환
    public PostDTO toDto(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setPostId(post.getPostId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setMemberId(post.getMember() != null ? post.getMember().getMemberid() : null);
        postDTO.setAiResponse(post.getAiResponse());
        return postDTO;
    }

    // DTO를 엔티티로 변환
    public Post toEntity(PostDTO postDTO, Member member) {
        Post post = new Post();
        post.setPostId(postDTO.getPostId());
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setMember(member);
        post.setAiResponse(postDTO.getAiResponse());
        return post;
    }
}