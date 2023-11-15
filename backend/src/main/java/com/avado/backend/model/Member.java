package com.avado.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;
    
    @Column(nullable = true)
    private String Filename;
    
   

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({ "member" })
    private List<Comment> comment;

    // chat
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({ "member" })
    private List<ChatRoom> chatRoom;

    // gallery
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({ "member" })
    private List<Gallery> gallery;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({ "member" })
    private List<GalleryComment> galleryComment;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({ "member" })
    private List<GalleryRecommend> galleryRecommend;

    public void setNickname(String nickname) {
        this.nickname = nickname;
    } // setNickname

    public void setPassword(String password) {
        this.password = password;
    }

    // @Builder
    // public Member(Long id, String email, String password, String nickname,
    // Authority authority) {
    // this.id = id;
    // this.email = email;
    // this.password = password;
    // this.nickname = nickname;
    // this.authority = authority;
    // }
}