import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * A service to intrepret all the `get` and `post` requests made to the server
 */
@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private baseUrl:string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  syncGet(endpoint: string): Observable<any> {
    return this.getRequest(endpoint);
  }

  private getRequest(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, this.httpOptions);
  }

  syncPost(endpoint: string, payload: any): Observable<any> {
    return this.postRequest(endpoint, payload);
  }

  private postRequest(endpoint: string, payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}${endpoint}`,
      payload,
      this.httpOptions
    );
  }
}
