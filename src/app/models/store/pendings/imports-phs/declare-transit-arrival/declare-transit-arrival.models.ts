import {
  IDeclareTransitArrivalDetails,
  initialIDeclareTransitArrivalDetails,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.models';
import {
  IDeclareTransitArrivalList,
  initialIDeclareTransitArrivalList,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.models';

export const TITLE_DECLARE_TRANSIT_ARRIVAL = 'DECLARAR ARRIBO TRÁNSITO';

export interface IDeclareTransitArrival {
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
  declareTransitArrivalList: IDeclareTransitArrivalList;
  declareTransitArrivalDetails: IDeclareTransitArrivalDetails;
}

export const initialIDeclareTransitArrival = (): IDeclareTransitArrival => ({
  title: TITLE_DECLARE_TRANSIT_ARRIVAL,
  allowedToDetails: false,
  isInDetailsView: false,
  declareTransitArrivalList: initialIDeclareTransitArrivalList(),
  declareTransitArrivalDetails: initialIDeclareTransitArrivalDetails(),
});
