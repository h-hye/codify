package com.example.codify.post.entity;

import com.example.codify.BaseEntity;
import com.example.codify.member.entity.Member;
import jakarta.persistence.*; // JPA 관련 어노테이션 사용
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "post") // post라는 db table과 매핑
public class Post extends BaseEntity {

    @Column(length = 64, nullable = false)
    private String title; // 게시물 제목 저장, 최대 64자, 필수입력

    @Column(length = 512, nullable = false)
    private String content; // 게시물 내용 저장, 최대 512자, 필수입력

    @ManyToOne(fetch = FetchType.LAZY, optional = false)  // optional = false ->특정회원과 무조건 연결.
    @JoinColumn(name = "member_id") // meber_id 컬럼과 매핑함.
    private Member member; // ManyYoOne으로 Member 엔티티와 연결. FetchType.LAZY로 실제 접근 시에만 데이터 로드

    @Column(length = 512)
    private String aiResponse;

    @Id
    @Column(name = "post_id") //post_id라는 이름으로 db table과 매핑
    private Long postId; // 게시물 고유 식별자

}