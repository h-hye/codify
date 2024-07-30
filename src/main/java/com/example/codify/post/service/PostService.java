package com.example.codify.post.service;

import com.example.codify.member.entity.Member;
import com.example.codify.member.repository.MemberRepository;
import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.post.mapper.PostMapper;
import com.example.codify.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.codify.AI.service.OpenAiService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private OpenAiService openAiService;

    public List<PostDTO> getPostsByMonth(String postIdPrefix, Long memberId) {
        List<Post> posts = postRepository.findByPostIdStartingWith(postIdPrefix);
        return posts.stream()
                .filter(post -> post.getMember() != null && post.getMember().getMemberid().equals(memberId))
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<PostDTO> getPostById(String postId, Long memberId) {
        return postRepository.findById(postId)
                .filter(post -> post.getMember() != null && post.getMember().getMemberid().equals(memberId))
                .map(postMapper::toDto);
    }

    public PostDTO createPost(PostDTO postDTO, Long memberId) {
        String postId = postDTO.getPostId();

        if (postRepository.existsById(postId)) {
            throw new RuntimeException("Post ID already exists");
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Post post = postMapper.toEntity(postDTO, member);

        String aiResponse = openAiService.getAiResponse(postDTO.getContent());
        post.setAiResponse(aiResponse);

        Post savedPost = postRepository.save(post);

        return postMapper.toDto(savedPost);
    }

    public PostDTO updatePost(String postId, PostDTO postDTO, Long memberId) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getMember() != null && p.getMember().getMemberid().equals(memberId))
                .orElseThrow(() -> new RuntimeException("Post not found or not owned by user"));

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());

        if (postDTO.getMemberId() != null) {
            Member member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            post.setMember(member);
        }

        post.setAiResponse(postDTO.getAiResponse());
        Post updatedPost = postRepository.save(post);
        return postMapper.toDto(updatedPost);
    }

    public void deletePost(String postId, Long memberId) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getMember() != null && p.getMember().getMemberid().equals(memberId))
                .orElseThrow(() -> new RuntimeException("Post not found or not owned by user"));

        postRepository.deleteById(postId);
    }
}
