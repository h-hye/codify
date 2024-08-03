package com.example.codify.emoticon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class EmoticonService {

  @Autowired
  private EmoticonRepository emoticonRepository;

  public EmoticonEntity saveEmoticon(EmoticonEntity emoticon) {
    // ID가 수동으로 설정되어야 하므로 별도의 로직이 필요할 수 있음
    return emoticonRepository.save(emoticon);
  }

  public Optional<EmoticonEntity> getEmoticonById(Long id) {
    return emoticonRepository.findById(id);
  }

  public void deleteEmoticon(Long id) {
    emoticonRepository.deleteById(id);
  }

  public List<EmoticonEntity> getEmoticonsByTag(String tag) {
    return emoticonRepository.findByEmoticonTagContaining(tag);  // 태그로 이모티콘 조회
  }

  public List<EmoticonEntity> getAllEmoticons() {
    return emoticonRepository.findAll();  // 모든 이모티콘 조회
  }

  // 이모티콘 ID로 URL을 가져오는 메서드
  public String getEmoticonUrl(Long emoticonId) {
    EmoticonEntity emoticon = emoticonRepository.findByEmoticonId(emoticonId);
    return (emoticon != null) ? emoticon.getEmoticonImg() : null; // URL 반환 또는 null
  }

}
