/* Models Imports */
import {
  initialIRegisterDispatchList,
  IRegisterDispatchList,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {
  initialIRegisterDispatchDetails,
  IRegisterDispatchDetails,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';

export const TITLE_REGISTER_DISPATCH = 'REGISTRAR DESPACHO';

export interface IRegisterDispatchState {
  title: string;
  detailsMode: boolean;
  allowedToDetails: boolean;
  registerDispatchList: IRegisterDispatchList;
  registerDispatchDetails: IRegisterDispatchDetails;
}

export const initialIRegisterDispatchState = (): IRegisterDispatchState => ({
  title: TITLE_REGISTER_DISPATCH,
  detailsMode: false,
  allowedToDetails: false,
  registerDispatchList: initialIRegisterDispatchList(),
  registerDispatchDetails: initialIRegisterDispatchDetails(),
});
