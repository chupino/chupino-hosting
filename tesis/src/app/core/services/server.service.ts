import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateServer } from '../models/CreateServer';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../environments/constants';
import { ResponseApi } from '../models/ResponseApi';
import { Juego } from '../models/Juego';
import { JuegoConfiguracionEnv } from '../models/JuegoConfiguracionEnv';
import { ServerType } from '../models/ServerType';
import { Servidor } from '../models/Servidor';
import { ServidorInfo } from '../models/ServidorInfo';
import { ServidorStatusRequest } from '../models/ServidorStatusRequest';
import { ServidorContainerRequest } from '../models/ServidorContainerRequest';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private http = inject(HttpClient);
  private serverBaseURL = `${API_URL}/servidor`;

  constructor() {}

  getServersList(): Observable<Servidor[]> {
    return this.http
      .get<ResponseApi<Servidor[]>>(this.serverBaseURL)
      .pipe(map((response) => response.data));
  }

  resumeServer(id: string, request : ServidorContainerRequest): Observable<void> {
    return this.http.post<void>(`${this.serverBaseURL}/resume/${id}`, request);
  }
  stopServer(id: string, request : ServidorContainerRequest): Observable<void> {
    return this.http.post<void>(`${this.serverBaseURL}/stop/${id}`, request);
  }
  destroyServer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.serverBaseURL}/${id}`);
  }

  getStatusServer(id: string, request : ServidorStatusRequest): Observable<boolean> {
    return this.http.post<ResponseApi<boolean>>(`${this.serverBaseURL}/status/${id}`,request)
    .pipe(map((response) => response.data));
  }

  setResetServer(id: string): Observable<void> {
    return this.http.post<void>(`${this.serverBaseURL}/reset/${id}`, {});
  }

  getServerTypes(id: string): Observable<ServerType[]> {
    return this.http
      .get<ResponseApi<ServerType[]>>(`${this.serverBaseURL}/types/${id}`)
      .pipe(map((response) => response.data));
  }

  createServer(formData: { [key: string]: any }): Observable<void> {
    return this.http.post<void>(`${this.serverBaseURL}/create`, formData);
  }

  getServerById(id: string): Observable<ServidorInfo> {
    return this.http
      .get<ResponseApi<ServidorInfo>>(`${this.serverBaseURL}/${id}`)
      .pipe(map((response) => response.data));
  }
}
