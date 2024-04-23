import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {isEmpty, isEqual} from 'lodash-es';

import {numberToPercentage, percentageToNumber} from '@appUtil/util';
import {
  InputValidators,
  RegexValidators,
  RegexValidatorsByDigits,
} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
})
export class GenericInputComponent implements OnChanges, AfterViewInit {
  readonly inputValidators = InputValidators;
  readonly srcImageArrow = 'assets/Images/drop_list.svg';
  readonly srcImageArrowDisable = 'assets/Images/drop_list_disable.svg';
  readonly validatorForString = RegexValidators;
  readonly validatorForCharacter = RegexValidatorsByDigits;
  formGroup: any;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @Input() activeArrows = false;
  @Input() activeErrors = false;
  @Input() activeAlertErrors = false;
  @Input() alertErrorMessage = '';
  @Input() alertErrorColor: 'orange' | 'red' = 'orange';
  @Input() arrowColorDisable = false;
  @Input() arrowsPaddingRight = ''; // Forza el padding right de las flechas. Ejemplo: Cuando el componente es pequeño, se le manda un padding menor para darle mas espacio al input
  @Input() borderColor = '#D8D9DD';
  @Input() disableBorderColor = '#C2C3C9';
  @Input() disableFontColor = '#C2C3C9';
  @Input() extraString: string = null;
  @Input() extraStringStyleFont = 'Roboto-Regular-Black-13-16';
  @Input() font = 'Roboto-Regular';
  @Input() fontSize = '16px';
  @Input() fontColor = '#424242';
  @Input() forceActiveErrors = false;
  @Input() labelInsidePlaceHolderRight = null;
  @Input() labelInsidePlaceHolderLeft = null;
  @Input() enableEdit = true;
  @Input() height = '100%';
  @Input() isDisable = false;
  @Input() label = '';
  @Input() labelFont = 'Roboto-Regular';
  @Input() labelFontColor = '#424242';
  @Input() labelDisableFontColor = '#c2c3c9';
  @Input() labelTextAlign = 'left';
  @Input() max: number;
  @Input() maxlength = null; // DOCS: Delimitar la cantidad de caracteres
  @Input() minlength = null; // Poner un Minimo la cantidad de caracteres
  @Input() min = 0;
  @Input() onlyNumbers = false;
  @Input() onlyText = false;
  @Input() padding = '2px 10px';
  @Input() placeholder = 'Escribe Aquí';
  @Input() required = false;
  @Input() showAsterisk = true;
  @Input() textAlign = 'left';
  @Input() typeValidation: string = this.inputValidators.Alphanumeric;
  @Input() value: number | string = '';
  @Input() width = 'initial';
  @Input() truncateText = false;

  colors = {
    orange: '#e26a56',
    red: '#cc435e',
  };

  @Output() blurTextData: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorData: EventEmitter<any> = new EventEmitter<any>();
  @Output() textData: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('alertTarget') alertTarget: ElementRef<HTMLElement>;
  targetHelp = true;
  alertTargetElement: HTMLElement = null;

  constructor(private renderer2: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.value =
      this.typeValidation === this.inputValidators.Percentage && this.value
        ? numberToPercentage(Number(this.value))
        : this.value;
    this.formGroup = new FormGroup({
      genericInput: new FormControl(this.value),
    });
    // DOCS Ejecuta la validación que se coloca en el typeValidation
    //  para ver si el dato que recibe es correcto siempre y cuando el dato exista
    if (this.value) {
      setTimeout(() => {
        this.executeValidations();
        this.errorData.emit({
          errors: this.activeErrors,
          data: this.genericInput.value,
          required: this.required,
        });
      }, 1000);
    }
  }

  ngAfterViewInit(): void {
    if (!this.enableEdit && this.activeAlertErrors) {
      this.alertTargetElement = this.renderer2.selectRootElement(this.alertTarget).nativeElement;
      this.cdr.detectChanges();
      this.targetHelp = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      if (this.formGroup !== undefined) {
        if (this.typeValidation === this.inputValidators.Percentage) {
          const changesPreviousValue = Number(this.genericInput.value);
          const changesCurrentValue = numberToPercentage(Number(changes.value.currentValue));
          if (!isEqual(changesPreviousValue, changesCurrentValue)) {
            const value =
              changesCurrentValue === null || changesCurrentValue === 0 ? '' : changesCurrentValue;
            this.formGroup.controls.genericInput.setValue(value);
          }
        } else if (!isEqual(this.genericInput.value, changes.value.currentValue)) {
          const value = changes.value.currentValue === null ? '' : changes.value.currentValue;

          this.formGroup.controls.genericInput.setValue(value);
        }
      }
    }
  }

  get genericInput() {
    return this.formGroup.get('genericInput');
  }

  set genericInput(value) {
    this.formGroup.setValue({
      genericInput: typeof value === 'undefined' ? '' : value,
    });
  }

