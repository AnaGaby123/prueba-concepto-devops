import {
  IFollowPPromiseList,
  initialFollowPPromiseList,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {
  IFollowPPromiseDetails,
  initialIFollowPPromiseDetails,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';

export const TITLE_FOLLOW_PURCHASE_PROMISE = 'Atender seguimiento a promesa de compra';

export interface IFollowPurchasePromiseState {
  title: string;
  allowToDetailsView: boolean;
  isInDetailsView: boolean;
  followPPromiseList: IFollowPPromiseList;
  followPPromiseDetails: IFollowPPromiseDetails;
}

export const initialFollowPurchasePromiseState = (): IFollowPurchasePromiseState => ({
  title: TITLE_FOLLOW_PURCHASE_PROMISE,
  allowToDetailsView: false,
  isInDetailsView: false,
  followPPromiseList: initialFollowPPromiseList(),
  followPPromiseDetails: initialIFollowPPromiseDetails(),
});
