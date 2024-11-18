import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/LoginResponse';
import { API_URL } from '../../../environments/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afAuth = inject(Auth);
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private loginUrl = `${API_URL}/user/login`;

  private sendUserToBackend(idToken: string) : Promise<LoginResponse> {
    return firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, { token: idToken }));
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.afAuth, provider);
      console.log('Inicio de sesión correcto:', result);
      if (result.user) {
        const idToken = await result.user.getIdToken();
        console.log("idToken: ", idToken);
        const resultBackend = await this.sendUserToBackend(idToken);
        const token = resultBackend.data.token;
        console.log('Inicio de sesión correcto2 :', resultBackend);
        this.cookieService.set('token', token);
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  }

  async logout() {
    try {
      await signOut(this.afAuth);
      this.cookieService.delete('token');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
