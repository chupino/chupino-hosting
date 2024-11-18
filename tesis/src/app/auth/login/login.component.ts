import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ButtonPrimaryComponent } from '../../shared/components/button-primary/button-primary.component';
import { SnackService } from '../../core/services/snack.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService : AuthService, private snackService: SnackService) {}


  login() {
    this.authService.loginWithGoogle().then(() => {
      this.snackService.showSuccess('Inicio de sesión correcto!');
    }).catch((error) => {
      this.snackService.showError('Inicio de sesión fallido: ' + error.message);
    });
  }
}
