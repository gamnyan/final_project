package com.avado.backend.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.avado.backend.dto.PostDto;
import com.avado.backend.model.Post;
import com.avado.backend.persistence.PostRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;


  public List<PostDto> findAll() {
    List<Post> posts = postRepository.findAll();
    return posts.stream().map(PostDto::of).collect(Collectors.toList());
  } // getAllPost

  
} // PostService
