/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {ICard} from '@appModels/card/card';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {findIndex} from 'lodash-es';

/* Models Imports */

interface IComplexItem {
  uniqueIdentifier: number;
  extraData: any;
}

@Component({
  selector: 'app-pqf-card',
  templateUrl: './pqf-card.component.html',
  styleUrls: ['./pqf-card.component.scss'],
})
export class PqfCardComponent implements DoCheck, AfterContentChecked {
  @Input() applySameMargin = false;
  @Input() enableMessage = false;
  @Input() isLoading = false;
  @Input() options: Array<ICard> = [];
  @Input() withoutOptionsMessage = 'Sin Cotizaciones';
  @Output() handleOptionSelected: EventEmitter<ICard> = new EventEmitter<ICard>();
  optionsScrollItems: Array<ICard> = [];
  optionIndex = 0;
  classNames = CLASS_NAMES;
  constructor(private cdr: ChangeDetectorRef) {}

  ngDoCheck(): void {
    this.changeIndex(this.optionsScrollItems);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onSelected(option: ICard): void {
    if (!option.active) {
      this.handleOptionSelected.emit(option);
    }
  }

  changeIndex(options: Array<ICard>): void {
    this.optionIndex = findIndex(options, (o) => o.active);
  }

  handleTrackBy(index: number, complexItem: IComplexItem): number {
    return complexItem.uniqueIdentifier;
  }
}
