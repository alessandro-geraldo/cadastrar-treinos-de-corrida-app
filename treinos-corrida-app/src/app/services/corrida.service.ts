import { Corrida } from '../model/corrida';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { RoutesAPI } from './../util/routes-api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorUtil } from './../util/error-util';

  @Injectable({
    providedIn: 'root',
  })
export class CorridaService {
   corridas!: Corrida[];  
  constructor(private httpClient: HttpClient) {  
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getById(id: string): Observable<Corrida[]> {
    const query: HttpParams = new HttpParams().set('id', id);
    const options = id ? { params: query } : {};
    return this.httpClient.get<Corrida[]>(`${RoutesAPI.CORRIDAS}`, options).pipe(
      catchError(ErrorUtil.handleError)
    );
  }

  save(corrida: Corrida): Observable<Corrida> {
    return this.httpClient.post<Corrida>(
      `${RoutesAPI.CORRIDAS}`,
      corrida,
      this.httpOptions
    );
  }

  update(corrida: Corrida) : Observable<Corrida> {
    return this.httpClient.put<Corrida>(
      `${RoutesAPI.CORRIDAS}/${corrida.id}`,
      corrida,
      this.httpOptions
    );
  }

  patch(corrida: Corrida): Observable<Corrida> {
    return this.httpClient.patch<Corrida>(
      `${RoutesAPI.CORRIDAS}/${corrida.id}`,
      corrida,
      this.httpOptions
    );
  }

  getUsers(): Corrida[] {
    return this.corridas;
  }
}