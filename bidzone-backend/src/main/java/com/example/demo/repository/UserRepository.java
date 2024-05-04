package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findByuserName(String userName);

    void deleteByUserName(String userName);

    User findByUserNameAndPassword(String userName, String password);
}
