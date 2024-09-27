package br.com.tasksync.backend.main.port.service.crud;

import java.util.List;

//Classe de serviço responsavel por criar uma nova entidade do tipo passado(T)
public interface ReadService<T> {
    T findById(final int id);
    List<T> findAll();

}
