import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Graph2} from '../model/Graphs2/Graph2';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class GraphService2 {

  private readonly graphURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.graphURL = store.baseURL + '/graphs2/';
  }

  public getGraph(id: string): Observable<Graph2> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph2>(this.graphURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<Graph2[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph2[]>(this.graphURL + 'all', {headers: headers, responseType: 'json'})
  }

  public save(graph: Graph2) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Graph2>(this.graphURL + 'add', graph, {headers: headers});
  }

  public delete(graph: Graph2) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      }), body: graph, responseType: 'text' as 'json'
    };
    return this.http.delete(this.graphURL + 'delete', httpOptions);
  }

  public deleteByID(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.graphURL + 'delete/' + id, httpOptions);
  }

  public getAllByMapId(mapId: string): Observable<Graph2[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph2[]>(this.graphURL + "map-id/" + mapId, {headers: headers, responseType: 'json'})
  }
}
