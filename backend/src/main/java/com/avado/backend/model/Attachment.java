package com.avado.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
//@NoArgsConstructor
@AllArgsConstructor
public class Attachment {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 private String originFilename;
	 private String storeFilename;
	 
	 @Enumerated(EnumType.STRING)
	 private AttachmentType attachmentType;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "article_id")
	    private Article article;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "member_id")
	 private Member member;
	 
	 
	 public enum AttachmentType {
		    IMAGE
		}
	 public String getStorePath() {
		    return this.storeFilename;
		}
	 
	 public Attachment() {
		 article = new Article();
	 }
	 
	 
	 @Builder
	 public Attachment(Long id,String originFilename,String storePath,AttachmentType attachmentType,Member member ) {
		 
	        this.originFilename = originFilename;
	        this.storeFilename = storePath;
	        this.attachmentType = attachmentType;
	        this.member = member;
	 }
	 public void setMember(Member member) {
	        this.member = member;
	    }
	 
}
