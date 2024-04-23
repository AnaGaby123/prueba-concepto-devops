import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  @Input() options: Array<DropListOption> = [];
  @Input() position = 'left';
  @Input() value: string;
  @Output() valueEmit: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  isOpen = false;
  title: string;

  ngOnInit(): void {
    if (this.value !== undefined && this.value !== null && this.value !== '') {
      this.title = this.options.filter((item) =>
        item.value === this.value ? item : null,
      )[0].label;
      /*  this.selectOption(
        this.options.filter((item) => (item.value === this.value ? item : null))[0],
      )*/ //
    } //
  }

  // handle-combo-retractil
  openCombo(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(item: DropListOption): void {
    this.title = item.label; //
    this.valueEmit.emit(item);
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
