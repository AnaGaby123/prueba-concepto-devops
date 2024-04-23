/* Models Imports */
import {
  initialIProductToClaimList,
  IProductToClaimList,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.models';
import {
  initialIProductToClaimDetails,
  IProductToClaimDetails,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.models';

export const TITLE_PRODUCT_TO_CLAIM = 'PRODUCTO A RECLAMO';

export interface IProductToClaim {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  productToClaimList: IProductToClaimList;
  productToClaimDetails: IProductToClaimDetails;
}

export const initialIProductToClaim = (): IProductToClaim => ({
  title: TITLE_PRODUCT_TO_CLAIM,
  detailsMode: false,
  allowToDetails: false,
  productToClaimList: initialIProductToClaimList(),
  productToClaimDetails: initialIProductToClaimDetails(),
});
