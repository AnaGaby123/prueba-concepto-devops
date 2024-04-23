import {
  IPurchasePromiseQuotation,
  IQuoteItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {GMCotFletes} from 'api-logistica';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface QuoteItemExtension {
  quote?: IQuoteItem;
  isSelectedPurchase?: boolean;
  freightItem?: IFreightItem;
  quotation?: IPurchasePromiseQuotation;
  imageHover?: string;
  freightsGmCotFletes?: GMCotFletes;
}
