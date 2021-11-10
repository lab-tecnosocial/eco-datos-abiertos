import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphContributionService {
  private fromNode: any;
  private toNode: any;
  public type: string;
  constructor() {}

  public getNodes():any{
    return {from: this.fromNode, to:this.toNode};
  }

  public setNode(data: any) {
    switch (this.type) {
      case 'FROM':
        this.fromNode = data;
        break;
      default:
        this.toNode = data;
        break;
    }
  }
}
