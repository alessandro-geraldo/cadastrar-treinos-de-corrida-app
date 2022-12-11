import { Corrida } from './../model/corrida';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CorridaPromiseService {
  URL = 'http://localhost:3000/runs';
  URL_PT = 'http://localhost:3000/corridas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByCorrida(): Promise<Corrida[] | undefined> {
    return this.httpClient.get<Corrida[]>(`${this.URL}`).toPromise();
  }

  save(corrida: Corrida): Promise<Corrida | undefined> {
    return this.httpClient
      .post<Corrida>(this.URL, JSON.stringify(corrida), this.httpOptions)
      .toPromise();
  }

  patch(corrida: Corrida): Promise<Corrida | undefined> {
    return this.httpClient
      .patch<Corrida>(
        `${this.URL}/${corrida.id}`,
        JSON.stringify(corrida),
        this.httpOptions
      )
      .toPromise();
  }

  update(corrida: Corrida): Promise<Corrida | undefined> {
    return this.httpClient
      .put<Corrida>(
        `${this.URL}/${corrida.id}`,
        JSON.stringify(corrida),
        this.httpOptions
      )
      .toPromise();
  }
}