  // DOCS Cuando se presiona una tecla valida digito por digito para prevenir que ingrese caracteres no permitidos
  handleKeyPressEvent(event: KeyboardEvent): void {
    const key = String.fromCharCode(event.which);
    if (!this.executeRegexValidatorForCharacter(key)) {
      event.preventDefault();
    }
  }

  // DOCS: Se dispara si pasó la validación de keypress. Valida digito por digito
  handleBeforeInputEvent(event: InputEvent): void {
    if (
      event.inputType !== 'deleteContentBackward' &&
      event.inputType !== 'deleteContentForward' &&
      !this.executeRegexValidatorForCharacter(event.data!)
    ) {
      event.preventDefault();
    }
  }

  handleCompositionEvent(event: CompositionEvent): void {
    if (!this.executeRegexValidatorForCharacter(event.data!)) {
      event.preventDefault();
    }
  }

  // DOCS: Cuando pierde el foco, valida la cadena completa y emite lo que hay de valor
  handleOnBlurEvent() {
    this.executeValidations();
    // DOCS: Emite lo que esta guardado
    this.blurTextData.emit(this.genericInput.value);
    this.errorData.emit({
      errors: this.activeErrors,
      data: this.genericInput.value,
      required: this.required,
    });
  }

  // DOCS Cuando pega un valor, valida toda la cadena para evitar que pegue valores no permitidos
  handlePasteEvent(event: ClipboardEvent) {
    const value = event.clipboardData.getData('text');
    if (!this.executeRegexValidatorForString(value)) {
      event.preventDefault();
    }
  }

  // DOCS: Cuando el valor es modificado hace ciertas validaciones
  handleNgModelChange(value) {
    if (this.min && (this.typeValidation === 'number' || this.typeValidation === 'decimalNumber')) {
      if (+value < this.min) {
        setTimeout(() => {
          this.genericInput =
            this.genericInput.value < this.min ? this.min : this.genericInput.value;
        }, 500);
        return;
      }
    }
    if (this.max && (this.typeValidation === 'number' || this.typeValidation === 'decimalNumber')) {
      if (+value > this.max) {
        setTimeout(() => {
          this.genericInput =
            this.genericInput.value > this.max ? this.max : this.genericInput.value;
        }, 500);
        return;
      }
    }
    if (this.min && this.typeValidation === 'percentage') {
      if (Number(+value) < this.min) {
        setTimeout(() => {
          this.genericInput =
            Number(this.genericInput.value) < this.min ? this.min : Number(this.genericInput.value);
        }, 500);
        return;
      }
    }
    if (this.max && this.typeValidation === 'percentage') {
      if (Number(+value) > this.max) {
        setTimeout(() => {
          this.genericInput =
            Number(this.genericInput.value) > this.max ? this.max : Number(this.genericInput.value);
        }, 500);
        return;
      }
    }
    this.executeValidations();
    this.handleEmittedEvent();
  }

  private executeValidations() {
    // DOCS: Valida la cadena completa
    const stringIsValid = this.executeRegexValidatorForString(this.genericInput.value);
    this.activeErrors = isEmpty(this.genericInput.value) ? false : !stringIsValid;
    if (this.required && (this.genericInput.value === '' || this.genericInput.value === null)) {
      this.activeErrors = true;
    }
    if (
      (this.minlength || this.maxlength) &&
      !this.activeErrors &&
      !isEmpty(this.genericInput.value)
    ) {
      this.testValidationLength();
    }
  }

  private testValidationLength(): void {
    if (this.minlength && !this.maxlength) {
      this.activeErrors = !(this.genericInput.value.length >= this.minlength);
    }
    if (this.maxlength && !this.minlength) {
      this.activeErrors = !(this.genericInput.value.length <= this.maxlength);
    }
    if (this.minlength && this.maxlength) {
      this.activeErrors = !(
        this.genericInput.value.length >= this.minlength &&
        this.genericInput.value.length <= this.maxlength
      );
    }
  }

  onIncrement() {
    if ((this.max && Number(this.genericInput.value) < this.max) || !this.max) {
      this.genericInput = Number(this.genericInput.value) + 1;
    }
  }

  onDecrement() {
    if (Number(this.genericInput.value) > this.min) {
      this.genericInput = Number(this.genericInput.value) - 1;
    }
  }

