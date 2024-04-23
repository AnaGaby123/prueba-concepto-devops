/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnDeliveryRestrictions} from '@appModels/table/internal-sales-item';
import {PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-delivery-restrictions-item',
  templateUrl: './delivery-restrictions-item.component.html',
  styleUrls: ['./delivery-restrictions-item.component.scss'],
})
export class DeliveryRestrictionsItemComponent {
  @Input() columnDeliveryRestrictions: ColumnDeliveryRestrictions;
  readonly purchaseRestrictions = PurchaseRestrictions;
}
