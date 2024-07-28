package com.example.codify.post.mapper;

import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public PostDTO toDto(Post post) { //Post 엔티티를 PostDTO로 변환하기 위함
        PostDTO postDTO = new PostDTO(); //새 'PostDTO' 객체 생성
        postDTO.setPostId(post.getPostId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setMemberId(post.getMember() != null ? post.getMember().getMemberid() : null);
        postDTO.setAiResponse(post.getAiResponse()); // Post 엔티티의 postId, title, content, memberid, aiResponse 값 PostDTO에 설정
        return postDTO; //PostDTO 객체 반환
    }

    public Post toEntity(PostDTO postDTO, Member member) {
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setMember(member);
        post.setAiResponse(postDTO.getAiResponse());
        post.setPostId(postDTO.getPostId()); // 클라이언트가 제공한 postId를 사용
        return post;
    }


}