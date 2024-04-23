import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent implements OnInit {
  @Output() valueEmit: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  @Input()
  options: Array<DropListOption> = [];
  @Input() value: DropListOption;
  isOpen = false;

  ngOnInit(): void {
    if (this.value !== undefined && this.value !== null && this.value.value !== '') {
      this.selectOption(
        this.options.filter((item) => (item.value === this.value.value ? item : null))[0],
      );
    }
  }

  openCombo(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(item: DropListOption): void {
    if (item.value !== this.value.value) {
      this.valueEmit.emit(item);
    }
    if (this.isOpen) {
      this.openCombo();
    }
  }

  closeCombo(): void {
    if (this.isOpen) {
      this.openCombo();
    }
  }
}
