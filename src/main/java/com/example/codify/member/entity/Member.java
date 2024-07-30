package com.example.codify.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동생성
    @Column(name = "member_id") //db table의 member_id 컬럼과 매핑
    private Long memberid; // 사용자 식별자 저장.

    @Column(length = 64, nullable = false) //최대 64자, 필수입력, 필수입력
    private String username;

    @Column(length = 128, nullable = false) // 최대 128자, 필수입력
    private String password;

}

