package br.com.tasksync.backend.main.service.contract;

import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.port.dao.contract.ContractDao;
import br.com.tasksync.backend.main.port.service.contract.ContractService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImplem implements ContractService {

    private final ContractDao contractDao;

    public ContractServiceImplem(ContractDao contractDao) {
        this.contractDao = contractDao;
    }

    @Override
    public int create(ContractModel entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getEvent_id() < 0 || entity.getUser_id() < 0
        ) {
            return 0;
        }
        int id = contractDao.add(entity);
        System.out.println("Criacao de um novo contracto feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover um contrato por id");
        contractDao.remove(id);
    }

    @Override
    public ContractModel findById(int id) {
        if (id < 0) {
            return null;
        }
        ContractModel contract = contractDao.readyById(id);
        System.out.println("Chamando o contrato por id");
        return contract;
    }

    @Override
    public List<ContractModel> findAll() {
        List<ContractModel> contract = contractDao.readAll();
        System.out.println("Chamando todas os contratos na tela");
        return contract;
    }

    @Override
    public void update(int id, ContractModel entity) {
        ContractModel contractModel = findById(id);
        if (contractModel == null) {
            return;
        }
        contractDao.updateInformation(id, entity);
    }
}
