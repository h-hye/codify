package com.example.codify.emoticon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/emoticons")
public class EmoticonController {

  @Autowired
  private EmoticonService emoticonService;

  @Autowired
  private FileService fileService;

  @PostMapping
  public ResponseEntity<EmoticonEntity> createEmoticon(@RequestParam("id") Long id,
                                                       @RequestParam("title") String title,
                                                       @RequestParam("info") String info,
                                                       @RequestParam("tag") String tag,
                                                       @RequestParam("file") MultipartFile file) {
    try {
      String filePath = fileService.saveFile(file);

      EmoticonEntity emoticon = EmoticonEntity.builder()
              .emoticonId(id)
              .emoticonTitle(title)
              .emoticonInfo(info)
              .emoticonTag(tag)
              .emoticonImg(filePath)
              .build();

      EmoticonEntity savedEmoticon = emoticonService.saveEmoticon(emoticon);
      return ResponseEntity.ok(savedEmoticon);
    } catch (IOException e) {
      return ResponseEntity.status(500).body(null);
    }
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<EmoticonEntity> getEmoticon(@PathVariable Long id) {
    Optional<EmoticonEntity> emoticon = emoticonService.getEmoticonById(id);
    return emoticon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/id/{id}")
  public ResponseEntity<Void> deleteEmoticon(@PathVariable Long id) {
    emoticonService.deleteEmoticon(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/tag/{tag}")
  public List<EmoticonEntity> getEmoticonsByTag(@PathVariable String tag) {
    return emoticonService.getEmoticonsByTag(tag);
  }

  // 추가된 코드: 모든 이모티콘 조회
  @GetMapping
  public ResponseEntity<List<EmoticonEntity>> getAllEmoticons() {
    List<EmoticonEntity> emoticons = emoticonService.getAllEmoticons();
    return ResponseEntity.ok(emoticons);
  }
}

