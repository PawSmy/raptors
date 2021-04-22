package pl.raptors.ra_back.service.graphs2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.graphs2.Edge2;
import pl.raptors.ra_back.domain.graphs2.Node;
import pl.raptors.ra_back.domain.settings.MapInfo;
import pl.raptors.ra_back.repository.graphs2.GraphRepository2;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.settings.CurrentMapService;
import pl.raptors.ra_back.domain.graphs2.Graph2;

import java.util.List;
import java.util.Optional;


@Service
public class GraphService2 implements CRUDService<Graph2> {

    @Autowired
    GraphRepository2 graphRepository;
    @Autowired
    CurrentMapService currentMapService;

    @Override
    public Graph2 addOne(Graph2 graph) {
        if (graph.getMapId() == null) {
            List<MapInfo> currentMap = currentMapService.getAll();
            if (currentMap.size() > 0){
                graph.setMapId(currentMap.get(0).getMapId());
            }
        }
        return graphRepository.save(graph);
    }

    @Override
    public Graph2 getOne(String id) {
        return graphRepository.findById(id).orElse(null);
    }

    @Override
    public List<Graph2> getAll() {
        return graphRepository.findAll();
    }

    @Override
    public Graph2 updateOne(Graph2 graph) {
        if (graph.getMapId() == null) {
            List<MapInfo> currentMap = currentMapService.getAll();
            if (currentMap.size() > 0){
                graph.setMapId(currentMap.get(0).getMapId());
            }
        }
        return graphRepository.save(graph);
    }

    /**
     * Deletes also all edges and vertices
     * of current graph from database
     *
     * @param graph
     */
    @Override
    public void deleteOne(Graph2 graph) {
        graphRepository.delete(graph);
    }


    public void deleteByID(String id) {
        Optional<Graph2> graphFromDB = graphRepository.findById(id);
        Graph2 graph = graphFromDB.get();
        graphRepository.delete(graph);
    }

    @Override
    public void deleteAll(List<Graph2> graphList) {
        for (Graph2 graph : graphList) {
            this.deleteOne(graph);
        }
    }

    public List<Graph2> getByMapId(String mapId) {
        return graphRepository.findAllByMapId(mapId);
    }
}
