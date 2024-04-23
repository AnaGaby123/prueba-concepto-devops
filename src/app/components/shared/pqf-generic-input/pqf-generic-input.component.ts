import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {isEmpty, isEqual} from 'lodash-es';
import {
  InputValidators,
  RegexValidators,
  RegexValidatorsByDigits,
} from '@appHelpers/shared/shared.helpers';

import {numberToPercentage, percentageToNumber} from '@appUtil/util';

@Component({
  selector: 'pqf-generic-input',
  styleUrls: ['./pqf-generic-input.component.scss'],
  templateUrl: './pqf-generic-input.component.html',
})
export class PqfGenericInputComponent implements OnInit, OnChanges {
  readonly inputTypes = InputValidators;
  readonly regexCharacterValidators = RegexValidatorsByDigits;
  readonly regexStringValidators = RegexValidators;
  isOnFocus = false;

  @Input() feedback: string; // DOCS: MENSAJE DE APOYO
  @Input() forceError: boolean = false; //DOCS: ERROR EXTERNO
  @Input() icon: 'check-success' = 'check-success';
  @Input() isActive: boolean = true; // (ENABLED / DISBALED) DEL INPUT
  @Input() isAlignColumn: boolean = true; //DOCS: INPUT COLUMN(TRUE) / ROW
  @Input() isReadonly: boolean = false; // DOCS: FALSE = MODO SOLO LECTURA
  @Input() isRequired: boolean = false; //DOCS: ES REQUERIDO (CAMPO OBLIGATORIO)
  @Input() label?: string;
  @Input() maxLength?: number; //DOCS: DELIMITAR LA CANTIDAD DE CARACTERES
  @Input() maxNumber?: number;
  @Input() minLength: number = 0; //DOCS: PONER UNA CANTIDAD MINIMA DE CARACTERES
  @Input() minNumber?: number;
  @Input() showMessageRequired?: boolean = false; // DOCS: MOSTRAR TEXTO "(CAMPO OBLIGATORIO)"
  @Input() extraString: string; //DOCS: TEXTO DESPUÉS DEL INPUT
  @Input()
  width?: string; //DOCS: AJUSTE DE TAMAÑO
  @Input() showAsterisk: boolean = false;
  @Input() placeholder?: string;
  @Input() showFeedback: boolean = true; //DOCS: CONFIMAR SI SE MUESTRA EL MENSAJE DE APOYO
  @Input() textAlign: string = 'left'; //DOCS: ALINEACIÓN DEL TEXTO DENTRO DEL INPUT
  @Input() type: string = 'text'; //DOCS: TIPO DE INPUT
  @Input() typeValidation: InputValidators = this.inputTypes.AcceptAll; //TIPO DE VALIDACIÓN REGEX
  @Input() value?: number | string | null = null;
  @Output() inputOnBlurEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() valueChangeEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorData: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputElement') inputElement?: ElementRef<HTMLInputElement>;
  //AGREGAR @INPUT PARA LOS :

  error: boolean = false;
  input: FormControl;

