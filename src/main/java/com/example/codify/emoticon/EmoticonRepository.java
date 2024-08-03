package com.example.codify.emoticon;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmoticonRepository extends JpaRepository<EmoticonEntity, Long> {
    List<EmoticonEntity> findByEmoticonTagContaining(String tag);  // 태그로 이모티콘 조회

    // 이모티콘 ID로 조회하는 메서드 추가 (필요시)
    EmoticonEntity findByEmoticonId(Long id);
}


