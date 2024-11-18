import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.css'
})
export class ButtonSecondaryComponent {
  @Input() label: string = 'Button';
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
