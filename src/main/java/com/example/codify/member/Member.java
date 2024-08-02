package com.example.codify.member;

import com.example.codify.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(length = 16, nullable = false)
    private String name;

    @Email
    @Column(length = 64, nullable = false, unique = true)
    private String email;

    @Column(length = 1024, nullable = false)
    private String password;

    public Member(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}

