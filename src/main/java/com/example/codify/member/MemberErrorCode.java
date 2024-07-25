package com.example.codify.member;

import com.example.codify.Exception.BaseErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public enum MemberErrorCode implements BaseErrorCode {
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지않는 회원"),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이메일 중복"),
    INVALID_IN_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호 불일치");

    private final HttpStatus httpStatus;
    private final String message;

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    @Override
    public String getErrorMessage() {
        return message;
    }
}
