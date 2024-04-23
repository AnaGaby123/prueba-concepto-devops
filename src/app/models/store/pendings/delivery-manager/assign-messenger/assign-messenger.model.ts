import {
  IAssignMessengerCharts,
  initialIAssignMessengerCharts,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger-charts/assign-messenger-charts.model';
import {
  IAssignMessengerDetails,
  initialIAssignMessengerDetails,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger-details/assign-messenger-details.model';

export const TITLE_ASSIGN_MESSENGER = 'ASIGNAR MENSAJERO';

export interface IAssignMessenger {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  assignMessengerCharts: IAssignMessengerCharts;
  assignMessengerDetails: IAssignMessengerDetails;
}

export const initialIAssignMessenger = (): IAssignMessenger => ({
  title: TITLE_ASSIGN_MESSENGER,
  detailsMode: false,
  allowToDetails: false,
  assignMessengerCharts: initialIAssignMessengerCharts(),
  assignMessengerDetails: initialIAssignMessengerDetails(),
});
