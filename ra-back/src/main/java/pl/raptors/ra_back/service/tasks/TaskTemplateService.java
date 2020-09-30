package pl.raptors.ra_back.service.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotTask;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.repository.tasks.TaskTemplateRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class TaskTemplateService implements CRUDService<RobotTask> {

    @Autowired
    TaskTemplateRepository taskTemplateRepository;

    @Override
    public RobotTask addOne(RobotTask robotTask) {
        return taskTemplateRepository.save(robotTask);
    }

    @Override
    public RobotTask getOne(String id) {
        return taskTemplateRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotTask> getAll() {
        return taskTemplateRepository.findAll();
    }

    @Override
    public RobotTask updateOne(RobotTask robotTask) {
        return taskTemplateRepository.save(robotTask);
    }

    @Override
    public void deleteOne(RobotTask robotTask) {
        taskTemplateRepository.delete(robotTask);
    }

    @Override
    public void deleteAll(List<RobotTask> robotTaskList) {
        for (RobotTask robotTask : robotTaskList) {
            this.deleteOne(robotTask);
        }
    }

    public List<RobotTask> getByRobot(Robot robot) {
        return taskTemplateRepository.findAllByRobot(robot);
    }

    public List<RobotTask> getByBehaviour(Behaviour behaviour) {
        return taskTemplateRepository.findAllByBehavioursContaining(behaviour);
    }

    public List<RobotTask> getTasksByUsersIds (List<String> userIdList){
        return taskTemplateRepository.findAllByUserIDIn(userIdList);
    }

    public List<RobotTask> getByPriority(TaskPriority priority) {
        return taskTemplateRepository.findAllByPriority(priority);
    }
}
