package com.example.codify.post.service;

import com.example.codify.member.Member;
import com.example.codify.member.MemberRepository;
import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.post.mapper.PostMapper;
import com.example.codify.post.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.codify.AI.service.OpenAiService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final PostMapper postMapper;
    private final OpenAiService openAiService;

    public List<PostDTO> getPostsByMonth(String postIdPrefix) {
        // Repository를 통해 특정 접두사로 시작하는 게시물 리스트 조회
        List<Post> posts = postRepository.findByPostIdStartingWith(postIdPrefix);
        // Post 엔티티를 PostDTO로 변환
        return posts.stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<PostDTO> getPostById(String postId) { //ID로 게시물 조회, PostDTO 반환
        return postRepository.findById(postId) //특정 ID로 Post 엔티티 조회
                .map(postMapper::toDto); //Post를 PostDTO로 변환하여 반환. 게시물 미존재 시 빈 Optional 반환
    }

    public PostDTO createPost(PostDTO postDTO) {
        // 클라이언트에서 제공한 postId를 가져옵니다.
        String postId = postDTO.getPostId();

        // 주어진 postId가 이미 존재하는지 확인합니다.
        if (postRepository.existsById(postId)) {
            throw new RuntimeException("Post ID already exists");
        }

        // Member 정보 설정 (선택적)
        Member member = null;
        if (postDTO.getMemberId() != null) {
            member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
        }

        // PostDTO를 Post 엔티티로 변환
        Post post = postMapper.toEntity(postDTO, member);

        // AI 응답 생성
        String aiResponse = openAiService.getAiResponse(postDTO.getContent());
        post.setAiResponse(aiResponse);

        // Post 엔티티를 저장
        Post savedPost = postRepository.save(post);

        // 저장된 Post 엔티티를 DTO로 변환하여 반환
        return postMapper.toDto(savedPost);
    }



    public PostDTO updatePost(String postId, PostDTO postDTO) { //특정 ID의 게시물 수정, 수정된 게시물의 DTO 반환
        Post post = postRepository.findById(postId) //ID로 게시물 조회
                .orElseThrow(() -> new RuntimeException("Post not found")); //게시물 미존재 시 예외 발생

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());

        if (postDTO.getMemberId() != null) { //memberID 포함 시 회원 조회하여 게시물에 설정
            Member member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            post.setMember(member);
        }

        // AI 응답 새로 생성 및 설정
        String aiResponse = openAiService.getAiResponse(postDTO.getContent());
        post.setAiResponse(aiResponse);

        // 수정된 게시물 데이터 저장
        Post updatedPost = postRepository.save(post);

        // 저장된 Post 엔티티를 PostDTO로 변환하여 반환
        return postMapper.toDto(updatedPost);
    }

    public void deletePost(String postId) { //특정 ID의 게시물 삭제
        if (!postRepository.existsById(postId)) { //게시물 존재 여부 확인
            throw new RuntimeException("Post not found"); //미존재 시 예외 발생
        }
        postRepository.deleteById(postId); //게시물 삭제
    }
}
