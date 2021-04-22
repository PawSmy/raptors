export class Edge2{
  id: string;
  startNode: string;
  endNode: string;
  isActive: boolean;
  type: number;

  constructor(startNode: string, endNode: string, type: number, isActive: boolean) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.type = type;
    this.isActive = isActive;
  }
}
