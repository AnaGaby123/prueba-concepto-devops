import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';

@Component({
  selector: 'pqf-radio-button',
  templateUrl: './pqf-radio-button.component.html',
  styleUrls: ['./pqf-radio-button.component.scss'],
})
export class PqfRadioButtonComponent implements OnInit {
  @Input() active: boolean = true; // DOCS Deshabilitado del radio button
  @Input() colorButton: 'main_proquifa' | 'red' | 'green' | 'purple' = 'main_proquifa'; // DOCS Color del radio button
  @Input() fontFamily: 'Roboto-Regular' | 'Roboto-Bold' = 'Roboto-Regular'; // DOCS Tipo de fuente a aplicar
  @Input() isCheck: boolean = true; // DOCS Valor del radio button que emitira si se marca o desmarca
  @Input() isNotError: boolean = true; // DOCS Tiene errores
  @Input() label: string = ''; // Docs Texto a mostrar del radio button
  @Output() emitSelected: EventEmitter<IRadioButton> = new EventEmitter<IRadioButton>(); // DOCS Emite el valor del radio button

  constructor() {}

  ngOnInit(): void {}

  handleSelectRadioButton(): void {
    if (!this.active) {
      !this.isCheck
        ? this.emitSelected.emit({value: true, label: this.label})
        : this.emitSelected.emit({value: false, label: this.label});
    }
  }
}
