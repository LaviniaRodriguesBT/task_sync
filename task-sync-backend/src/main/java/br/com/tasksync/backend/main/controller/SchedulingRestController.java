package br.com.tasksync.backend.main.controller;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.dto.CreateSchedulingDto;
import br.com.tasksync.backend.main.dto.ResponseSchedulingDto;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event/scheduling")
public class SchedulingRestController {

    private final SchedulingService schedulingService;

    public SchedulingRestController(SchedulingService schedulingService) {
        this.schedulingService = schedulingService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<ResponseSchedulingDto>> getEntities() {
        List<ResponseSchedulingDto> schedulings = schedulingService.findAllScheduling();
        return ResponseEntity.ok().body(schedulings);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ResponseSchedulingDto> getEntityById(@PathVariable final int id) {
        ResponseSchedulingDto scheduling = schedulingService.findByIdSchedulingUser(id);
        return ResponseEntity.ok().body(scheduling);
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<Integer> createEntity(@RequestBody final CreateSchedulingDto data) {
        int id = schedulingService.create(data);
        return ResponseEntity.ok(id);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final CreateSchedulingDto data) {
        schedulingService.updateScheduling(id, data);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<SchedulingModel> deleteEntity(@PathVariable final int id) {
        schedulingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin
    @GetMapping("/list-scheduling-by-event")
    public ResponseEntity<List<ResponseSchedulingDto>> getEntityByEventId(@RequestParam("event_id") final int id) {
        List<ResponseSchedulingDto> schedulings = schedulingService.findAllSchedulingByEventId(id);
        return ResponseEntity.ok().body(schedulings);
    }
}
