package com.example.codify.post.entity;

import com.example.codify.BaseEntity;
import com.example.codify.member.Member;
import jakarta.persistence.*; // JPA 관련 어노테이션 사용
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@Entity
@Table(name = "post") // post라는 db table과 매핑
public class Post extends BaseEntity {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String postId; // Long -> String으로 변경

    @Column(length = 64, nullable = false)
    private String title; // 게시물 제목 저장, 최대 64자, 필수입력

    @Column(length = 512, nullable = false)
    private String content; // 게시물 내용 저장, 최대 512자, 필수입력

    @ManyToOne(fetch = FetchType.LAZY, optional = false)  // optional = false ->특정회원과 무조건 연결.
    @JoinColumn(name = "member_id") // meber_id 컬럼과 매핑함.
    private Member member; // ManyYoOne으로 Member 엔티티와 연결. FetchType.LAZY로 실제 접근 시에만 데이터 로드


    @Column(length = 512)
    private String aiResponse;

    public Post() {
        // 기본 생성자는 비어있어야 함
    }

    public Post(String title, String content, Member member, String aiResponse) {
        this.postId = generatePostId(); // 생성자에서 날짜 기반 ID 생성
        this.title = title;
        this.content = content;
        this.member = member;
        this.aiResponse = aiResponse;
    }

    private String generatePostId() {
        if (this.getCreatedAt() == null) {
            throw new IllegalStateException("createdAt must not be null");
        }
        LocalDate date = this.getCreatedAt().toLocalDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return date.format(formatter);
    }
}