package com.example.codify.post.service;

import com.example.codify.member.entity.Member;
import com.example.codify.member.repository.MemberRepository;
import com.example.codify.post.dto.PostDTO;
import com.example.codify.post.entity.Post;
import com.example.codify.post.mapper.PostMapper;
import com.example.codify.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<PostDTO> getAllPosts() { // db에서 모든 게시물 조회, PostDTO로 반환
        return postRepository.findAll().stream() //모든 Post 엔티티 조회, 스트림 API 사용해서 데이터 처리
                .map(postMapper::toDto) //Post 엔티티 PostDTO로 변환
                .collect(Collectors.toList()); //변환된 DTO 객체들 리스트로 수집해서 반환
    }

    public Optional<PostDTO> getPostById(Long postId) { //ID로 게시물 조회, PostDTO 반환
        return postRepository.findById(postId) //특정 ID로 Post 엔티티 조회
                .map(postMapper::toDto); //Post를 PostDTO로 변환하여 반환. 게시물 미존재 시 빈 Optional 반환
    }

    public PostDTO createPost(PostDTO postDTO) {
        Member member = null;
        if (postDTO.getMemberId() != null) {
            member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
        }

        // 클라이언트가 제공한 postId를 사용하여 Post 엔티티 생성
        Post post = postMapper.toEntity(postDTO, member);
        post.setPostId(postDTO.getPostId()); // 클라이언트가 제공한 postId를 사용

        // 데이터베이스에 저장
        Post savedPost = postRepository.save(post);
        return postMapper.toDto(savedPost);
    }


    public PostDTO updatePost(Long postId, PostDTO postDTO) { //특정 ID의 게시물 수정, 수정된 게시물의 DTO 반환
        Post post = postRepository.findById(postId) //ID로 게시물 조회
                .orElseThrow(() -> new RuntimeException("Post not found")); //게시물 미존재 시 예외 발생

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());

        if (postDTO.getMemberId() != null) { //memberID 포함 시 회원 조회하여 게시물에 설정
            Member member = memberRepository.findById(postDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            post.setMember(member);
        }

        post.setAiResponse(postDTO.getAiResponse());
        Post updatedPost = postRepository.save(post); //수정된 게시물 데이터 저장
        return postMapper.toDto(updatedPost); //저장된 Post 엔티티 PostDT로 변환하여 반환
    }

    public void deletePost(Long postId) { //특정 ID의 게시물 삭제
        if (!postRepository.existsById(postId)) { //게시물 존재 여부 확인
            throw new RuntimeException("Post not found"); //미존재 시 예외 발생
        }
        postRepository.deleteById(postId); //게시물 삭제
    }
}
