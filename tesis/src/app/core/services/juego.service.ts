import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../environments/constants';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Juego } from '../models/Juego';
import { ResponseApi } from '../models/ResponseApi';
import { JuegoConfiguracion } from '../models/JuegoConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private http = inject(HttpClient);
  private juegoURL = `${API_URL}/juegos`;

  constructor() {}

  getJuegos(): Observable<Juego[]> {
    return this.http
      .get<ResponseApi<Juego[]>>(this.juegoURL)
      .pipe(map((response) => response.data));
  }

  getConfiguraciones(id : string) : Observable<JuegoConfiguracion> {
    return this.http.get<ResponseApi<JuegoConfiguracion>>(`${this.juegoURL}/configuraciones/${id}`).pipe(map(response => response.data));
  }
}
