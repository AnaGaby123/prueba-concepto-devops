import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-generic-text-area',
  templateUrl: './generic-text-area.component.html',
  styleUrls: ['./generic-text-area.component.scss'],
})
export class GenericTextAreaComponent {
  @Input() borderColor = '#D8D9DD';
  @Input() isDisable = false;
  @Input() disableBorderColor = '#C2C3C9';
  @Input() disableFontColor = '#C2C3C9';
  @Input() enableBorder = false;
  @Input() enableEdit = true;
  @Input() font = 'Roboto-Regular';
  @Input() fontSize = '16px';
  @Input() fontColor = '#242424';
  @Input() forceActiveErrors = false;
  @Input() height = '30px';
  @Input() placeholder = 'Escribe Aquí';
  @Input() required = false;
  @Input() showAsterisk = true;
  @Input() textAlign = 'left';
  @Input() title = '';
  @Input() titleDisableFontColor = '#c2c3c9';
  @Input() titleFontColor = '#424242';
  @Input() titleFontFamily = 'Roboto-Regular';
  @Input() value = '';
  @Input() width = 'initial';
  @Input() maxlength = null;
  @Input() minlength = null;
  @Output() emitData: EventEmitter<string> = new EventEmitter<string>();

  errors = false;
  initial = true;
  grayAsteriskImg = 'assets/Images/gray-asterisk.svg';
  asteriskImg = 'assets/Images/asterisco.svg';
  redAsteriskImg = 'assets/Images/asterisco_red.svg';

  validated(value: string): void {
    if (this.required) {
      this.errors = !(value && value?.trim() !== '');
    } else {
      this.errors = false;
    }
    if ((this.minlength || this.maxlength) && !this.errors) {
      this.testValidationLength(value);
    }
  }

  private testValidationLength(value: string): void {
    if (this.minlength && !this.maxlength) {
      this.errors = !(value.length >= this.minlength);
    }
    if (this.maxlength && !this.minlength) {
      this.errors = !(value.length <= this.maxlength);
    }
    if (this.minlength && this.maxlength) {
      this.errors = !(value.length >= this.minlength && value.length <= this.maxlength);
    }
  }

  emitValue(text: string): void {
    this.validated(text);
    this.emitData.emit(text);
  }
}
