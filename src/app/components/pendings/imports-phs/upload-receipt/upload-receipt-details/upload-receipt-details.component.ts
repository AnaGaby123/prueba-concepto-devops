import {Component} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {debounce} from 'lodash-es';

import {
  DEFAULT_DATE,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  HIGHER_VALUE,
  LOWER_VALUE,
} from '@appUtil/common.protocols';

@Component({
  selector: 'app-upload-receipt-details',
  templateUrl: './upload-receipt-details.component.html',
  styleUrls: ['./upload-receipt-details.component.scss'],
})
export class UploadReceiptDetailsComponent {
  orderOptions: Array<DropListOption> = [
    {
      value: '1',
      label: HIGHER_VALUE,
    },
    {
      value: '2',
      label: LOWER_VALUE,
    },
  ];
  searchTerm: string;
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  receipts = [
    {
      Index: 1,
      selected: false,
      AR: 'AR-120821-2189',
      date: DEFAULT_DATE,
      od: 'OD-120821-3554',
      amount: 200000,
      pzas: 10,
    },
    {
      Index: 2,
      selected: false,
      AR: 'AR-120821-2189',
      date: DEFAULT_DATE,
      od: 'OD-120821-3554',
      amount: 200000,
      pzas: 10,
    },
    {
      Index: 3,
      selected: false,
      AR: 'AR-120821-2189',
      date: DEFAULT_DATE,
      od: 'OD-120821-3554',
      amount: 200000,
      pzas: 10,
    },
    {
      Index: 4,
      selected: true,
      AR: 'AR-120821-2189',
      date: DEFAULT_DATE,
      od: 'OD-120821-3554',
      amount: 200000,
      pzas: 10,
    },
    {
      Index: 5,
      selected: false,
      AR: 'AR-120821-2189',
      date: DEFAULT_DATE,
      od: 'OD-120821-3554',
      amount: 200000,
      pzas: 10,
    },
  ];
  receiptsResults = [];

  selectFilterByType(dataByTypeSelected: DropListOption): void {}

  changeSearchTerm(searchTerm: string): void {}
}
