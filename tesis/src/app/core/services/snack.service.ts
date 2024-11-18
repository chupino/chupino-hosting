import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  showError(message: string, action: string = 'Close', duration: number = 6000) {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: ['error-snackbar']
    };
    this.snackBar.open(message, action, config);
  }

  showSuccess(message: string, action: string = 'Close', duration: number = 6000) {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: ['success-snackbar']
    };
    this.snackBar.open(message, action, config);
  }

  showInfo(message: string, action: string = 'Close', duration: number = 6000) {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: ['info-snackbar']
    };
    this.snackBar.open(message, action, config);
  }
}
