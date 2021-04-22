package pl.raptors.ra_back.controller.graphs2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.graphs2.Graph2;
import pl.raptors.ra_back.service.graphs2.GraphService2;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/graphs2")
public class GraphController2 {

    @Autowired
    GraphService2 graphService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Graph2> getAll() {
        return graphService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public Graph2 add(@RequestBody @Valid Graph2 graph) {
        if (graph.getId() != null) {
            return graphService.updateOne(graph);
        } else {
            return graphService.addOne(graph);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Graph2 update(@RequestBody @Valid Graph2 graph) {
        return graphService.updateOne(graph);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Graph2 getOne(@PathVariable String id) {
        return graphService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Graph2 graph) {
        graphService.deleteOne(graph);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteByID(@PathVariable String id) {
        graphService.deleteByID(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/map-id/{id}")
    public List<Graph2> getByGraphMapId(@PathVariable String id) {
        return graphService.getByMapId(id);
    }
}
