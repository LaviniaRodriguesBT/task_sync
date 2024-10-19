package br.com.tasksync.backend.main.controller;


import br.com.tasksync.backend.main.domain.PlanModel;
import br.com.tasksync.backend.main.port.service.plan.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/plan")
public class PlanRestController {
    private final PlanService planService;

    public PlanRestController(PlanService planService) {
        this.planService = planService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<PlanModel>> getEntities() {
        List<PlanModel> plan = planService.findAll();
        return ResponseEntity.ok().body(plan);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<PlanModel> getEntityById(@PathVariable final int id) {
        PlanModel plan = planService.findById(id);
        return ResponseEntity.ok().body(plan);
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<PlanModel> createEntity(@RequestBody final PlanModel data) {
        int id = planService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(data).toUri();
        return ResponseEntity.created(uri).body(data);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final PlanModel data) {
        planService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<PlanModel> deleteEntity(@PathVariable final int id) {
        planService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
