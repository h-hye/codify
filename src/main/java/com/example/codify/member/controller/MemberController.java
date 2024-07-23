package com.example.codify.member.controller;

import com.example.codify.member.entity.Member;
import com.example.codify.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    // 멤버 생성
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        // Member객체로 변환하여 메서드 매개변수 meber에 주입. ResponseEntity<Member> 반환으로 클라이언트에게 응답 제공
        Member savedMember = memberRepository.save(member);
        // member객체 db에 저장
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember); //201과 함께 저장된 member 객체 반환
    }

    // 멤버 조회
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        // id를 @PathVariable로 추출해서 id 매개변수에 주입. ResponseEntity<Member> 반환으로 클라이언트에게 응답 제공
        return memberRepository.findById(id) //id로 Member 객체 조회
                .map(member -> ResponseEntity.ok().body(member)) //Optional에 값 존재 -> 200과 member 객체 반환
                .orElseGet(() -> ResponseEntity.notFound().build()); //미존재 시 404 반환
    }
}
