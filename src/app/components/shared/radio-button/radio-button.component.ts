import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() activeLocalState = true;
  @Input() allowDisable = false;
  @Input() disabled = false;
  @Input() enableEdit = true;
  @Input() height: string;
  @Input() isMulticolor: boolean = false;
  @Input() radioColor:
    | 'ocean'
    | 'green'
    | 'red'
    | 'yellow'
    | 'dark-red'
    | 'dark-orange'
    | 'dark-green'
    | 'purple'
    | 'white' = 'ocean';
  @Input() label: string;
  @Input() labelFontStyle: string;
  @Input() radioPaddingRight = '6px';
  @Input() value = false;
  @Output() emitValue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitSelected: EventEmitter<IRadioButton> = new EventEmitter<IRadioButton>();

  constructor() {
    this.label = '';
    this.labelFontStyle = 'defaultLabel';
    this.height = '23px';
  }

  handleSelectRadioButton(type: boolean): void {
    if (this.enableEdit && !this.disabled) {
      if (this.activeLocalState) {
        this.value = type;
        this.emitValue.emit(this.value);
      } else {
        this.emitValue.emit(type);
      }
      this.emitSelected.emit({value: type, label: this.label});
    }
  }
}
