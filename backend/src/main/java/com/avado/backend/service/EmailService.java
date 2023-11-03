package com.avado.backend.service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    // 인증번호 생성
    private String ePw;

    @Value("${spring.mail.username}")
    private String id;

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        log.info("보내는 대상 : " + to);
        log.info("인증 번호 : " + ePw);
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); // to 보내는 대상
        message.setSubject("[AVADO] 인증 메일 안내 "); // 메일 제목

        // 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
        String msg = "";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">AVADO 이메일 인증</h1>";
        msg += "<p style=\"font-size: 10px; padding-right: 30px; padding-left: 30px;\">AVADO 가입을 위한 인증번호 입니다.<br>아래 인증번호 확인 후 이메일 인증을 완료해 주세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td> </td><td style=\"text-align: center; vertical-align: middle; font-size: 20px;\">인증번호</td><td> </td></tr>";
        msg += "<tr><td> </td><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\"></td><td> </td></tr>";
        msg += "<tr><td> </td><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += ePw;
        msg += "</td><td> </td></tr></tbody></table></div>";

        message.setText(msg, "utf-8", "html"); // 내용, charset타입, subtype
        message.setFrom(new InternetAddress(id, "prac_Admin")); // 보내는 사람의 메일 주소, 보내는 사람 이름

        return message;
    }

    // 인증코드 만들기
    public String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    /*
     * 메일 발송
     * sendSimpleMessage의 매개변수로 들어온 to는 인증번호를 받을 메일주소
     * MimeMessage 객체 안에 내가 전송할 메일의 내용을 담아준다.
     * bean으로 등록해둔 javaMailSender 객체를 사용하여 이메일 send
     */
    public String sendSimpleMessage(String to) throws Exception {
        ePw = createKey();
        MimeMessage message = createMessage(to);
        try {
            log.info("Sending email to: " + to);
            javaMailSender.send(message); // 메일 발송
            log.info("Email sent successfully to: " + to);
        } catch (MailException es) {
            log.error("Failed to send email to: " + to, es);
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw; // 메일로 보냈던 인증 코드를 서버로 리턴
    }
}