package com.avado.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = true)

    private String userid;

    @Column(length = 10, nullable = true)

    private String nickname;

    @Column(length = 30, nullable = true)
    @NotEmpty
    private String title;

    @Column(nullable = true)
    @NotEmpty
    private String content;

    @CreationTimestamp
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @UpdateTimestamp
    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Recommend> recommends = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Attachment> attachedFiles = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    /*
     * public static Article createArticle (String title, String content,String
     * nickname, Member member) {
     * Article article = new Article();
     * article.title = title;
     * article.content = content;
     * 
     * article.nickname = nickname;
     * article.member = member;
     * 
     * return article;
     * }
     */

    /* public void addAttachedFile(Attachment attachment) {
        this.attachedFiles.add(attachment);
        attachment.setArticle(this); // 첨부 파일에도 연관 관계 설정
    } */

    /* public static Article createArticle(String title, String content, String nickname, Member member) {
        Article article = new Article();
        article.title = title;
        article.content = content;

        article.nickname = nickname;
        article.member = member;

        return article;
    } */

   /*  public static Article createArticleOneImg(String title, String content, String nickname, String filename,
            Member member) {
        Article article = new Article();
        article.title = title;
        article.content = content;
        // article.filename = filename;
        article.nickname = nickname;
        article.member = member;

        return article;
    }
 */
    public static Article changeArticle(Article article, String title, String content/* , String filename */) {
        article.title = title;
        article.content = content;
        // article.filename = filename;
       
        return article;
    }
   

    /* @Builder
    public Article(String title, String content, String nickname, List<Attachment> attachedFiles) {
        this.title = title;

        this.content = content;
        this.nickname = nickname;
        this.attachedFiles = attachedFiles;
        if (attachedFiles != null) {
            attachedFiles.forEach(attachment -> attachment.setArticle(this));
        }

    } */

}