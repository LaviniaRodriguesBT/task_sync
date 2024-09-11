package br.com.tasksync.backend.main.controller;


@RestController
@RequestMapping("/api/task")
public class TaskRestController {
    private final TaskService taskService;

    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping()
    public ResponseEntity<List<TaskModel>> getEntities(){
        List<TaskModel> tasks = taskService.findAll();
        return ResponseEntity.ok().body(tasks);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TaskModel> getEntityById(@PathVariable final int id){
        TaskModel task = taskService.findById(id);
        return ResponseEntity.ok().body(task);
    }

    @PostMapping()
    public ResponseEntity<TaskModel> createEntity(@RequestBody final TaskModel data){
        int id = taskService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final TaskModel data){
        taskService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskModel> deleteEntity(@PathVariable final int id){
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
