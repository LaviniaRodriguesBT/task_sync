package br.com.tasksync.backend.main.port.service.crud;


//Classe de serviço responsavel por criar uma nova entidade do tipo passado(T)
public interface CreateService<T> {
    int create(final T entity);

}