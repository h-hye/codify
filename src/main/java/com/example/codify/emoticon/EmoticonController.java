package com.example.codify.emoticon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/emoticons")
public class EmoticonController {

  @Autowired
  private EmoticonService emoticonService;

  @Autowired
  private FileService fileService;

  @PostMapping
  public ResponseEntity<EmoticonEntity> createEmoticon(@RequestParam("id") Long id, // ID 수동 입력
                                                       @RequestParam("title") String title,
                                                       @RequestParam("info") String info,
                                                       @RequestParam("tag") String tag,
                                                       @RequestParam("file") MultipartFile file) {
    try {
      String filePath = fileService.saveFile(file);

      EmoticonEntity emoticon = EmoticonEntity.builder()
              .emoticonId(id)  // ID 수동 설정
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

  @GetMapping("/{id}")
  public ResponseEntity<EmoticonEntity> getEmoticon(@PathVariable Long id) {
    Optional<EmoticonEntity> emoticon = emoticonService.getEmoticonById(id);
    return emoticon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEmoticon(@PathVariable Long id) {
    emoticonService.deleteEmoticon(id);
    return ResponseEntity.noContent().build();
  }
}
