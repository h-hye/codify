package com.example.codify.member.repository;

import com.example.codify.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 필요한 경우 커스텀 메서드를 추가할 수 있음
}