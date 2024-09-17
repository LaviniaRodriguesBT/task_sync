package br.com.tasksync.backend.main.port.service.crud;

//Classe de serviço responsavel por criar uma nova entidade do tipo passado(T)
public interface CrudService<T> extends
        CreateService<T>,
        ReadService<T>,
        UpdateService<T>,
        DeleteService{

}