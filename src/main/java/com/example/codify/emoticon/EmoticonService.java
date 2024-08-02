package com.example.codify.emoticon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
}
