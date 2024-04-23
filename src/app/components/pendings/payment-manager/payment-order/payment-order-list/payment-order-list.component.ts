import {Component} from '@angular/core';
import {IChip} from '@appModels/chip/chip';

@Component({
  selector: 'app-payment-order-list',
  templateUrl: './payment-order-list.component.html',
  styleUrls: ['./payment-order-list.component.scss'],
})
export class PaymentOrderListComponent {
  chips: Array<IChip> = [
    {
      value: '',
      label: 'SEMANA 1',
      total: 55000,
      active: true,
      disable: false,
      color: '#008894',
      colorDefault: '#c2c3c9',
    },
    {
      value: '',
      label: 'SEMANA 2',
      total: 55000,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#c2c3c9',
    },
  ];
  validateRed = false;
  validateGreen = false;
}
