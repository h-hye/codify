package com.example.codify.member.dto;


public record ChangePasswordRequest(String name, String email, String oldPassword, String newPassword) {

}