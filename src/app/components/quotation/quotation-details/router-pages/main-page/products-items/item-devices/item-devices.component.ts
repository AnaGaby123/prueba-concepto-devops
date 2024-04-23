import {Component, Input} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-item-devices',
  templateUrl: './item-devices.component.html',
  styleUrls: ['./item-devices.component.scss'],
})
export class ItemDevicesComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() family: string;
  readonly purchaseRestrictions = PurchaseRestrictions;

  isValidLimitOfPieces(restriction: string): boolean {
    return restriction === this.purchaseRestrictions.limitOfPieces;
  }
}
