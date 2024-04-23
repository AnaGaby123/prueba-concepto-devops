import {
  IDeclareArrivalGuide,
  initialIDeclareArrivalGuide,
} from '@appModels/store/pendings/material receiver/declare-arrival-guide/declare-arrival-guide.models';

export interface IMaterialReceiver {
  declareArrivalGuide: IDeclareArrivalGuide;
}

export const initialIMaterialReceiver = (): IMaterialReceiver => ({
  declareArrivalGuide: initialIDeclareArrivalGuide(),
});
