/* Models Imports */
import {
  ICheckOcNotArrivedList,
  initialICheckOcNotArrivedList,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';
import {
  ICheckOcNotArrivedDetails,
  initialICheckOcNotArrivedDetails,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';

export const TITLE_OC_NOT_ARRIVED = 'Monitorear oc no arribada';

export interface ICheckOcNotArrived {
  title: string;
  checkOcNotArrivedList: ICheckOcNotArrivedList;
  checkOcNotArrivedDetails: ICheckOcNotArrivedDetails;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
}

export const initialICheckOcNotArrived = (): ICheckOcNotArrived => ({
  title: TITLE_OC_NOT_ARRIVED,
  checkOcNotArrivedList: initialICheckOcNotArrivedList(),
  checkOcNotArrivedDetails: initialICheckOcNotArrivedDetails(),
  allowedToDetails: false,
  isInDetailsView: false,
});
