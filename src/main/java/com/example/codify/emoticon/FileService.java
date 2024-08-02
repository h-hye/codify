package com.example.codify.emoticon;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

  @Value("${file.upload-dir}")
  private String uploadDir;

  public String saveFile(MultipartFile file) throws IOException {
    // Ensure the upload directory exists
    File directory = new File(uploadDir);
    if (!directory.exists()) {
      directory.mkdirs();
    }

    // Save the file
    Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());
    Files.write(path, file.getBytes());

    return path.toString();
  }
}
