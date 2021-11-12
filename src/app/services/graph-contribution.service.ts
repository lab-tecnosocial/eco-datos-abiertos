import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphContributionService {
  public fromNode: any;
  public toNode: any;
  private relation: any;
  public type: string;
  constructor() {}

  public clear():void{
    this.fromNode = undefined;
    this.toNode = undefined;
    this.relation= undefined;
  }



  public getNodes(): any {
    return { from: this.fromNode, to: this.toNode };
  }

  public setRelation(rel: any) {
    this.relation = rel;
  }

  public getRelation(): any {
    return this.relation;
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
