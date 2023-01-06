package com.toyota.crud.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.toyota.crud.model.Todo;
import com.toyota.crud.model.TodoStatus;
import com.toyota.crud.repositories.TodoRepository;

@Component
public class TodoLoader implements CommandLineRunner{
    
    public final TodoRepository todoRepository;

    public TodoLoader(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) throws Exception{
        loadTodos();
    }

    private void loadTodos(){
        if (todoRepository.count() == 0){
            todoRepository.save(
                Todo.builder()
                            .title("Go to Work")
                            .description("At TCIN")
                            .todoStatus(TodoStatus.NOT_COMPLETED)
                            .build()   
            );
        }
    }
}
