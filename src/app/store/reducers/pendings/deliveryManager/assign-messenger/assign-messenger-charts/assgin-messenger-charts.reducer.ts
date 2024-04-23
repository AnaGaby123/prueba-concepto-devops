/* Store Imports */
import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IAssignMessengerCharts,
  initialIAssignMessengerCharts,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger-charts/assign-messenger-charts.model';

export const assignMessengerChartsReducer: ActionReducer<IAssignMessengerCharts> = createReducer(
  initialIAssignMessengerCharts(),
);
