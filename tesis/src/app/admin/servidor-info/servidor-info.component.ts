import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerService } from '../../core/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServidorInfo } from '../../core/models/ServidorInfo';
import { ButtonPrimaryComponent } from '../../shared/components/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from '../../shared/components/button-secondary/button-secondary.component';
import { CommonModule } from '@angular/common';
import { ServidorStatusRequest } from '../../core/models/ServidorStatusRequest';
import { ServidorContainerRequest } from '../../core/models/ServidorContainerRequest';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-servidor-info',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './servidor-info.component.html',
  styleUrl: './servidor-info.component.css',
})
export class ServidorInfoComponent {
  id: string | null = null;
  serverInfo: ServidorInfo | null = null;
  status: boolean = false;
  activeTab: string = 'monitoreo';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getServerInfo(this.id);
      }
    });
  }

  pauseServer(): void {
    if (!this.serverInfo) return;
    const request: ServidorContainerRequest = {
      droplet_ip_address: this.serverInfo.droplet.ip_address,
      server_name: this.serverInfo.nombre,
    };
    this.serverService
      .stopServer(this.serverInfo.id.toString(), request)
      .subscribe({
        next: () => {
          console.log('Servidor pausado');
          window.location.reload();
          this.showAlertMessage('Servidor pausado', 'success');
        },
        error: () => {
          console.error('Error al pausar el servidor');
          this.showAlertMessage('Error al pausar el servidor', 'error');
        },
      });
  }

  resumeServer(): void {
    if (!this.serverInfo) return;
    const request: ServidorContainerRequest = {
      droplet_ip_address: this.serverInfo.droplet.ip_address,
      server_name: this.serverInfo.nombre,
    };
    this.serverService
      .resumeServer(this.serverInfo.id.toString(), request)
      .subscribe({
        next: () => {
          console.log('Servidor reanudado');
          window.location.reload();
          this.showAlertMessage('Servidor reanudado', 'success');
        },
        error: () => {
          console.error('Error al reanudar el servidor');
          this.showAlertMessage('Error al reanudar el servidor', 'error');
        },
      });
  }

  getServerStatus(id: string): void {
    if (!this.serverInfo) return;
    const request: ServidorStatusRequest = {
      server_name: this.serverInfo.nombre,
      droplet_ip_address: this.serverInfo.droplet.ip_address,
      keyword: this.serverInfo.juego.activationKeyword,
    };
    console.log('Request:', request);
    this.serverService.getStatusServer(id, request).subscribe((status) => {
      this.status = status;
    });
  }

  getServerInfo(id: string): void {
    this.serverService.getServerById(id).subscribe((info) => {
      this.serverInfo = info;
      this.getServerStatus(id);
    });
  }

  deleteServer(): void {
    if (!this.id) return;
    this.serverService.destroyServer(this.id).subscribe(() => {
      console.log('Server deleted');
      this.router.navigate(['/dashboard/aplicaciones']);
    });
  }

  resetServer(): void {
    if (!this.id) return;
    this.serverService.setResetServer(this.id).subscribe({
      next: () => {
        console.log('Server reset');
        this.showAlertMessage('Se ha reiniciado el progreso', 'success');
      },
      error: () => {
        console.error('Error resetting server');
        this.showAlertMessage('Error al reiniciar el progreso', 'error');
      },
    });
  }

  showAlertMessage(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }
  setActiveTab(tab: string) { this.activeTab = tab; }
}
