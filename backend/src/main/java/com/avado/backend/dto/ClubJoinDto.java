package com.avado.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubJoinDto {
    private int joinedNum;
    private boolean isJoined;
    

    public static ClubJoinDto noOne(){
        return ClubJoinDto.builder()
        .joinedNum(0)
        .isJoined(false)
        .build();
    }

    
}