  executeRegexValidatorForString(value: string): boolean {
    const validator = {
      [InputValidators.AlphaAndSpacesAndNumbers]: () =>
        this.validatorForString.alphaAndSpacesAndNumbers.test(value),
      [InputValidators.AlphaAndSpacesTwo]: () =>
        this.validatorForString.alphaAndSpacesTwo.test(value),
      [InputValidators.AlphaAndSpaces]: () => this.validatorForString.alphaAndSpaces.test(value),
      [InputValidators.Alpha]: () => this.validatorForString.alpha.test(value),
      [InputValidators.Alphanumeric]: () => this.validatorForString.alphanumeric.test(value),
      [InputValidators.DecimalNumber]: () => this.validatorForString.decimalNumber.test(value),
      [InputValidators.Email]: () => this.validatorForString.email.test(value),
      [InputValidators.Int]: () => this.validatorForString.int.test(value),
      [InputValidators.NumberAndDashes]: () => this.validatorForString.numberAndDashes.test(value),
      [InputValidators.NumberAndDots]: () => this.validatorForString.numberAndDots.test(value),
      [InputValidators.Number]: () => this.validatorForString.number.test(value),
      [InputValidators.Password]: () => this.validatorForString.password.test(value),
      [InputValidators.Percentage]: () => this.validatorForString.percentage.test(value),
      [InputValidators.Phone]: () => this.validatorForString.phone.test(value),
      [InputValidators.Phonev2UniqueValue]: () =>
        this.validatorForString[InputValidators.Phonev2UniqueValue],
      [InputValidators.Phonev2]: () => this.validatorForString.phoneV2.test(value),
      [InputValidators.SingleString]: () => this.validatorForString.singleString.test(value),
      [InputValidators.CASNumber]: () => this.validatorForString.CASNumber.test(value),
      [InputValidators.AcceptAll]: () => this.validatorForString.acceptAll.test(value),
      [InputValidators.AlphaNumberAndDashes]: () =>
        this.validatorForString.alphaNumericNumberAndDashes.test(value),
      [InputValidators.AlphaNumberAndDashesAndSlashAndComa]: () =>
        this.validatorForString.alphaNumericNumberAndDashesAndSlashAndComa.test(value),
      [InputValidators.AlphaNumberAndDashesAndSlashAndColon]: () =>
        this.validatorForString.alphaNumberAndDashesAndSlashAndColon.test(value),
      [InputValidators.RFC]: () => this.validatorForString.rfc.test(value),
    };
    return validator[this.typeValidation]();
  }

  private executeRegexValidatorForCharacter(key: string): boolean {
    const validator = {
      [InputValidators.AlphaAndSpacesAndNumbers]: () =>
        this.validatorForCharacter.alphaAndSpacesAndNumbers.test(key),
      [InputValidators.AlphaAndSpacesTwo]: () =>
        this.validatorForCharacter.alphaAndSpacesTwo.test(key),
      [InputValidators.AlphaAndSpaces]: () => this.validatorForCharacter.alphaAndSpaces.test(key),
      [InputValidators.Alpha]: () => this.validatorForCharacter.alpha.test(key),
      [InputValidators.Alphanumeric]: () => this.validatorForCharacter.alphanumeric.test(key),
      [InputValidators.DecimalNumber]: () => this.validatorForCharacter.numberAndDots.test(key),
      [InputValidators.Email]: () => this.validatorForCharacter.email.test(key),
      [InputValidators.Int]: () => this.validatorForCharacter.number.test(key),
      [InputValidators.NumberAndDashes]: () => this.validatorForCharacter.numberAndDashes.test(key),
      [InputValidators.NumberAndDots]: () => this.validatorForCharacter.numberAndDots.test(key),
      [InputValidators.Number]: () => this.validatorForCharacter.number.test(key),
      [InputValidators.Password]: () => this.validatorForCharacter.password.test(key),
      [InputValidators.Percentage]: () => this.validatorForCharacter.numberAndDots.test(key),
      [InputValidators.Phone]: () => this.validatorForCharacter.number.test(key),
      [InputValidators.Phonev2UniqueValue]: () => this.validatorForCharacter.phone.test(key),
      [InputValidators.Phonev2]: () => this.validatorForCharacter.phone.test(key),
      [InputValidators.SingleString]: () => this.validatorForCharacter.singleString.test(key),
      [InputValidators.CASNumber]: () => this.validatorForCharacter.CASNumber.test(key),
      [InputValidators.AcceptAll]: () => this.validatorForCharacter.acceptAll.test(key),
      [InputValidators.AlphaNumberAndDashes]: () =>
        this.validatorForCharacter.alphaNumericNumberAndDashes.test(key),
      [InputValidators.AlphaNumberAndDashesAndSlashAndComa]: () =>
        this.validatorForCharacter.alphaNumericNumberAndDashesAndSlashAndComa.test(key),
      [InputValidators.AlphaNumberAndDashesAndSlashAndColon]: () =>
        this.validatorForCharacter.alphaNumberAndDashesAndSlashAndColon.test(key),
      [InputValidators.RFC]: () => this.validatorForCharacter.rfc.test(key),
    };
    return validator[this.typeValidation]();
  }

  private handleEmittedEvent() {
    if (!this.isDisable) {
      let valueToEmit = this.genericInput.value;
      if (this.typeValidation === this.inputValidators.Percentage) {
        valueToEmit = this.genericInput.value
          ? percentageToNumber(Number(this.genericInput.value)).toString()
          : '';
      }
      this.textData.emit(valueToEmit);
      this.errorData.emit({
        errors: this.activeErrors,
        data: this.genericInput.value,
        required: this.required,
      });
    }
  }
}
