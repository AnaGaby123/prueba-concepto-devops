import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up-configuracion',
  templateUrl: './pop-up-configuracion.component.html',
  styleUrls: ['./pop-up-configuracion.component.scss'],
})
export class PopUpConfiguracionComponent implements OnChanges {
  @Output() evento: EventEmitter<any> = new EventEmitter<any>();
  @Input() alertaTxt = 'Error"';
  @Input() activarBoton = true;
  tipoConfig = 'Definitivo';
  itemsConfig = {
    leftOptionText: 'Definitivo',
    rightOptionText: 'Temporal',
    selected: 'left',
    fontSize: '18px',
  };

  ngOnChanges(): void {
    if (!this.activarBoton) {
      setTimeout(() => {
        this.close(true);
      }, 1500);
    }
  }

  close(status: boolean): void {
    const datos = {
      estado: status,
      tipoConfig: this.tipoConfig,
    };
    this.evento.emit(datos);
  }

  recoverType(value: string): void {
    this.tipoConfig = value;
  }
}
