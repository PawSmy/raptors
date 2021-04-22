package pl.raptors.ra_back.domain.graphs2;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "graphs2")
public class Graph2 {

    @Id
    private String id;
    private String mapId;
    private List<Edge2> edges;
    private List<Node> nodes;

    protected Graph2() {
        this.mapId = null;
        this.edges = new ArrayList<>();
        this.nodes = new ArrayList<>();
    }

    public Graph2(List<Edge2> edges, List<Node> nodes) {
        this.mapId = null;
        this.edges = edges;
        this.nodes = nodes;
    }
}
