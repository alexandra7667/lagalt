package com.lagaltcase.lagalt_be.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);   //"Username" must match field in User model. Optional = user may not exist
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
