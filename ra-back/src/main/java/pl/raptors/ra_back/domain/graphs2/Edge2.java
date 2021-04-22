package pl.raptors.ra_back.domain.graphs2;

import lombok.Data;
import lombok.NoArgsConstructor;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
@Data
public class Edge2 {

    private String id;
    private String startNode;
    private String endNode;
    private Boolean isActive;
    private int type;

    public Edge2(String id, String startNode, String endNode, Boolean isActive, int type) {
        this.id = id;
        this.startNode = startNode;
        this.endNode = endNode;
        this.isActive = isActive;
        this.type = type;
    }
}