  constructor(public cdr: ChangeDetectorRef) {
    this.input = new FormControl(this.constructInitialValue(this.value));
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      /* DOCS: Se le da un tratamiento especial si es porcentaje*/
      if (this.typeValidation === this.inputTypes.Percentage) {
        const changesPreviousValue = Number(this.input.value);
        const changesCurrentValue = numberToPercentage(Number(changes.value.currentValue));
        if (!isEqual(changesPreviousValue, changesCurrentValue)) {
          const value =
            changesCurrentValue === null || changesCurrentValue === 0 ? '' : changesCurrentValue;
          this.input.setValue(value);
        }
      } else if (!isEqual(this.input.value, changes.value.currentValue)) {
        const value = changes.value.currentValue === null ? '' : changes.value.currentValue;
        this.input.setValue(value);
      }
      this.cdr.detectChanges();
    }
  }

  private constructInitialValue(
    value?: number | string | null,
  ): number | string | null | undefined {
    return this.typeValidation === this.inputTypes.Percentage && value
      ? numberToPercentage(Number(value))
      : value;
  }

  get genericInput() {
    return this.input;
  }

  set genericInputSet(value) {
    this.input.setValue(typeof value === 'undefined' ? '' : value);
  }

  // DOCS: Cuando se hace focus, solo cambia una bandera, no valida nada
  handleOnFocusEvent() {
    this.isOnFocus = true;
  }

  // DOCS Cuando se presiona una tecla valida digito por digito para prevenir que ingrese caracteres no permitidos
  handleKeyPressEvent(event: KeyboardEvent) {
    const key = String.fromCharCode(event.which);
    if (!this.testWithRegexCharacterValidator(key)) {
      event.preventDefault();
    }
  }

  // DOCS: Se dispara si pasó la validación de keypress. Valida digito por digito
  handleBeforeInputEvent(event: InputEvent) {
    if (
      event.inputType !== 'deleteContentBackward' &&
      event.inputType !== 'deleteContentForward' &&
      !this.testWithRegexCharacterValidator(event.data!)
    ) {
      event.preventDefault();
    }
  }

  handleCompositionEvent(event: CompositionEvent) {
    if (!this.testWithRegexCharacterValidator(event.data!)) {
      event.preventDefault();
    }
  }

  // DOCS: Cuando pierde el foco, valida la cadena completa y emite lo que hay de valor
  handleOnBlurEvent() {
    this.isOnFocus = false;
    this.executeValidations();
    // DOCS: Emite lo que esta guardado
    this.inputOnBlurEmitter.emit(this.genericInput.value);
    this.errorData.emit({
      errors: this.error,
      data: this.genericInput.value,
      required: this.isRequired,
    });
  }

  // DOCS Cuando pega un valor, valida toda la cadena para evitar que pegue valores no permitidos
  handlePasteEvent(event: ClipboardEvent) {
    const value = event.clipboardData!.getData('text');
    if (!this.testWithRegexStringValidator(value)) {
      event.preventDefault();
    }
  }

  handleNgModelChange(value) {
    if (
      this.minNumber &&
      (this.typeValidation === 'number' || this.typeValidation === 'decimalNumber')
    ) {
      if (+value < this.minNumber) {
        setTimeout(() => {
          this.genericInputSet =
            this.genericInput.value < this.minNumber ? this.minNumber : this.genericInput.value;
        }, 500);
        return;
      }
    }
    if (
      this.maxNumber &&
      (this.typeValidation === 'number' || this.typeValidation === 'decimalNumber')
    ) {
      if (+value > this.maxNumber) {
        setTimeout(() => {
          this.genericInputSet =
            this.genericInput.value > this.maxNumber ? this.maxNumber : this.genericInput.value;
        }, 500);
        return;
      }
    }
    if (this.minNumber && this.typeValidation === 'percentage') {
      if (Number(+value) < this.minNumber) {
        setTimeout(() => {
          this.genericInputSet =
            Number(this.genericInput.value) < this.minNumber
              ? this.minNumber
              : Number(this.genericInput.value);
        }, 500);
        return;
      }
    }
    if (this.maxNumber && this.typeValidation === 'percentage') {
      if (Number(+value) > this.maxNumber) {
        setTimeout(() => {
          this.genericInputSet =
            Number(this.input.value) > this.maxNumber ? this.maxNumber : Number(this.input.value);
        }, 500);
        return;
      }
    }
    this.executeValidations();
    this.handleEmittedEvent();
  }

  private executeValidations() {
    // DOCS: Valida la cadena completa
    const stringIsValid = this.testWithRegexStringValidator(this.genericInput.value);
    this.error = isEmpty(this.genericInput.value) ? false : !stringIsValid;

    if (this.isRequired && (this.genericInput.value === '' || this.genericInput.value === null)) {
      this.error = true;
    }
    if ((this.minLength || this.maxLength) && !this.error && !isEmpty(this.genericInput.value)) {
      this.testValidationLength();
    }
  }

  private handleEmitters(emitterName: string): void {
    let valueToEmit = this.input.value;
    if (this.typeValidation === this.inputTypes.Percentage) {
      valueToEmit = this.input.value ? percentageToNumber(Number(this.input.value)).toString() : '';
    }

    if (
      this.typeValidation === this.inputTypes.DecimalNumber ||
      this.typeValidation === this.inputTypes.Number
    ) {
      valueToEmit = this.input.value ? Number(this.input.value) : '';
    }

    // @ts-ignore
    this[emitterName].emit(valueToEmit);
  }

  private testWithRegexCharacterValidator(key: string): boolean {
    return this.regexCharacterValidators[this.typeValidation].test(key);
  }

  private testWithRegexStringValidator(string: string): boolean {
    return this.regexStringValidators[this.typeValidation].test(string);
  }

  private testValidationLength(): void {
    if (this.minLength && !this.maxLength) {
      this.error = !(this.genericInput.value?.length >= this.minLength);
    }
    if (this.maxLength && !this.minLength) {
      this.error = !(this.genericInput.value?.length <= this.maxLength);
    }
    if (this.minLength && this.maxLength) {
      this.error = !(
        this.genericInput.value?.length >= this.minLength &&
        this.genericInput.value?.length <= this.maxLength
      );
    }
  }

  private handleEmittedEvent() {
    if (this.isActive) {
      let valueToEmit = this.input.value;
      if (this.typeValidation === this.inputTypes.Percentage) {
        valueToEmit = this.input.value
          ? percentageToNumber(Number(this.input.value)).toString()
          : '';
      }
      this.valueChangeEmitter.emit(valueToEmit);
      this.errorData.emit({
        errors: this.error,
        data: this.input.value,
        required: this.isRequired,
      });
    }
  }
}
