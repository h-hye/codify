package com.example.codify.member.dto;


public record ChangePasswordRequest(String oldPassword, String newPassword) {
    public CharSequence getOldPassword() {
        return oldPassword;
    }
}