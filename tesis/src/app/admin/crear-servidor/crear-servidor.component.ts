import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../../core/services/server.service';
import { JuegoSelectorComponent } from '../../shared/components/juego-selector/juego-selector.component';
import { CreateServer } from '../../core/models/CreateServer';
import { ServerTypeSelectorComponent } from "../../shared/components/server-type-selector/server-type-selector.component";
import { JuegoConfiguracionComponent } from "../../shared/components/juego-configuracion/juego-configuracion.component";
import { ServerType } from '../../core/models/ServerType';
import { JuegoConfiguracionEnv } from '../../core/models/JuegoConfiguracionEnv';
import { Juego } from '../../core/models/Juego';
import { ButtonPrimaryComponent } from '../../shared/components/button-primary/button-primary.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { JuegoConfiguracion } from '../../core/models/JuegoConfiguracion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crear-servidor',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    JuegoSelectorComponent,
    ServerTypeSelectorComponent,
    JuegoConfiguracionComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
],
  templateUrl: './crear-servidor.component.html',
  styleUrl: './crear-servidor.component.css'
})
export class CrearServidorComponent {
  serverCreateFormData : CreateServer | null = null;
  selectedJuego: Juego | null = null;
  selectedServerType: ServerType | null = null;
  configuracionForm : FormGroup | null = null;
  currentStep: number = 1;

  juegoConfiguraciones : JuegoConfiguracion | null = null;

  constructor(private serverService : ServerService, private router: Router){}

  @ViewChild(ServerTypeSelectorComponent) serverTypeSelector!: ServerTypeSelectorComponent;
  @ViewChild(JuegoConfiguracionComponent) juegoConfiguracion!: JuegoConfiguracionComponent;
  @ViewChild('step1') step1!: ElementRef;
  @ViewChild('step2') step2!: ElementRef;
  @ViewChild('step3') step3!: ElementRef;

  setServerType(serverType: ServerType | null): void {
    this.selectedServerType = serverType;
  }

  setConfiguracionForm(form : FormGroup | null) : void{
    this.configuracionForm = form
  }

  setJuegoConfiguraciones(configuraciones: JuegoConfiguracion | null): void {
    this.juegoConfiguraciones = configuraciones;
  }

  onJuegoSelected(juego: Juego): void {
    this.selectedJuego = juego;
    if (this.serverTypeSelector) {
      this.serverTypeSelector.resetSelectedServerType();
    }
    if(this.juegoConfiguracion) {
      this.juegoConfiguracion.resetForm();
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;

      this.scrollToStep(this.currentStep);
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToStep(this.currentStep);
    }
  }

  scrollToStep(step: number): void {
    const stepElement = (this[`step${step}` as keyof CrearServidorComponent] as ElementRef).nativeElement;
    stepElement.scrollIntoView({ behavior: 'smooth' });
  }

  createServer(): void {
    if (!this.selectedJuego || !this.selectedServerType || !this.configuracionForm) {
      console.error('No se han seleccionado los datos necesarios para crear el servidor');
      return;
    }

    
    const formCreate: { [key: string]: any } = {
      id_juego: this.selectedJuego?.id,
      docker_image: this.selectedJuego?.docker_image,
      size: this.selectedServerType?.size,
      storage: this.selectedServerType?.storage,
      id_hardware: this.selectedServerType?.id,
      nombre_servidor: this.configuracionForm?.get('nombreServidor')?.value,
      puertos: this.selectedJuego?.puertos,
      configuraciones: {
        env: [],
        files: []
      }
    }

    this.juegoConfiguraciones?.env.forEach(config => {
      const controlPath = ['env', config.clave];
      formCreate['configuraciones']['env'].push({
        id_configuracion: config.id,
        clave: config.clave,
        valor: this.configuracionForm?.get(controlPath)?.value
      })
    });

    this.juegoConfiguraciones?.files.forEach(file => {
      const fileConfig: { name_file: string; destination_host: string;destination_container_tmp: string;destination_container_final: string; id_archivo_configuracion: number; fields: { key: string; value: any }[] } = {
        name_file: file.name_file,
        destination_host: file.destination_host,
        destination_container_tmp: file.destination_container_tmp,
        destination_container_final: file.destination_container_final,
        id_archivo_configuracion: file.id,
        fields: []
      }
      const fields = file.fields.map(field => {
          const controlPath = ['files', file.name_file, field.clave];
          const controlValue = this.configuracionForm?.get(controlPath)?.value.toString();
          return {
            key: field.clave,
            value: controlValue
          };
        });
      fileConfig.fields = fields;
      formCreate['configuraciones']['files'].push(fileConfig);
    })

    console.log('Formulario de creación de servidor:', formCreate);

    this.serverService.createServer(formCreate).subscribe({
      next: () => {
        console.log('Servidor creado correctamente');
        const navigationExtras: NavigationExtras = {
          queryParams: { success: true }
        };
        this.router.navigate(['/dashboard/aplicaciones'], navigationExtras);
      },
      error: (err) => {
        console.error('Error al crear el servidor:', err);
        const navigationExtras: NavigationExtras = {
          queryParams: { success: false }
        };
        this.router.navigate(['/dashboard/aplicaciones'], navigationExtras);
      }
    });
  }
}
