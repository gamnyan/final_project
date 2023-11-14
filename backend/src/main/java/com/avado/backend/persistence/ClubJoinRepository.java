package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Club;
import com.avado.backend.model.ClubJoin;

public interface ClubJoinRepository extends JpaRepository<ClubJoin,Long>{
    List<ClubJoin> findAllByClub(Club club);

    boolean existsByClubIdAndMemberId(Long clubId, Long memberId);

    List<ClubJoin> findClubsByMemberId(Long memberId);
}
