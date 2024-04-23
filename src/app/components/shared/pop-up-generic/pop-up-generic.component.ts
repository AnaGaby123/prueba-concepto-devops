import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up-generic',
  templateUrl: './pop-up-generic.component.html',
  styleUrls: ['./pop-up-generic.component.scss'],
})
export class PopUpGenericComponent {
  @Input() activeBtn: boolean = true; // DOCS: Indica si el botón principal esta habilitado
  @Input() activeButtons: boolean = false; // DOCS: Indica si se va a mostrar el footer con los botones
  @Input() color: string = ''; // DOCS: Indica el color de fondo del header y el borde del pop
  @Input() height: string = '450px';
  @Input() onlyOneButton: boolean = false; // DOCS: Indica si solo un muestra un botón
  @Input() rightButtonLabel: string = 'Aceptar'; // DOCS: Agrega etiqueta al botón principal
  @Input() leftButtonLabel: string = 'Cancelar'; // DOCS: Agrega etiqueta al botón secundario
  @Input() showClose: boolean = false; // DOCS: Indica si se muestra el botón de cerrar pop (X)
  @Input() titleHeader: string = 'PROQUIFA NET'; /*DOCS: Indica el titulo del pop*/
  @Input() width: string = '620px';
  @Input() overflow: string = 'hidden';
  @Output() evento: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClose(status: boolean): void {
    this.evento.emit(status);
  }
}
