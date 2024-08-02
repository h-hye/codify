package com.example.codify.emoticon;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "emoticon")
public class EmoticonEntity {

  @Id
  @Column(name = "emoticon_id")
  private Long emoticonId;

  @Column(name = "emoticonTitle", length = 50, nullable = false)
  private String emoticonTitle;

  @Lob
  @Column(name = "emoticonInfo", length = 1000, nullable = false)
  private String emoticonInfo;

  @Column(name = "emoticonTag", length = 20, nullable = false)
  private String emoticonTag;

  @Column(name = "emoticonImg")
  private String emoticonImg;
}
