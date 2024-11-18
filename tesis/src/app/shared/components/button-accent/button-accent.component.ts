import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-accent',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './button-accent.component.html',
  styleUrl: './button-accent.component.css'
})
export class ButtonAccentComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
