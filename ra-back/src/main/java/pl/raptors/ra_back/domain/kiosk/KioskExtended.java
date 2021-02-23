package pl.raptors.ra_back.domain.kiosk;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
public class KioskExtended{
    private String id;
    private String name;
    private String standId;

    public KioskExtended(String id, String name, String standId) {
        this.id = id;
        this.name = name;
        this.standId = standId;
    }
}

