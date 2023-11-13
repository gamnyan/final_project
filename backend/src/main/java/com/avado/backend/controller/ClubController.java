package com.avado.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ChangeClubRequestDto;
import com.avado.backend.dto.ClubCreateRequestDto;
import com.avado.backend.dto.ClubPageResponseDto;
import com.avado.backend.dto.ClubResponseDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.Club;
import com.avado.backend.model.FileStore;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.MemberRepository;
import com.avado.backend.service.ChatService;
import com.avado.backend.service.ClubJoinService;
import com.avado.backend.service.ClubService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/club")
public class ClubController {
	private final ClubService clubService;
	private final MemberRepository memberRepository;
	private final ClubJoinService clubJoinService;
	private final ChatService chatService;


	@GetMapping("/myClubs")
    public ResponseEntity<List<ClubPageResponseDto>> getMyClubs() {
        try {
           Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));

            // 현재 로그인한 멤버가 가입한 클럽 리스트를 가져옵니다.
            List<ClubPageResponseDto> myClubs = clubService.getClubsOfCurrentUser();

            return ResponseEntity.ok(myClubs);
        } catch (RuntimeException e) {
            // 로그인하지 않은 사용자에 대한 처리
            // 예: 빈 페이지를 반환하거나, 모든 클럽을 보여줄 수 있음
            return ResponseEntity.ok(clubService.allClub2());
        }
    }

	/* @GetMapping("/page")
	public ResponseEntity<Page<ClubPageResponseDto>> pageClub(@RequestParam(name = "page") int page) {
		return ResponseEntity.ok(clubService.pageClub(page));
	} */
// memberId 얻는 로직과 클럽 페이지를 가져오는 로직을 합친 코드
@GetMapping("/page")
public ResponseEntity<Page<ClubPageResponseDto>> pageClub(@RequestParam(name = "page") int page) {
	try {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	
		// 여기서부터는 로그인한 사용자에 대한 처리를 할 수 있음
		// 예: 가입한 클럽 표시 등
		// ...
	
		// 클럽 페이지를 가져오는 로직
		Page<ClubPageResponseDto> clubPage = clubService.pageClub(page, member.getId());
		return ResponseEntity.ok(clubPage);
	} catch (RuntimeException e) {
		// 로그인하지 않은 사용자에 대한 처리
		// 예: 빈 페이지를 반환하거나, 모든 클럽을 보여줄 수 있음
		return ResponseEntity.ok(clubService.pageClub2(page));
	}
	
}



	@PostMapping("/create")
	public ResponseEntity<ClubResponseDto> createClub(@ModelAttribute ClubCreateRequestDto requestDto,
			@RequestPart(name = "file", required = false) MultipartFile file) {
		try {
			FileStore fileStore = new FileStore();

			String filename = fileStore.storeFile(file, AttachmentType.IMAGE).getStorePath();
			Club club = new Club();
			club.setName(requestDto.getName());
			club.setCategory(requestDto.getCategory());
			club.setClubinfo(requestDto.getClubinfo());
			club.setAddress(requestDto.getAddress());
			club.setFilename(filename);
			club.setStorename(filename);
			clubService.createClub(club);

			// 먼저 클럽을 생성한 후에 클럽을 가져옴
			Club createdClub = clubService.getClubById(club.getId());

			// 클럽을 생성한 멤버를 자동으로 클럽에 가입시킴
			Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
					.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
			clubJoinService.createClubJoin2(createdClub.getId(), member.getId());

			// 클럽과 채팅방을 OneToOne으로 만듬
			chatService.createRoom(createdClub.getName(), createdClub.getId(), member);

			return ResponseEntity.ok(ClubResponseDto.of(club, true));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/one/{id}")
	public ResponseEntity<ClubResponseDto> getOneClub(@PathVariable Long id) {
		return ResponseEntity.ok(clubService.oneClub(id));
	}

	@GetMapping("/change")
	public ResponseEntity<ClubResponseDto> getChangeClub(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(clubService.oneClub(id));
	}

	@PutMapping("/changec")
	public ResponseEntity<ClubResponseDto> changeClubF(
			@ModelAttribute ChangeClubRequestDto requestDto,
			@RequestPart(name = "file", required = false) MultipartFile file) {
		try {
			FileStore fileStore = new FileStore();

			// 파일이 업로드되었을 때만 파일을 저장합니다.
			String filename = null;
			if (file != null) {
				filename = fileStore.storeFile(file, AttachmentType.IMAGE).getStorePath();
			}

			ClubResponseDto responseDto = clubService.changeClubf(
					requestDto.getId(),
					requestDto.getName(),
					requestDto.getClubinfo(),
					filename, // 변경된 파일명을 전달합니다.
					requestDto.getCategory(),
					requestDto.getAddress());

			return ResponseEntity.ok(responseDto);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteClub(@RequestParam(name = "id") Long id) {
		clubService.deleteClub(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}

	@ResponseBody
	@GetMapping("/img/{storeFilename}")
	public ResponseEntity<Resource> processImg(@PathVariable String storeFilename) throws MalformedURLException {
		FileStore fileStore = new FileStore();
		Resource resource = new UrlResource("file:" + fileStore.createPath(storeFilename, AttachmentType.IMAGE));
		// System.out.println(resource);

		if (resource.exists() && resource.isReadable()) {
			return ResponseEntity.ok()
					.contentType(MediaType.IMAGE_JPEG)
					.body(resource);
		} else {

			return ResponseEntity.notFound().build();
		}
	}
}
