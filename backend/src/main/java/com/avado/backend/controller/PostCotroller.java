package com.avado.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.PostDto;
import com.avado.backend.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class PostCotroller {

  private final PostService postSerivce;

  @GetMapping("/post")
  public List<PostDto> getAllPostList() {
    return postSerivce.findAll();
  } // getAllPost

} // BoardCotroller
