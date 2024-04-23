import {
  initialIPurchasePromiseList,
  IPurchasePromiseList,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
import {
  initialPurchasePromiseDetailsState,
  IPurchasePromiseDetailsState,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';

export const TITLE_OFFER_ADJUSTMENT = 'Atender promesa de compra';

export interface IPurchasePromiseState {
  title: string;
  allowedToDetailsView: boolean;
  isInDetailsView: boolean;
  purchasePromiseList: IPurchasePromiseList;
  purchasePromiseDetails: IPurchasePromiseDetailsState;
}

export const initialPurchasePromiseState = (): IPurchasePromiseState => ({
  title: TITLE_OFFER_ADJUSTMENT,
  allowedToDetailsView: false,
  isInDetailsView: false,
  purchasePromiseList: initialIPurchasePromiseList(),
  purchasePromiseDetails: initialPurchasePromiseDetailsState(),
});
