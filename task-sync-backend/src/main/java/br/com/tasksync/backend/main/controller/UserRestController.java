package br.com.tasksync.backend.main.controller;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.dto.CreateUserDto;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@Profile("sec")
@RestController
@RequestMapping("/api/user")
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<UserModel>> getEntities() {
        List<UserModel> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getEntityById(@PathVariable final int id) {
        UserModel user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<Integer> createEntity(@RequestBody final CreateUserDto data) {
        int id = userService.create(data);
        return ResponseEntity.ok(id);
    }


    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final UserModel data) {
        userService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<UserModel> deleteEntity(@PathVariable final int id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin
    @GetMapping("/read-by-user-id")
    public ResponseEntity<List<UserModel>> getEntitiesByUserId(@RequestParam final int user_id) {
        List<UserModel> users = userService.findAllByUserId(user_id);
        return ResponseEntity.ok().body(users);
    }

}
