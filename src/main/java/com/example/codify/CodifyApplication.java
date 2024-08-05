package com.example.codify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.codify")
@EnableJpaRepositories(basePackages = "com.example.codify")
public class CodifyApplication {

    public static void main(String[] args) {

        SpringApplication.run(CodifyApplication.class, args);
    }

}
