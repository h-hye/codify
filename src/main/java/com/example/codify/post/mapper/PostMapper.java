package com.example.codify.post.mapper;

import com.example.codify.emoticon.EmoticonService;
import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    private final EmoticonService emoticonService;

    @Autowired
    public PostMapper(EmoticonService emoticonService) {
        this.emoticonService = emoticonService;
    }

    // 엔티티를 DTO로 변환
    public PostDTO toDto(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setPostId(post.getPostId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setMemberId(post.getMember() != null ? post.getMember().getMemberid() : null);
        postDTO.setAiResponse(post.getAiResponse());
        postDTO.setEmoticonId(post.getEmoticonId());

        // 이모티콘 URL 가져오기
        if (post.getEmoticonId() != null) {
            postDTO.setEmoticonUrl(emoticonService.getEmoticonUrl(post.getEmoticonId()));
        }

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
        post.setEmoticonId(postDTO.getEmoticonId());
        return post;
    }
}
