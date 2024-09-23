package br.com.tasksync.backend.main.controller;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.service.task.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

//@RestController indica que os metodos irao responder a requisições HTTPs
//@RequestMapping define o caminho para qual todas as requições para o o endereço "api/event" deverão executar alguns dos metodos da classe

@RestController
@RequestMapping("/api/task")
//Classe responsavel por traduz as requições HTTP de seus metodos (GET,POST,PUT,DELETE)
// E atraves dessa traducao, retornar as respostas adequadas
public class TaskRestController {
    private final TaskService taskService;

    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<TaskModel>> getEntities() {
        List<TaskModel> tasks = taskService.findAll();
        return ResponseEntity.ok().body(tasks);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<TaskModel> getEntityById(@PathVariable final int id) {
        TaskModel task = taskService.findById(id);
        return ResponseEntity.ok().body(task);
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<TaskModel> createEntity(@RequestBody final TaskModel data) {
        int id = taskService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final TaskModel data) {
        taskService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<TaskModel> deleteEntity(@PathVariable final int id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
