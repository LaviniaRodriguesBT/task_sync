package br.com.tasksync.backend.main.controller;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
//@RestController indica que os metodos irao responder a requisições HTTPs
//@RequestMapping define o caminho para qual todas as requições para o o endereço "api/event" deveão executar alguns dos metodos da classe

@RestController
@RequestMapping("/api/user")
//Classe responsavel por traduz as requições HTTP de seus metodos (GET,POST,PUT,DELETE)
// E atraves dessa traducao, retornar as respostas adequadas
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<UserModel>> getEntities(){
        List<UserModel> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getEntityById(@PathVariable final int id){
        UserModel user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping()
    public ResponseEntity<UserModel> createEntity(@RequestBody final UserModel data){
        int id = userService.create(data);
        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri().path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEntity(@PathVariable final int id, @RequestBody final UserModel data){
        userService.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserModel> deleteEntity(@PathVariable final int id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
