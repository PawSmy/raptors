package pl.raptors.ra_back.domain.graphs2;

import lombok.Data;
import lombok.NoArgsConstructor;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
public class Node {

    private String id;
    private Double posX;
    private Double posY;
    private String poiID;
    private Integer type;

    public Node(String id, Double posX, Double posY, String name, String poiID, Integer type) {
        this.id = id;
        this.posX = posX;
        this.posY = posY;
        this.poiID = poiID;
        this.type = type;
    }
}
