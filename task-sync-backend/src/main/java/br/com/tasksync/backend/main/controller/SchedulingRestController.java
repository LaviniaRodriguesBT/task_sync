package br.com.tasksync.backend.main.controller;

//@RestController indica que os metodos irao responder a requisições HTTPs
//@RequestMapping define o caminho para qual todas as requições para o o endereço "api/event" deveão executar alguns dos metodos da classe

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/event/scheduling")
//Classe responsavel por traduz as requições HTTP de seus metodos (GET,POST,PUT,DELETE)
// E atraves dessa traducao, retornar as respostas adequadas
public class SchedulingRestController {
    private final SchedulingService schedulingService;

    public SchedulingRestController(SchedulingService schedulingService) {
        this.schedulingService = schedulingService;
    }

    @GetMapping()
    public ResponseEntity<List<SchedulingModel>> getEntities() {
        List<SchedulingModel> schedulings = schedulingService.findAll();
        return ResponseEntity.ok().body(schedulings);
    }


    @GetMapping("/{id}")
    public ResponseEntity<SchedulingModel> getEntityById(@PathVariable final int id) {
        SchedulingModel scheduling = schedulingService.findById(id);
        return ResponseEntity.ok().body(scheduling);
    }

    @PostMapping()
    public ResponseEntity<SchedulingModel> createEntity(@RequestBody final SchedulingModel data) {
        int id = schedulingService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final SchedulingModel data) {
        schedulingService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SchedulingModel> deleteEntity(@PathVariable final int id) {
        schedulingService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
