import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServerType } from '../../../core/models/ServerType';
import { Juego } from '../../../core/models/Juego';
import { ServerService } from '../../../core/services/server.service';

@Component({
  selector: 'app-server-type-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-type-selector.component.html',
  styleUrl: './server-type-selector.component.css'
})
export class ServerTypeSelectorComponent{
  @Input() juegoSelected : Juego | null = null;
  serverTypes: ServerType[] | null = null;
  @Output() serverTypeSelected = new EventEmitter<ServerType | null>();
  selectedServerType: ServerType | null = null;

  constructor(private service : ServerService) {}

  ngOnInit() : void {
    this.getServerTypes();
  }

  getServerTypes(): void {
    if(this.juegoSelected == null) return;
    this.service.getServerTypes(this.juegoSelected.id.toString()).subscribe(serverTypes => {
      this.serverTypes = serverTypes;
    })
  }

  selectServerType(serverType: ServerType): void {
    this.selectedServerType = serverType;
    this.emitServerTypeSelected();
  }

  resetSelectedServerType(): void {
    this.selectedServerType = null;
  }

  emitServerTypeSelected(): void {
    this.serverTypeSelected.emit(this.selectedServerType);
  }
}
