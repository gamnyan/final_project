// package com.avado.backend.controller;

// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.avado.backend.service.EmailService;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;

// @Slf4j
// @RequiredArgsConstructor
// @RestController
// public class AccountController {

// private final EmailService emailService;

// @PostMapping("auth/login/mailConfirm")
// @ResponseBody
// public String mailConfirm(@RequestParam String email) throws Exception {
// String code = emailService.sendSimpleMessage(email);
// log.info("인증코드 : " + code);
// return code;
// }
// }