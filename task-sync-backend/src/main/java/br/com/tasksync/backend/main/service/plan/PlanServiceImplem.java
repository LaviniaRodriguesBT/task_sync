package br.com.tasksync.backend.main.service.plan;

import br.com.tasksync.backend.main.domain.PlanModel;
import br.com.tasksync.backend.main.port.dao.plan.PlanDao;
import br.com.tasksync.backend.main.port.service.plan.PlanService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanServiceImplem implements PlanService {

    private final PlanDao planDao;

    public PlanServiceImplem(PlanDao planDao){

        this.planDao = planDao;
    }

    @Override
    public int create(PlanModel entity) {
        if (entity == null) {
            return 0;
        }
        if (
                entity.getName_plan().isEmpty() ||
                        entity.getStart_time_plan() == null ||
                        entity.getEnd_time_plan() == null ||
                        entity.getNum_adm() <= 0 ||
                        entity.getNum_colab() <=0
        ) {
            return 0;
        }

        int id = planDao.add(entity);
        System.out.println("Criacao de um novo plano feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover um plano por id");
        planDao.remove(id);
    }

    @Override
    public PlanModel findById(int id) {
        if (id < 0) {
            return null;
        }
        PlanModel event = planDao.readyById(id);
        System.out.println("Chamando o plano por id");
        return event;
    }

    @Override
    public List<PlanModel> findAll() {
        List<PlanModel> event = planDao.readAll();
        System.out.println("Chamando todas os planos na tela");
        return event;
    }

    @Override
    public void update(int id, PlanModel entity) {
        PlanModel planModel = findById(id);
        if (planModel == null) {
            return;
        }
        planDao.updateInformation(id, entity);

    }
}
