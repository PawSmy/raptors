package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotTask;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.repository.robots.RobotTaskRepository;
import pl.raptors.ra_back.service.CRUDService;

import pl.raptors.ra_back.configuration.Mqtt;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.util.List;

@Service
public class RobotTaskService implements CRUDService<RobotTask> {

    @Autowired
    RobotTaskRepository robotTaskRepository;

    @Override
    public RobotTask addOne(RobotTask robotTask) {
        RobotTask output = robotTaskRepository.save(robotTask);
        if (output.getStatus().getName().equals("To Do")){
            MqttMessage mqttMessage = new MqttMessage(("{\"task\":\""+ output.getId() + "\"}").getBytes());
            mqttMessage.setQos(2);
            mqttMessage.setRetained(false);
            try{
                Mqtt.getInstance().publish("/new_task",  mqttMessage);
            } catch(org.eclipse.paho.client.mqttv3.MqttException e){
                System.out.println("MQTT Error");
            }
        }
        return output;
    }

    @Override
    public RobotTask getOne(String id) {
        return robotTaskRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotTask> getAll() {
        return robotTaskRepository.findAll();
    }

    @Override
    public RobotTask updateOne(RobotTask robotTask) {
        RobotTask oldRobotTask = robotTaskRepository.findById(robotTask.getId()).orElse(null);
        if(robotTask.getRobot()==null)robotTask.setRobot(oldRobotTask.getRobot());
        if(robotTask.getName()==null) robotTask.setName(oldRobotTask.getName());
        if(robotTask.getBehaviours()==null)robotTask.setBehaviours(oldRobotTask.getBehaviours());
        if(robotTask.getStartTime()==null)robotTask.setStartTime(oldRobotTask.getStartTime());
        if(robotTask.getPriority()==null)robotTask.setPriority(oldRobotTask.getPriority());
        if(robotTask.getStatus()==null)robotTask.setStatus(oldRobotTask.getStatus());
        if(robotTask.getUserID()==null)robotTask.setUserID(oldRobotTask.getUserID());
        RobotTask output = robotTaskRepository.save(robotTask);
        if (output.getStatus().getName().equals("To Do")){
            MqttMessage mqttMessage = new MqttMessage(("{\"task\":\""+ output.getId() + "\"}").getBytes());
            mqttMessage.setQos(2);
            mqttMessage.setRetained(false);
            try{
                Mqtt.getInstance().publish("/new_task",  mqttMessage);
            } catch(org.eclipse.paho.client.mqttv3.MqttException e){
                System.out.println("MQTT Error");
            }
        }
        return output;
    }

    @Override
    public void deleteOne(RobotTask robotTask) {
        robotTaskRepository.delete(robotTask);
    }

    @Override
    public void deleteAll(List<RobotTask> robotTaskList) {
        for (RobotTask robotTask : robotTaskList) {
            this.deleteOne(robotTask);
        }
    }

    public List<RobotTask> getByRobot(Robot robot) {
        return robotTaskRepository.findAllByRobot(robot);
    }

    public List<RobotTask> getByBehaviour(Behaviour behaviour) {
        return robotTaskRepository.findAllByBehavioursContaining(behaviour);
    }

    public List<RobotTask> getTasksByUsersIds (List<String> userIdList){
        return robotTaskRepository.findAllByUserIDIn(userIdList);
    }

    public List<RobotTask> getByPriority(TaskPriority priority) {
        return robotTaskRepository.findAllByPriority(priority);
    }
}
