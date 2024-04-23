import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pqf-toggle',
  templateUrl: './pqf-toggle.component.html',
  styleUrls: ['./pqf-toggle.component.scss'],
})
export class PqfToggleComponent {
  @Input() active: boolean = true;
  @Input() betweenActive = false; // Habilita que se muestre en ambos el toggle habilitado en verde
  @Input() disable: boolean = false;
  @Input() textLeft = ''; // Texto del toggle a la izquierda
  @Input() textRight = ''; // Texto del toggle a la derecha
  @Input() theme: string = 'default'; // TEMA DEL COMPONENTE
  @Input() version: string = 'fat'; // Versiones: fat, thin
  @Output() emitOptionSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleClick() {
    if (!this.disable) {
      this.emitOptionSelected.emit(!this.active);
    }
  }
}
