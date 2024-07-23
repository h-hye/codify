package com.example.codify;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private String id; // 사용자 식별자 (예: UUID)

    @CreatedDate //자동 설정
    private LocalDateTime createdAt; // 엔티티가 생성된 날짜와 시간 저장

    @LastModifiedDate // 자동 설정
    private LocalDateTime updateAt; // 엔티티가 마지막으로 수정된 날짜와 시간 저장

    @Setter
    @Column(columnDefinition = "boolean default false") //기본적으로는 삭제되지 않은 상태
    private boolean isDeleted; //엔티티가 삭제되었는지

}
