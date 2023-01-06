package com.toyota.crud.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.toyota.crud.model.Todo;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long>{
    
}
