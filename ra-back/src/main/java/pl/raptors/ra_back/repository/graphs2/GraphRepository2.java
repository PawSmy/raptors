package pl.raptors.ra_back.repository.graphs2;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.graphs2.Graph2;

import java.util.List;

@Repository
public interface GraphRepository2 extends MongoRepository<Graph2, String> {
    List<Graph2> findAllByMapId(String mapId);
}
