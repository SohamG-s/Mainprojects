package com.scm.repsitories;

import java.lang.foreign.Linker.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scm.entities.User; // Add this import statement

@Repository
public interface UserRepo extends JpaRepository<User,String>{

    Optional<User> findByEmail(String email);

 Optional <User> findByEmailAndPassword(String email, String password);

 Optional<User> findByEmailToken (String id);
}
