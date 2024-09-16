package br.com.schedulingsync.backend.main.controller;

@RestController
@RequestMapping("/api/event/scheduling")
public class SchedulingRestController {
    private final SchedulingService schedulingService;

    public SchedulingRestController(SchedulingService schedulingService) {
        this.schedulingService = schedulingService;
    }

    @GetMapping()
    public ResponseEntity<List<SchedulingModel>> getEntities(){
        List<SchedulingModel> schedulings = schedulingService.findAll();
        return ResponseEntity.ok().body(schedulings);
    }


    @GetMapping("/{id}")
    public ResponseEntity<SchedulingModel> getEntityById(@PathVariable final int id){
        SchedulingModel scheduling = schedulingService.findById(id);
        return ResponseEntity.ok().body(scheduling);
    }

    @PostMapping()
    public ResponseEntity<SchedulingModel> createEntity(@RequestBody final SchedulingModel data){
        int id = schedulingService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final SchedulingModel data){
        schedulingService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SchedulingModel> deleteEntity(@PathVariable final int id){
        schedulingService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
