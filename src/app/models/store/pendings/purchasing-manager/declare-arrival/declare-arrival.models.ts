import {
  IDeclareArrivalList,
  initialIDeclareArrivalList,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {
  IDeclareArrivalDetails,
  initialIDeclareArrivalDetails,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';

export const TITLE_DECLARE_ARRIVAL = 'Declarar arribo';

export interface IDeclareArrival {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  declareArrivalList: IDeclareArrivalList;
  declareArrivalDetails: IDeclareArrivalDetails;
}

export const initialIDeclareArrival = (): IDeclareArrival => ({
  title: TITLE_DECLARE_ARRIVAL,
  detailsMode: false,
  allowToDetails: false,
  declareArrivalList: initialIDeclareArrivalList(),
  declareArrivalDetails: initialIDeclareArrivalDetails(),
});
