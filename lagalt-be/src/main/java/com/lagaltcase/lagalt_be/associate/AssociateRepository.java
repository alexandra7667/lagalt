package com.lagaltcase.lagalt_be.associate;

import com.lagaltcase.lagalt_be.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssociateRepository extends JpaRepository<Associate, Integer> {
    List<Associate> findByUser(User user);
}
