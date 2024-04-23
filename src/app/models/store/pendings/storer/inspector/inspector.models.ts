import {
  IInspectorDashboard,
  initialIInspectorDashBoard,
} from '@appModels/store/pendings/storer/inspector/inspector-dashboard/inspector-dashboard.models';
import {
  IInspectorDetails,
  initialIInspectorDetails,
} from '@appModels/store/pendings/storer/inspector/inspector-details/inspector-details.models';

export const TITLE_INSPECTOR = 'INSPECCIONAR PRODUCTOS';

export interface IInspectorState {
  title: string;
  allowedToDetails: boolean;
  detailsMode: boolean;
  inspectorDashboard: IInspectorDashboard;
  inspectorDetails: IInspectorDetails;
}

export const initialIInspectorState = (): IInspectorState => ({
  title: TITLE_INSPECTOR,
  allowedToDetails: false,
  detailsMode: false,
  inspectorDashboard: initialIInspectorDashBoard(),
  inspectorDetails: initialIInspectorDetails(),
});
