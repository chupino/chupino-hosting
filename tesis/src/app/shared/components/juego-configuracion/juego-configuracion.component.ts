import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Juego } from '../../../core/models/Juego';
import { JuegoService } from '../../../core/services/juego.service';
import { JuegoConfiguracion } from '../../../core/models/JuegoConfiguracion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-juego-configuracion',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatTooltipModule,ReactiveFormsModule, CommonModule],
  templateUrl: './juego-configuracion.component.html',
  styleUrl: './juego-configuracion.component.css',
})
export class JuegoConfiguracionComponent {
  @Input() juegoSelected: Juego | null = null;
  configuraciones: JuegoConfiguracion | null= null;
  @Output() configuracionFormFilled = new EventEmitter<FormGroup | null>();
  @Output() juegoConfiguracionEmitter = new EventEmitter<JuegoConfiguracion | null>();
  expandedSections: { [key: string]: boolean } = {};

  configuracionForm: FormGroup;

  constructor(private fb: FormBuilder, private service: JuegoService) {
    this.configuracionForm = this.fb.group({
      nombreServidor: ['', Validators.required],
      env: this.fb.group({}),
      files: this.fb.group({})
    });
  }

  ngOnInit(): void {
    this.getJuegoConfiguraciones()
    this.configuracionForm.valueChanges.subscribe((value) =>
      this.emitConfiguracionFormFilled()
    );
  }

  getJuegoConfiguraciones(): void {
    if (this.juegoSelected == null) return;
    this.service
      .getConfiguraciones(this.juegoSelected.id.toString())
      .subscribe((configuraciones) => {
        this.configuraciones = configuraciones;
        this.juegoConfiguracionEmitter.emit(configuraciones);
        this.addDynamicControls();
      });
  }

  ngOnChanges(): void {
    if (this.configuracionForm) {
      this.addDynamicControls();
    }
  }

  emitConfiguracionFormFilled(): void {
    this.configuracionFormFilled.emit(this.configuracionForm);
  }

  addDynamicControls(): void {
    if (this.configuraciones?.env) {
      const envGroup = this.configuracionForm.get('env') as FormGroup;
      this.configuraciones.env.forEach((config) => {
        envGroup.addControl(config.clave, this.fb.control(config.valor_default || '', Validators.required));
      });
    }

    if (this.configuraciones?.files) {
      const filesGroup = this.configuracionForm.get('files') as FormGroup;
      this.configuraciones.files.forEach((file) => {
        const fileGroup = this.fb.group({});
        file.fields.forEach((field) => {
          const validators = field.default_value != null && field.default_value !== '' && field.default_value !== '{}' ? [Validators.required] : [];
          let value = field.default_value;
          if (field.type === 'boolean') {
            value = field.default_value === true;
          }
          fileGroup.addControl(field.clave, this.fb.control(value, validators));
        });
        filesGroup.addControl(file.name_file, fileGroup);
      });
    }
  }

  toggleSection(event: Event, section: string) {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  isSectionExpanded(section: string): boolean {
    return !!this.expandedSections[section];
  }

  resetForm(): void {
    this.configuracionForm.reset();
  }
}
