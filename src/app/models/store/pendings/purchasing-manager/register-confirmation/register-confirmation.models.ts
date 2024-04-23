import {
  initialIRegisterConfirmationList,
  IRegisterConfirmationList,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {
  initialIRegisterConfirmationDetails,
  IRegisterConfirmationDetails,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';

export const TITLE_REGISTER_CONFIRMATION = 'REGISTRAR CONFIRMACIÓN';

export interface IRegisterConfirmation {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  registerConfirmationList: IRegisterConfirmationList;
  registerConfirmationDetails: IRegisterConfirmationDetails;
}

export const initialIRegisterConfirmation = (): IRegisterConfirmation => ({
  title: TITLE_REGISTER_CONFIRMATION,
  detailsMode: false,
  allowToDetails: false,
  registerConfirmationList: initialIRegisterConfirmationList(),
  registerConfirmationDetails: initialIRegisterConfirmationDetails(),
});
