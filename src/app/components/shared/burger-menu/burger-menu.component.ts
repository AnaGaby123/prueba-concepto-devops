import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
})
export class BurgerMenuComponent {
  @Input() options: Array<DropListOption> = [];
  @Input() position = 'left';
  @Input() value: DropListOption;
  @Output() valueEmit: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  isOpen = false;
  title: string;

  handleComboContraction(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(item: DropListOption): void {
    this.valueEmit.emit(item);
    if (this.isOpen) {
      this.handleComboContraction();
    }
  }

  closeCombo(): void {
    if (this.isOpen) {
      this.handleComboContraction();
    }
  }
}
