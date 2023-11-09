package com.avado.backend.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/** 도대체 내가 이 파일을 왜 만들었지? 필요한 건가...? TokenProvider.java 파일이랑 내용이 비슷한데...? */
public final class JwtProvider {

    /** export JWT_KEY=JSDFSDFSDFASJDHASDASDdfa32dJHASFDA67765asda123dsdsw */
    private static final String JWT_KEY = System.getenv("JWT_KEY"); // 환경 변수 사용

    public static void main(String[] args) {
        System.out.println("JWT Key: " + JWT_KEY);
    }

    private static final long DEFAULT_TTL = 60 * 60 * 1000L * 24 * 14;

    private JwtProvider() {
        // 인스턴스 생성 방지
    }

    public static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());
        return builder.compact();
    }

    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null) {
            ttlMillis = DEFAULT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)
                .setSubject(subject)
                .setIssuer("sg")
                .setIssuedAt(now)
                .signWith(secretKey)
                .setExpiration(expDate);
    }

    public static Claims parseJWT(String jwt) {
        SecretKey secretKey = generalKey();
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private static SecretKey generalKey() {
        byte[] encodeKey = Base64.getDecoder().decode(JWT_KEY);
        return Keys.hmacShaKeyFor(encodeKey);
    }
}

///////////////////////////////////
// import java.util.Date;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.JwtBuilder;
// import io.jsonwebtoken.Jwts;
// import java.util.UUID;
// import javax.crypto.SecretKey;
// import java.util.Base64;
// import io.jsonwebtoken.security.Keys;

// public class JwtProvider {
// public static final long JWT_TTL = 60 * 60 * 1000L * 24 * 14;
// public static final String JWT_KEY =
// "JSDFSDFSDFASJDHASDASDdfa32dJHASFDA67765asda123dsdsw";

// public static String getUUID() {
// return UUID.randomUUID().toString().replaceAll("-", "");
// }

// public static String createJWT(String subject) {
// JwtBuilder builder = getJwtBuilder(subject, null, getUUID());
// return builder.compact();
// }

// private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis,
// String uuid) {
// // SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
// SecretKey secretKey = generalKey();
// long nowMillis = System.currentTimeMillis();
// Date now = new Date(nowMillis);
// if (ttlMillis == null) {
// ttlMillis = JwtProvider.JWT_TTL;
// }
// long expMillis = nowMillis + ttlMillis;
// Date expDate = new Date(expMillis);
// return Jwts.builder()
// .setId(uuid)
// .setSubject(subject)
// .setIssuer("sg")
// .setIssuedAt(now)
// .signWith(secretKey) // The signature algorithm is selected according to the
// size of secret key
// .setExpiration(expDate);
// }

// public static SecretKey generalKey() {
// byte[] encodeKey = Base64.getDecoder().decode(JwtProvider.JWT_KEY);
// return Keys.hmacShaKeyFor(encodeKey);
// }

// public static Claims parseJWT(String jwt) throws Exception {
// SecretKey secretKey = generalKey();
// return Jwts.parserBuilder()
// .setSigningKey(secretKey)
// .build()
// .parseClaimsJws(jwt)
// .getBody();
// }
// }
////////////////////////////////////////////////////
// @Component
// public class JwtProvider {

// private String secretKey = "S3cr3tK3y";

// public String create(String email) {
// Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); // 1시간
// 짜리
// String jwt = Jwts.builder()
// .signWith(SignatureAlgorithm.ES256, secretKey)
// .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
// .compact();

// return jwt;
// }

// public String validate(String jwt) {

// Claims claims = null;

// try {
// claims = Jwts.parser().setSigningKey(secretKey)
// .parseClaimsJws(jwt).getBody();
// } catch (Exception e) {
// e.printStackTrace();
// return null;
// }

// return claims.getSubject();
// }
// }
