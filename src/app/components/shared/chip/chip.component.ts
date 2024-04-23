/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';

/* Models Imports */
import {IChip} from '@appModels/chip/chip';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Output() activeChip: EventEmitter<IChip> = new EventEmitter();
  @Input() dataChips: Array<IChip>;
  @Input() separator = ' · ';
  @Input() totalsIsAmount = false;
  @Input() currency = 'USD';
  @Input() disabledColor = '#c2c3c9';
  @Input() fontColorDefault = '#424242';
  @Input() fontColorActive = '#ffffff';

  changeActive(chip: IChip): void {
    if (!chip.disable) {
      this.activeChip.emit({...chip, active: true});
    }
  }

  changeBackground(event: any, chip: IChip): void {
    if (!chip.disable && !chip.active) {
      if (event.type === 'mouseenter') {
        event.target.style.backgroundColor = chip.color;
        event.target.style.color = this.fontColorActive;
      } else {
        event.target.style.backgroundColor = chip.colorDefault;
        event.target.style.color = this.fontColorDefault;
      }
    }
  }
}
