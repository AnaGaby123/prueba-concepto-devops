import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {ENUM_TYPE_POP} from '@appUtil/common.protocols';

@Component({
  selector: 'pqf-pop-up',
  templateUrl: './pqf-pop-up.component.html',
  styleUrls: ['./pqf-pop-up.component.scss'],
})
export class PqfPopUpComponent implements OnInit {
  @Input() activeButtons: boolean = true; // DOCS Activa los botones del pop
  @Input() text: string = ''; // DOCS Texto a mostrar en el pop
  @Input() secondText: string = ''; // DOCS Texto a mostrar texto secundario en el pop
  @Input() textPrimaryButton: string = 'Guardar'; // DOCS Texto del botón primario
  @Input() textSecondaryButton: string = 'Salir'; // DOCS Texto del botón secundario
  @Input() titleHeader = 'PROQUIFA NET'; // DOCS Texto de titulo del pop
  @Input() typePop: string = ENUM_TYPE_POP.warning; // DOCS Tipo de pop warning/success/error
  @Input() widthButton: 'sm' | 'md' | 'lg' | 'xl' = 'sm'; //DOCS : Tamaño de los botones
  @Output() event: EventEmitter<IPopUp> = new EventEmitter<IPopUp>(); // DOCS emite el boton seleccionado más un booleano de apoyo

  constructor() {}

  ngOnInit(): void {}

  getCheckImage(): string {
    return this.typePop === ENUM_TYPE_POP.success
      ? 'assets/Images/components-src/pop-up/success.svg'
      : this.typePop === ENUM_TYPE_POP.warning
      ? 'assets/Images/components-src/pop-up/alert.svg'
      : '';
  }

  getTypePopStyles(): Object {
    return {
      warning: this.typePop === ENUM_TYPE_POP.warning,
      success: this.typePop === ENUM_TYPE_POP.success,
      error: this.typePop === ENUM_TYPE_POP.error,
    };
  }

  emitSelected(type: string, value: boolean): void {
    this.event.emit({type, value});
  }
}
