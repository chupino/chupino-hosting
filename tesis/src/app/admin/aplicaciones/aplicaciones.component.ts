import { Component } from '@angular/core';
import { ButtonSecondaryComponent } from '../../shared/components/button-secondary/button-secondary.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../core/services/server.service';
import { Servidor } from '../../core/models/Servidor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonAccentComponent } from "../../shared/components/button-accent/button-accent.component";

@Component({
  selector: 'app-aplicaciones',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ButtonAccentComponent
],
  templateUrl: './aplicaciones.component.html',
  styleUrl: './aplicaciones.component.css'
})
export class AplicacionesComponent {
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  servers : Servidor[] | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private service : ServerService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['success'] !== undefined) {
        this.showAlert = true;
        this.alertType = params['success'] === 'true' ? 'success' : 'error';
        this.alertMessage = this.alertType === 'success' ? 'Servidor creado correctamente.' : 'Error al crear el servidor.';
        
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);

        this.router.navigate([], {
          queryParams: {
            success: null
          },
          queryParamsHandling: 'merge'
        });
      }
    });
    this.getServers();
  }

  navigateToCreateServer() {
    this.router.navigate(['/dashboard/crear-servidor']);
  }

  getServers() : void {
    this.service.getServersList().subscribe(data => {
      this.servers = data;
      console.log(data);
    });
  }
}
