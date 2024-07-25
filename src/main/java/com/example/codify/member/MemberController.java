package com.example.codify.member;

import com.example.codify.jwt.JwtService;
import com.example.codify.member.dto.ChangeNameRequest;
import com.example.codify.member.dto.JoinMemberRequest;
import com.example.codify.member.dto.LoginMemberRequest;
import com.example.codify.member.dto.ChangePasswordRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final JwtService jwtService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinMemberRequest request) throws IllegalAccessException {
        memberService.joinMember(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("created");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginMemberRequest request) {

        try {
            Member member = memberService.loginMember(request);

            String token = jwtService.create(member.getEmail());
            return ResponseEntity.ok()
                    .header("Authorization", token)
                    .body("logined");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthorized");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @GetMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String name,
                                               @RequestParam String email) {
        String password = memberService.findPassword(name, email);
        return ResponseEntity.ok().body(password);
    }

    @GetMapping("/find-name")
    public ResponseEntity<String> findName(@RequestParam String email) {
        String name = memberService.findName(email);
        return ResponseEntity.ok().body(name);
    }

    @PatchMapping("/change-password/{id}")
    public ResponseEntity<String> changepassword(@PathVariable Long id, @RequestBody ChangePasswordRequest request) throws IllegalAccessException {
        memberService.changepassword(id, request);
        return ResponseEntity.ok().body("password changed");
    }

    @PatchMapping("/change-name/{id}")
    public ResponseEntity<String> changename(@PathVariable Long id, @RequestBody ChangeNameRequest request) throws IllegalAccessException {
        memberService.changename(id, request);
        return ResponseEntity.ok().body("name changed");
    }
}
