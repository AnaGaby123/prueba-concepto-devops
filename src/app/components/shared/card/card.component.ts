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
import {findIndex, isEmpty} from 'lodash-es';

/* Models Imports */
import {ICard} from '@appModels/card/card';

interface IComplexItem {
  uniqueIdentifier: number;
  extraData: any;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements DoCheck, AfterContentChecked {
  @Input() applySameMargin = false;
  @Input() enableMessage = false;
  @Input() height = '136px'; // DOCS tamaño del contenedor
  @Input() isLoading = false;
  @Input() itemWidth = '170px'; // DOCS ancho del item
  @Input() labelMargin = '5px'; // DOCS: Espaciado entre cada etiqueta
  @Input() options: Array<ICard> = [];
  @Input() withoutOptionsMessage = 'Sin Cotizaciones';
  @Output() handleOptionSelected: EventEmitter<ICard> = new EventEmitter<ICard>();
  lodashIsEmpty = isEmpty;
  optionsScrollItems: Array<ICard> = [];
  optionIndex = 0;

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
