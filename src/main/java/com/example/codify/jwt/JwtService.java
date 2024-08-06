package com.example.codify.jwt;

import com.example.codify.member.Member;
import com.example.codify.member.MemberCustomException;
import com.example.codify.member.MemberRepository;
import com.example.codify.member.dto.MemberResponseDto;
import com.example.codify.post.mapper.PostMapper;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final MemberRepository memberRepository;
    private final PostMapper postMapper;

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.refreshSecretKey}")
    private String refreshSecretKey;

    public String createAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuer("codify server")
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1일
                .claim("email", email)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuer("codify server")
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 30일
                .claim("email", email)
                .signWith(Keys.hmacShaKeyFor(refreshSecretKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();
    }

    /*public String create(String email) {
        return "Bearer " + Jwts.builder()
                .subject("codify token")
                .issuer("codify server") //작성자
                .audience() //받는 사람
                .and().id(email)
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) //토큰 만료기간(하루동안 유효)
                .claim("email", email)
                .signWith(
                        Keys.hmacShaKeyFor(
                                secretKey.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }*/
    public Member parse(String token) {
        try {
            String email = getEmail(token);
            return memberRepository.findByEmail(email)
                    .orElseThrow(EntityExistsException::new);
        } catch (ExpiredJwtException e) {
            log.error("토큰 만료", e);
            throw new IllegalArgumentException("토큰 만료", e);
        } catch (UnsupportedJwtException e) {
            log.error("미지원 토큰", e);
            throw new IllegalArgumentException("미지원 토큰", e);
        } catch (MalformedJwtException e) {
            log.error("토큰 형식 오류", e);
            throw new IllegalArgumentException("토큰 형식 오류", e);
        } catch (SignatureException e) {
            log.error("유효하지 않은 토큰 서명", e);
            throw new IllegalArgumentException("유효하지 않은 토큰 서명", e);
        } catch (StringIndexOutOfBoundsException e) {
            log.error("유효하지 않은 토큰", e);
            throw new IllegalArgumentException("유효하지 않은 토큰", e);
        }
    }

    private String getEmail(String token) {
        return Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody()
                .get("email", String.class);
    }

    /*public Long extractMemberId(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKey.getBytes()) // 비밀키를 바이트 배열로 변환
                .build();

        Claims claims = parser.parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();
        return Long.parseLong(claims.get("memberId").toString());
    }*/

    public Long extractMemberId(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .setSigningKey(secretKey.getBytes()) // 비밀키를 바이트 배열로 변환
                    .build();

            Claims claims = parser.parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody();

            // claims에서 memberId를 추출하고, null인지 확인
            Object memberIdObj = claims.get("memberId");
            if (memberIdObj == null) {
                throw new IllegalArgumentException("Token does not contain memberId.");
            }

            // memberId를 Long으로 변환
            return Long.parseLong(memberIdObj.toString());
        } catch (JwtException | IllegalArgumentException e) {
            // JWT 관련 예외와 기타 잘못된 인자 예외를 처리
            System.err.println("Invalid token or memberId: " + e.getMessage());
            throw new RuntimeException("Invalid token or memberId.", e); // 예외를 던져 호출자에게 알림
        }

    }

    public MemberResponseDto getMemberDetails(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new MemberCustomException.MemberNotFoundException(); // 적절한 예외를 사용합니다.
        }

        Member member = memberOptional.get();
        String token = createAccessToken(member.getEmail()); // JWT 토큰을 생성합니다.

        String accessToken = createAccessToken(member.getEmail());
        String refreshToken = createRefreshToken(member.getEmail());

        // MemberResponseDto를 사용하여 변환
        MemberResponseDto memberResponseDto = new MemberResponseDto(member, accessToken, refreshToken);

        return memberResponseDto;
    }
}

