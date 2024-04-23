import {Component, Input} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-item-labware',
  templateUrl: './item-labware.component.html',
  styleUrls: ['./item-labware.component.scss'],
})
export class ItemLabwareComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() family: string;
  readonly purchaseRestrictions = PurchaseRestrictions;

  isValidLimitOfPieces(restriction: string): boolean {
    return restriction === this.purchaseRestrictions.limitOfPieces;
  }
}
