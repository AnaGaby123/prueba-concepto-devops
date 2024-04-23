/* Models Imports */
import {
  initialIPlanDispatchList,
  IPlanDispatchList,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {
  initialIPlanDispatchDetails,
  IPlanDispatchDetails,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';

export const TITLE_PLAN_DISPATCH = 'PLANIFICAR DESPACHO';

export interface IPlanDispatchState {
  title: string;
  detailsMode: boolean;
  allowedToDetails: boolean;
  stepsMode: boolean;
  allowedToSteps: boolean;
  planDispatchList: IPlanDispatchList;
  planDispatchDetails: IPlanDispatchDetails;
}

export const initialIPlanDispatchState = (): IPlanDispatchState => ({
  title: TITLE_PLAN_DISPATCH,
  detailsMode: false,
  allowedToDetails: false,
  stepsMode: false,
  allowedToSteps: false,
  planDispatchList: initialIPlanDispatchList(),
  planDispatchDetails: initialIPlanDispatchDetails(),
});
