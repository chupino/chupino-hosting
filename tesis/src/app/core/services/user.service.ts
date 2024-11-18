import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../environments/constants';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { first, firstValueFrom, map, Observable } from 'rxjs';
import { ResponseApi } from '../models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private profileUrl = `${API_URL}/user/profile`;

  constructor() { }

  getUserProfile() : Observable<User> {
    return this.http.get<ResponseApi<{ user: User }>>(this.profileUrl).pipe(
      map(response => response.data.user)
    );
  }
}
