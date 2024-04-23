/* Models Imports */
import {
  IConfirmDispatchList,
  initialIConfirmDispatchList,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {
  IConfirmDispatchDetails,
  initialIConfirmDispatchDetails,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';

export const TITLE_CONFIRM_DISPATCH = 'Confirmar Despacho';

export interface IConfirmDispatch {
  title: string;
  confirmDispatchList: IConfirmDispatchList;
  confirmDispatchDetails: IConfirmDispatchDetails;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
}

export const initialIConfirmDispatch = (): IConfirmDispatch => ({
  title: TITLE_CONFIRM_DISPATCH,
  confirmDispatchList: initialIConfirmDispatchList(),
  confirmDispatchDetails: initialIConfirmDispatchDetails(),
  allowedToDetails: false,
  isInDetailsView: false,
});
