package com.example.codify.member;

import com.example.codify.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Column(length = 16, nullable = false)
    private String name;

    @Email
    @Column(length = 64, nullable = false, unique = true)
    private String email;

    @Column(length = 1024, nullable = false)
    private String password;

}

