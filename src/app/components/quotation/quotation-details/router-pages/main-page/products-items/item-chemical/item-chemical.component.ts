import {Component, Input} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-item-chemical',
  templateUrl: './item-chemical.component.html',
  styleUrls: ['./item-chemical.component.scss'],
})
export class ItemChemicalComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() currency: string;
  @Input() family: string;
  readonly purchaseRestrictions = PurchaseRestrictions;

  constructor() {}

  isValidLimitOfPieces(restriction: string): boolean {
    return restriction === this.purchaseRestrictions.limitOfPieces;
  }
}
