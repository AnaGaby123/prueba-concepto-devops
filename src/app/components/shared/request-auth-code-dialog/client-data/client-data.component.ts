import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss'],
})
export class ClientDataComponent {
  @Input() customerName: string;
  @Input() purchaseOrder: string;
  @Input() paymentConditions: string;

  constructor() {}
}
