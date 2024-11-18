import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.css'
})
export class ButtonPrimaryComponent {
  @Input() label: string = 'Button';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
