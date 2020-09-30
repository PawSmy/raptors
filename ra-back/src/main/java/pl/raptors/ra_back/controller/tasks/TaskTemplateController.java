package pl.raptors.ra_back.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.robots.RobotTask;
import pl.raptors.ra_back.service.tasks.TaskTemplateService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks/templates")
public class TaskTemplateController {

    @Autowired
    TaskTemplateService taskTemplateService;

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotTask> getAll() {
        List<RobotTask> taskTemplates = taskTemplateService.getAll();
//        for (RobotTask r:taskTemplates      ) {
//            System.out.println(r);
//        }
//        System.out.println(taskTemplates);
        return taskTemplates;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/add")
    public RobotTask add(@RequestBody @Valid RobotTask robotTask) {
        if (robotTask.getId() != null) {
            return taskTemplateService.updateOne(robotTask);
        } else {
            return taskTemplateService.addOne(robotTask);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SUPER_USER')")
    @PostMapping("/get-list")
    public List<RobotTask> getTasksListForUsersList(@RequestBody @Valid List<String> usersIDsList) {
        return  taskTemplateService.getTasksByUsersIds(usersIDsList);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/update")
    public RobotTask update(@RequestBody @Valid RobotTask robotTask) {
        return taskTemplateService.updateOne(robotTask);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotTask getOne(@PathVariable String id) {
        return taskTemplateService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotTask robotTask) {
        taskTemplateService.deleteOne(robotTask);
    }
}
