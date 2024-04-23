import {Component, Input} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-item-biologic',
  templateUrl: './item-biologic.component.html',
  styleUrls: ['./item-biologic.component.scss'],
})
export class ItemBiologicComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() currency: string;
  @Input() family: string;
  readonly purchaseRestrictions = PurchaseRestrictions;

  isValidLimitOfPieces(restriction: string): boolean {
    return restriction === this.purchaseRestrictions.limitOfPieces;
  }
}
