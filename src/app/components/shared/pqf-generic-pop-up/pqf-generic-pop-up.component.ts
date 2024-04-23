import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';

@Component({
  selector: 'pqf-generic-pop-up',
  templateUrl: './pqf-generic-pop-up.component.html',
  styleUrls: ['./pqf-generic-pop-up.component.scss'],
})
export class PqfGenericPopUpComponent implements OnInit {
  @Input() height = '496px';
  @Input() width = '725px';
  @Input() isActiveButtons: boolean = true; // DOCS Muestras los botones del pop
  @Input() isActivePrimaryButton: boolean = false; // DOCS Indica si el botón primario esta activo o no
  @Input() isShowClose = true; // DOCS: Indica si se muestra el botón de cerrar pop (X)
  @Input() onlyPrimaryButton: boolean = false; // DOCS Muestra solo el boton primario
  @Input() onlySecondaryButton: boolean = false; // DOCS Muestra solo el boton secundario
  @Input() paddingBottomContent = '32px'; // DOCS Padding top del contenedor
  @Input() paddingTopContent = '24px'; // DOCS Padding top del contenedor
  @Input() textPrimaryButton: string = 'Continuar'; // DOCS Texto del botón primario
  @Input() textSecondaryButton: string = 'Cancelar'; // DOCS Texto del botón secundario
  @Input() titleHeader: string = 'PROQUIFA NET'; // DOCS Texto de titulo del pop
  @Input() isFull: boolean = false; // DOCS: se coloca sobre toda la pantall o solo un contenedor
  @Input() enableBackground: boolean = true; // DOCS: Habilita el fondo oscuro
  @Input() widthButton: 'sm' | 'md' | 'lg' | 'xl' = 'md'; //DOCS : Tamaño de los botones
  @Output() event: EventEmitter<IPopUp> = new EventEmitter<IPopUp>(); // DOCS emite el boton seleccionado más un booleano de apoyo

  ngOnInit(): void {}

  emitSelected(type: string, value: boolean): void {
    this.event.emit({type, value});
  }
}
