package com.example.codify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CodifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodifyApplication.class, args);
    }

}
