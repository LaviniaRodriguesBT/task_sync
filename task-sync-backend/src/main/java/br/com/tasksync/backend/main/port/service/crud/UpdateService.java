package br.com.tasksync.backend.main.port.service.crud;

//Classe de serviço responsavel por criar uma nova entidade do tipo passado(T)
public interface UpdateService<T> {
    void update(final int id, final T entity);
}
