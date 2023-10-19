package com.avado.backend.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;

import com.avado.backend.dto.PostDto;
import com.avado.backend.persistence.PostRepository;
import com.avado.backend.service.MemberService;
import com.avado.backend.service.PostService;

import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class PostCotroller {

  private final MemberService memberService;
  private final PostService postSerivce;
  
  @GetMapping("/post")
  public List<PostDto> getAllPostList() {
    return postSerivce.findAll(); 
  } // getAllPost

  
} // BoardCotroller
