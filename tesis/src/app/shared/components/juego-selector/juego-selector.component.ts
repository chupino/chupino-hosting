import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Juego } from '../../../core/models/Juego';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../../core/services/juego.service';

@Component({
  selector: 'app-juego-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-selector.component.html',
  styleUrl: './juego-selector.component.css'
})
export class JuegoSelectorComponent {
  juegos: Juego[] = [];
  @Output() juegoSelected = new EventEmitter<Juego>();
  selectedJuego: Juego | null = null;

  constructor(private service : JuegoService){}

  ngOnInit() : void {
    this.getJuegos()
  }

  getJuegos(): void {
    this.service.getJuegos().subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  selectJuego(juego: Juego): void {
    this.selectedJuego = juego;
    this.juegoSelected.emit(juego);
    console.log('Juego seleccionado:', this.selectedJuego);
  }
}
