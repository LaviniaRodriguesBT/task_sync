package br.com.tasksync.backend.main.controller;


import br.com.tasksync.backend.main.port.service.event.EventService;

@RestController
@RequestMapping("/api/event")
public class EventRestController {

    private final EventService eventService;

    public EventRestController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping()
    public ResponseEntity<List<EventModel>> getEntities(){
        List<EventModel> events = eventService.findAll();
        return ResponseEntity.ok().body(events);
    }


    @GetMapping("/{id}")
    public ResponseEntity<EventModel> getEntityById(@PathVariable final int id){
        EventModel event = eventService.findById(id);
        return ResponseEntity.ok().body(event);
    }

    @PostMapping()
    public ResponseEntity<EventModel> createEntity(@RequestBody final EventModel data){
        int id = eventService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final EventModel data){
        eventService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EventModel> deleteEntity(@PathVariable final int id){
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
