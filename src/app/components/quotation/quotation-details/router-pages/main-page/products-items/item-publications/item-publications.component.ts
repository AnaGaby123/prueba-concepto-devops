import {Component, Input} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {VProductoSuplementario} from 'api-catalogos';

@Component({
  selector: 'app-item-publications',
  templateUrl: './item-publications.component.html',
  styleUrls: ['./item-publications.component.scss'],
})
export class ItemPublicationsComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() family: string;
  @Input() selectsSupplementaryProducts: Array<VProductoSuplementario>;
}
