/* Core Imports */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/* Models Imports */
import {IDropdownButtonCustomValues} from '@appModels/dropdown-button-custom/dropdown-button-custom.model';
import {DAYS_OF_WEEK} from '@appUtil/common.protocols';

@Component({
  selector: 'app-dropdown-button-custom',
  templateUrl: './dropdown-button-custom.component.html',
  styleUrls: ['./dropdown-button-custom.component.scss'],
})
export class DropdownButtonCustomComponent implements OnInit {
  @Output() valueEmit: EventEmitter<string> = new EventEmitter<string>();
  @Input() values: IDropdownButtonCustomValues = {
    yesterday: 0,
    dayBeforeYesterday: 0,
    past: 0,
    today: 0,
    all: 0,
    tomorrow: 0,
    dayAfterTomorrow: 0,
    future: 0,
  };
  @Input() currentValue = 'Todos';
  labelsOptions = {
    yesterday: 'Ayer',
    dayBeforeYesterday: 'Antier',
    past: 'Pasado',
    today: 'Hoy',
    all: 'Todos',
    tomorrow: 'Mañana',
    dayAfterTomorrow: 'Pasado Mañana',
    future: 'Futuro',
  };
  today: string;
  tomorrow: string;
  yesterday: string;
  isOpen = false;

  ngOnInit(): void {
    this.setDays();
  }

  setDays() {
    const days = DAYS_OF_WEEK;
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.today = days[today.getDay()];
    this.tomorrow = days[tomorrow.getDay()];
    this.yesterday = days[yesterday.getDay()];
  }

  openCombo(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string): void {
    if (this.currentValue !== this.labelsOptions[value]) {
      this.valueEmit.emit(this.labelsOptions[value]);
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
