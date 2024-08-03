package com.example.codify.post.service;

import com.example.codify.emoticon.EmoticonEntity;
import com.example.codify.emoticon.EmoticonService;
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
    private EmoticonService emoticonService;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OpenAiService openAiService;

    public List<PostDTO> getPostsByMonth(String postIdPrefix, Long userId) {
        List<Post> posts = postRepository.findByPostIdStartingWith(postIdPrefix);
        return posts.stream()
                .filter(post -> post.getMember() != null && post.getMember().getMemberid().equals(userId))
                .map(post -> {
                    PostDTO postDTO = postMapper.toDto(post);
                    postDTO.setEmoticonId(post.getEmoticonId());

                    // 이모티콘 정보 조회 및 설정
                    setEmoticonUrl(postDTO, post.getEmoticonId());
                    return postDTO;
                })
                .collect(Collectors.toList());
    }

    public Optional<PostDTO> getPostById(String postId, Long userId) {
        return postRepository.findById(postId)
                .filter(post -> post.getMember() != null && post.getMember().getMemberid().equals(userId))
                .map(post -> {
                    PostDTO postDTO = postMapper.toDto(post);
                    postDTO.setEmoticonId(post.getEmoticonId());

                    // 이모티콘 정보 조회 및 설정
                    setEmoticonUrl(postDTO, post.getEmoticonId());
                    return postDTO;
                });
    }

    public PostDTO createPost(PostDTO postDTO, Long memberId) {
        String postId = postDTO.getPostId();

        if (postRepository.existsById(postId)) {
            throw new RuntimeException("Post ID already exists");
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Post post = postMapper.toEntity(postDTO, member);

        // 초기 이모티콘 ID 설정
        if (postDTO.getEmoticonId() != null) {
            post.setEmoticonId(Long.valueOf(postDTO.getEmoticonId()));
        }

        String aiResponse = openAiService.getAiResponse(postDTO.getContent());
        post.setAiResponse(aiResponse);

        Post savedPost = postRepository.save(post);
        postDTO.setEmoticonUrl(getEmoticonUrl(post.getEmoticonId()));

        return postMapper.toDto(savedPost);
    }

    public PostDTO updatePost(String postId, PostDTO postDTO, Long memberId) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getMember() != null && p.getMember().getMemberid().equals(memberId))
                .orElseThrow(() -> new RuntimeException("Post not found or not owned by user"));

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());

        // 사용자가 선택한 새로운 이모티콘 ID로 업데이트
        if (postDTO.getEmoticonId() != null) {
            post.setEmoticonId(Long.valueOf(postDTO.getEmoticonId()));
        }

        if (postDTO.getMemberId() != null) {
            Member member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            post.setMember(member);
        }

        post.setAiResponse(postDTO.getAiResponse());
        Post updatedPost = postRepository.save(post);
        postDTO.setEmoticonUrl(getEmoticonUrl(post.getEmoticonId()));

        return postMapper.toDto(updatedPost);
    }

    public void deletePost(String postId, Long memberId) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getMember() != null && p.getMember().getMemberid().equals(memberId))
                .orElseThrow(() -> new RuntimeException("Post not found or not owned by user"));

        postRepository.deleteById(postId);
    }

    private void setEmoticonUrl(PostDTO postDTO, Long emoticonId) {
        if (emoticonId != null) {
            EmoticonEntity emoticon = emoticonService.getEmoticonById(emoticonId).orElse(null);
            if (emoticon != null) {
                postDTO.setEmoticonUrl(emoticon.getEmoticonImg());
            }
        }
    }

    private String getEmoticonUrl(Long emoticonId) {
        if (emoticonId != null) {
            EmoticonEntity emoticon = emoticonService.getEmoticonById(emoticonId).orElse(null);
            return (emoticon != null) ? emoticon.getEmoticonImg() : null;
        }
        return null;
    }
}

