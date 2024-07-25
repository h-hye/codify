package com.example.codify.jwt;

import com.example.codify.member.Member;
import com.example.codify.member.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final MemberRepository memberRepository;

    @Value("${jwt.secretKey}")
    private String secretKey;

    public String create(String email) {
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
    }
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
                .verifyWith(
                        Keys.hmacShaKeyFor(
                                secretKey.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token.substring(7))
                .getPayload()
                .get("email", String.class);
    }
}

