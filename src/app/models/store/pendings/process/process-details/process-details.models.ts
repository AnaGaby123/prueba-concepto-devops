import {initialQuotes} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

export interface ProcessDetailsState {
  clientSelected: any;
  quotes: any;
}

export const initialProcessDetailsState = (): ProcessDetailsState => ({
  clientSelected: {},
  quotes: initialQuotes(),
});
