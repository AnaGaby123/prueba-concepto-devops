/* Models Imports */
import {
  initialIRegisterArrivalList,
  IRegisterArrivalList,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {
  initialIRegisterArrivalDetails,
  IRegisterArrivalDetails,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';

export const TITLE_REGISTER_ARRIVAL = 'REGISTRAR ARRIBO';

export interface IRegisterArrival {
  title: string;
  detailsMode: boolean;
  registerArrivalList: IRegisterArrivalList;
  registerArrivalDetails: IRegisterArrivalDetails;
}

export const initialIRegisterArrival = (): IRegisterArrival => ({
  title: TITLE_REGISTER_ARRIVAL,
  detailsMode: false,
  registerArrivalList: initialIRegisterArrivalList(),
  registerArrivalDetails: initialIRegisterArrivalDetails(),
});
