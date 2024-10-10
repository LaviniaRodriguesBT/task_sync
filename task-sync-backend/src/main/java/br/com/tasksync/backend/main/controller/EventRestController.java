package br.com.tasksync.backend.main.controller;


import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.service.event.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

//@RestController indica que os metodos irao responder a requisições HTTPs
//@RequestMapping define o caminho para qual todas as requições para o o endereço "api/event" deveão executar alguns dos metodos da classe
@RestController
@RequestMapping("/api/event")

//Classe responsavel por traduz as requições HTTP de seus metodos (GET,POST,PUT,DELETE)
// E atraves dessa traducao, retornar as respostas adequadas
public class EventRestController {

    private final EventService eventService;

    public EventRestController(EventService eventService) {
        this.eventService = eventService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<EventModel>> getEntities() {
        List<EventModel> events = eventService.findAll();
        return ResponseEntity.ok().body(events);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<EventModel> getEntityById(@PathVariable final int id) {
        EventModel event = eventService.findById(id);
        return ResponseEntity.ok().body(event);
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<EventModel> createEntity(@RequestBody final EventModel data) {
        int id = eventService.create(data);
        final URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final EventModel data) {
        eventService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<EventModel> deleteEntity(@PathVariable final int id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @CrossOrigin
    @GetMapping("/user/{id}")
    public ResponseEntity<List<EventModel>> getEntitiesByUserId(@PathVariable final int id) {
        List<EventModel> event = eventService.getEntitiesByUserId(id);
        return ResponseEntity.ok().body(event);
    }


}
