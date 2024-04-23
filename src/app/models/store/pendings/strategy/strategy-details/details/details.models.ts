import {IOfferState} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';
import {
  IContentStrategyState,
  initialContentStrategyState,
} from '@appModels/store/pendings/strategy/strategy-details/details/sections/content-strategy.models';
import {initialOfferState} from '@appHelpers/pending/strategy/strategy.helpers';

export interface IDetailsState {
  contentStrategy: IContentStrategyState;
  offer: IOfferState;
}

export const initialDetailsState = (): IDetailsState => ({
  contentStrategy: initialContentStrategyState(),
  offer: initialOfferState(),
});
