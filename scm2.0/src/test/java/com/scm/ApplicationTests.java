package com.scm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.scm.services.EmailService;

@SpringBootTest
class ApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private EmailService service;

	@Test
	void sendEmailTest() {
		service.sendEmail("officialsoham681@gmail.com"
				, "Test Email done by Soham"
				, "This is a test email sent by Soham using Spring Boot");

	}
}
