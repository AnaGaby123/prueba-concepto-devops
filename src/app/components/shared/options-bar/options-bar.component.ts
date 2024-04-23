import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OptionBar} from '@appModels/options-bar/options-bar';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss'],
})
export class OptionsBarComponent {
  @Input() enableLabelColor = '#424242';
  @Input() enableLeftArrow = true;
  @Input() enableRightArrow = true;
  @Input() disableLabelColor = '#c2c3c2';
  @Input() selectedLabelColor = '#008894';
  @Input() enableBarColor = '#d8d8d8';
  @Input() disableBarColor = '#c2c3c2';
  @Input() selectedBarColor = '#008894';
  @Input() enableSelectOption = true;
  @Input() fontSize;
  @Input() marginBottom = '15px';
  @Input() heightBar = '8px';
  @Input() justifyLabel = 'center';
  @Input() optionMinWidth = '250px';
  @Input() options: OptionBar[] = [];
  @Input() selectedOption = {} as OptionBar;
  @Input() showNumber = false;
  @Input() showArrows = true;
  @Output() handleOptionSelected: EventEmitter<OptionBar> = new EventEmitter<OptionBar>();
  index = 0;

  selectOption(option: OptionBar): void {
    if (this.enableSelectOption && option) {
      this.handleOptionSelected.emit(option);
    }
  }

  selectPreviousOption(): void {
    if (this.index > 0) {
      this.index--;
      this.handleOptionSelected.emit(this.options[this.index]);
    }
  }

  selectNextOption(): void {
    if (this.index < this.options.length - 1) {
      this.index++;
      this.handleOptionSelected.emit(this.options[this.index]);
    }
  }
}
