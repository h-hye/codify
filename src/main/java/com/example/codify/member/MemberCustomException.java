package com.example.codify.member;


import com.example.codify.Exception.BaseErrorCode;
import com.example.codify.Exception.CustomException;

public class MemberCustomException extends CustomException {
    public MemberCustomException(BaseErrorCode errorCode) {

        super(errorCode);
    }

    public static class MemberNotFoundException extends MemberCustomException {
        public MemberNotFoundException() {
            super(MemberErrorCode.MEMBER_NOT_FOUND);
        }
    }

    public static class DuplicatedEmailException extends MemberCustomException {
        public DuplicatedEmailException() {
            super(MemberErrorCode.DUPLICATE_EMAIL);
        }
    }

    public static class IncorrectPasswordException extends MemberCustomException {
        public IncorrectPasswordException() { super(MemberErrorCode. INVALID_IN_PASSWORD);
        }
    }
}