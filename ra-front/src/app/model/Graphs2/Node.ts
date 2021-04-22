export class Node{
  id: string;
  posX: number;
  posY: number;
  poiID: string;
  type: number;

  constructor(id: string, posX: number, posY: number, poiID: string,type: number) {
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.poiID = poiID;
    this.type = type;
  }
}
