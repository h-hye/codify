package com.example.codify.member;

import com.example.codify.member.dto.ChangeNameRequest;
import com.example.codify.member.dto.JoinMemberRequest;
import com.example.codify.member.dto.LoginMemberRequest;
import com.example.codify.member.MemberCustomException.*;
import com.example.codify.member.dto.ChangePasswordRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;
import java.util.Optional;


@Slf4j
@Service
@Component
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void joinMember(JoinMemberRequest request) throws IllegalAccessException {
        String joinName = request.name();
        String joinEmail = request.email();
        String joinPassword = request.password();

        checkDuplicateName(joinName);
        checkDuplicateEmail(joinEmail);

        String encodedPassword = passwordEncoder.encode(joinPassword);

        Member member = new Member(joinName, joinEmail, encodedPassword);
        memberRepository.save(member);
        }

    @Transactional
    public Member loginMember(LoginMemberRequest request) {
        String loginName = request.name();
        String loginPassword = request.password();

        Member member = memberRepository.findByName(loginName)
                .orElseThrow(MemberNotFoundException::new);

        if (!passwordEncoder.matches(loginPassword, member.getPassword())) {
            log.error("회원 정보가 없습니다.");
            throw new IncorrectPasswordException();
        }
        log.info("로그인 성공");

        return member;
    }

    public void changename(Long id, ChangeNameRequest request) throws IllegalAccessException {
        Member member = memberRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        if(!Objects.equals(request.oldName(), member.getName())) {
            throw new IllegalAccessException("기존 이름과 일치하지 않습니다.");
        }
    }

    public void changepassword(Long id, ChangePasswordRequest request) throws IllegalAccessException {
        Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);

        if(!passwordEncoder.matches(request.getOldPassword(), member.getPassword())) {
            throw new IllegalAccessException("기존 비밀번호와 일치하지 않습니다.");
        }
        member.setPassword(passwordEncoder.encode(request.newPassword()));
        memberRepository.save(member);
    }

    private void checkDuplicateName(String name) throws IllegalAccessException {

        Optional<Member> optionalMember= memberRepository.findByName(name);

        if(optionalMember.isPresent()) {
            log.error("중복된 이름입니다.");
            throw new IllegalAccessException("중복된 이름입니다.");
        }
    }

    private void checkDuplicateEmail(String email) throws DuplicatedEmailException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            log.error("중복된 이메일입니다.");
            throw new DuplicatedEmailException();
        }
    }


        public String findPassword(String name, String email) {
            Member member = memberRepository.findByNameAndEmail(name, email)
                    .orElseThrow(() -> {
                        log.error("회원 정보가 없습니다.");
                        return new EntityNotFoundException("Member not found");
                    });

            return member.getPassword();
        }


        public String findName(String email) {
            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        log.error("회원 정보가 없습니다.");
                        return new EntityNotFoundException("Member not found");
                    });

            return member.getName();
        }
    }




