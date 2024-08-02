package com.example.codify.post.repository;

import com.example.codify.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {

    List<Post> findByPostIdStartingWith(String postIdPrefix);

    boolean existsById(String postId);
}
