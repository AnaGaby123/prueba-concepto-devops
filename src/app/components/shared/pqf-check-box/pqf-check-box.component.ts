import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pqf-check-box',
  templateUrl: './pqf-check-box.component.html',
  styleUrls: ['./pqf-check-box.component.scss'],
})
export class PqfCheckBoxComponent {
  @Input() check: boolean = false; // DOCS Valor del check que emitira si se marca o desmarca
  @Input() checkColor: 'main_proquifa' | 'red' | 'green' | 'purple' = 'main_proquifa'; // DOCS Color del check
  @Input() fontFamily: 'Roboto-Regular' | 'Roboto-Bold' = 'Roboto-Regular'; // DOCS Tipo de fuente a aplicar
  @Input() inactive: boolean = false; // DOCS Deshabilitado del check
  @Input() isError: boolean = false; // DOCS Tiene errores
  @Input() label: string = ''; // Docs Texto a mostrar del check
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>(); // DOCS Emite el valor del check

  getCheckImage() {
    return this.check && !this.inactive && !this.isError
      ? 'assets/Images/components-src/check/check_select_' + this.checkColor + '.svg'
      : !this.check && !this.inactive && !this.isError
      ? 'assets/Images/components-src/check/check_empty_' + this.checkColor + '.svg'
      : this.inactive && !this.check
      ? 'assets/Images/components-src/check/check_disabled_' + this.checkColor + '.svg'
      : this.inactive && this.check
      ? 'assets/Images/components-src/check/check_disabled_select_' + this.checkColor + '.svg'
      : 'assets/Images/components-src/check/check_error_' + this.checkColor + '.svg';
  }

  getTextCheckColor() {
    return {
      active: this.check && !this.inactive && !this.isError,
      hasError: this.isError && !this.inactive,
      disabled: this.inactive,
      normal: !this.check && !this.inactive && !this.isError,
    };
  }

  selected() {
    if (!this.inactive) {
      !this.check ? this.event.emit(true) : this.event.emit(false);
    }
  }
}
