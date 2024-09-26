package br.com.tasksync.backend.main.port.service.contract;

import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

//Classe de serviço responsavel por chamar todos os CRUDs
public interface ContractService extends CrudService<ContractModel> {
}
