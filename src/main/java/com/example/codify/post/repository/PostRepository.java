package com.example.codify.post.repository;
import com.example.codify.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {


//    boolean existsByPostId(String postId);
//
//    List<Post> findByMember_MemberId(Long memberId);

    //List<Post> findByMember_MemberIdAndCreatedAt(Long memberId, LocalDate createdDate);

    Optional<Post> findByPostIdAndMember_MemberId(String postId, Long memberId);

    List<Post> findByPostIdStartingWithAndMember_MemberId(String postIdPrefix, Long memberId);
}
