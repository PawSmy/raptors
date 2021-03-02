export class MapInfo {
  mapId;
  graphId;
  mapResolutionX: number;
  mapResolutionY: number;
  imageResolutionX: number;
  imageResolutionY: number;
  mapOriginX: number;
  mapOriginY: number;


  constructor(mapId, graphId, mapResolutionX: number, mapResolutionY: number, imageResolutionX: number, imageResolutionY: number, mapOriginX: number, mapOriginY: number) {
    this.mapId = mapId;
    this.graphId = graphId;
    this.mapResolutionX = mapResolutionX;
    this.mapResolutionY = mapResolutionY;
    this.imageResolutionX = imageResolutionX;
    this.imageResolutionY = imageResolutionY;
    this.mapOriginX = mapOriginX;
    this.mapOriginY = mapOriginY;
  }
}
