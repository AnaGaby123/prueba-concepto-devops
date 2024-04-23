import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-pqf-toggle-switch',
  templateUrl: './pqf-toggle-switch.component.html',
  styleUrls: ['./pqf-toggle-switch.component.scss'],
})
export class PqfToggleSwitchComponent {
  @Input() options: Array<DropListOption> = [];
  @Input() selectedOption: DropListOption = null;
  @Input() backgroundColor: string;
  @Input() disable = false;

  @Output() selectedOptionChange: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();

  handleSelectedOptionChange(item: DropListOption): void {
    if (this.selectedOption?.value !== item.value) {
      this.selectedOptionChange.emit(item);
    }
  }
}
