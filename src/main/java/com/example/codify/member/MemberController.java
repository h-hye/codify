package com.example.codify.member;

import com.example.codify.member.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinMemberRequest request) throws IllegalAccessException {
        memberService.joinMember(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginMemberRequest request) {
        try {
            Member member = new Member();
            String memberId = String.valueOf(member.getMemberId());
            memberService.loginMember(request);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body("meberId : " + memberId);
        } catch (MemberCustomException.MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("회원 정보를 찾을 수 없습니다.");
        } catch (MemberCustomException.IncorrectPasswordException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("비밀번호가 올바르지 않습니다.");
        }
    }

    @GetMapping("/find-name")
    public ResponseEntity<String> findName(@RequestParam String email) {
        String name = memberService.findname(email);
        String responseMessage = "당신의 이름은 \"" + name + "\" 입니다.";
        return ResponseEntity.ok().body(responseMessage);
    }

    @PatchMapping("/change-password/{id}")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) throws IllegalAccessException {
        memberService.changepassword(request);
        return ResponseEntity.ok().body("비밀번호가 변경되었습니다.");
    }

    @PatchMapping("/change-name/{id}")
    public ResponseEntity<String> changeName(@PathVariable Long id, @RequestBody ChangeNameRequest request) throws IllegalAccessException {
        memberService.changename(id, request);
        return ResponseEntity.ok().body("이름이 변경되었습니다.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok().body("탈퇴 완료 되었습니다.");
    }
}
