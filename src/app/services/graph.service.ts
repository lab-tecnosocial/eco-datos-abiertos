import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  getGraph(): Observable<any>{
    return this.http.get(`https://eco-datos.herokuapp.com/v1/graph`);
  }

  getRelations(): Observable<string[]>{
    return this.http.get<string[]>('https://eco-datos.herokuapp.com/v1/graph/relations');
  }

  getNodes(): Observable<any[]>{
    return this.http.get<any[]>('https://eco-datos.herokuapp.com/v1/graph/nodes');
  }

  getLatest(): Observable<any[]>{
    return this.http.get<any[]>('https://eco-datos.herokuapp.com/v1/graph/latest');
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>('https://eco-datos.herokuapp.com/v1/graph/projects');
  }

}
