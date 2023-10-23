package com.avado.backend.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ArticleResponseDto;
import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.model.Article;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ArticleRepository;
import com.avado.backend.persistence.MemberRepository;

// import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {
	private final ArticleRepository articleRepository;
	private final MemberRepository memberRepository;

	// private String uploadDir = "C:\\Temp\\images";
	/*
	 * @PostConstruct
	 * public void init() {
	 * // 디렉토리 생성
	 * File dir = new File(uploadDir);
	 * if (!dir.exists()) {
	 * dir.mkdirs();
	 * }
	 * }
	 */
	public List<PageResponseDto> allArticle() {
		List<Article> articles = articleRepository.findAll();
		return articles.stream().map(PageResponseDto::of).collect(Collectors.toList());
	}

	public Page<PageResponseDto> pageArticle(int pageNum) {
		return articleRepository.searchAll(PageRequest.of(pageNum - 1, 20));
	}

	public ArticleResponseDto oneArticle(Long id) {
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
			return ArticleResponseDto.of(article, false);
		} else {
			Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			boolean result = article.getMember().equals(member);
			return ArticleResponseDto.of(article, result);
		}
	}

	/*
	 * @Transactional
	 * public ArticleResponseDto postArticle(String title, String content,String
	 * nickname) {
	 * Member member = isMemberCurrent();
	 * Article article = Article.createArticle(title, content, nickname, member);
	 * return ArticleResponseDto.of(articleRepository.save(article), true);
	 * }
	 */
	@Transactional
	public ArticleResponseDto postArticle(String title, String content, String nickname, String filename) {
		Member member = isMemberCurrent();
		Article article = Article.createArticle(title, content, nickname, filename, member);
		return ArticleResponseDto.of(articleRepository.save(article), true);
	}
	/*
	 * @Transactional
	 * public ArticleResponseDto createArticle(String title, String body, String
	 * nickname, MultipartFile file) throws IOException {
	 * Member member = isMemberCurrent();
	 * 
	 * // 파일 저장 처리
	 * String uploadDir =
	 * "C:\\Users\\tj\\.eclipse\\workspace\\final_project\\backend\\src\\main\\webapp\\img";
	 * String filename = saveFile(file, uploadDir);
	 * 
	 * // 기사 생성
	 * Article article = Article.createArticle(title, body, nickname, filename,
	 * member);
	 * 
	 * // ArticleResponseDto 생성 및 반환
	 * return ArticleResponseDto.of(articleRepository.save(article), true);
	 * }
	 */

	public String saveFile(MultipartFile file, String uploadDir) throws IOException {
		// 업로드된 파일의 원래 이름을 가져옵니다.
		String fileName = file.getOriginalFilename();

		// 파일을 저장할 경로를 결합합니다.
		String filePath = uploadDir + File.separator + fileName;

		// 파일을 실제 경로에 복사합니다.
		FileCopyUtils.copy(file.getBytes(), new File(filePath));

		// 저장된 파일의 경로를 반환합니다.
		return filePath;
	}

	public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}

	@Transactional
	public ArticleResponseDto changeArticle(Long id, String title, String content, String filename) {
		Article article = authorizationArticleWriter(id);
		return ArticleResponseDto
				.of(articleRepository.save(Article.changeArticle(article, title, content/* ,filename */)), true);

	}

	@Transactional
	public void deleteArticle(Long id) {
		Article article = authorizationArticleWriter(id);
		articleRepository.delete(article);
	}

	public Article authorizationArticleWriter(Long id) {
		Member member = isMemberCurrent();
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		if (!article.getMember().equals(member)) {
			throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
		}
		return article;
	}
}