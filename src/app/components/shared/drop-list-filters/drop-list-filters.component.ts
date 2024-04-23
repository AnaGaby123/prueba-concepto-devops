import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

/* Tools Imports */
import {forEach, isEqual} from 'lodash-es';

@Component({
  selector: 'app-drop-list-filters',
  templateUrl: './drop-list-filters.component.html',
  styleUrls: ['./drop-list-filters.component.scss'],
})
export class DropListFiltersComponent implements OnChanges {
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  @Input() items: DropListOption[];
  @Input() itemSelected: DropListOption = {} as DropListOption;
  @Input() title = '';
  isBrandOpen = false;
  itemsList: Array<DropListOption> = [
    {
      label: 'Todas',
      value: DEFAULT_UUID,
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.items &&
      !isEqual(changes.items.previousValue, changes.items.currentValue) &&
      this.items
    ) {
      this.itemsList = [
        {
          label: 'Todas',
          value: DEFAULT_UUID,
        },
      ];
      forEach(this.items, (o) => {
        this.itemsList.push(o);
      });
    }
  }

  handleFilterIsOpen(blur?: string): void {
    if (blur === 'blur') {
      if (this.isBrandOpen) {
        this.isBrandOpen = false;
      }
    } else {
      this.isBrandOpen = !this.isBrandOpen;
    }
  }

  selectItem(item: DropListOption): void {
    this.handleFilterIsOpen();
    if (item !== undefined && item.value !== this.itemSelected?.value) {
      this.valueDropList.emit(item);
    }
  }
}
