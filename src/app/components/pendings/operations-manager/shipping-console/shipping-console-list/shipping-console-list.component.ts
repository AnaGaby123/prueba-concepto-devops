import {Component} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-shipping-console-list',
  templateUrl: './shipping-console-list.component.html',
  styleUrls: ['./shipping-console-list.component.scss'],
})
export class ShippingConsoleListComponent {
  options: Array<DropListOption> = [
    {
      value: '1',
      label: 'Todos',
    },
  ];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  selectFilterByPriority(byPriority: DropListOption): void {}

  changeSearchTerm(searchTerm: string): void {}
}
