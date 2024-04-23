/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';
/* Model Imports */
import {
  IGuideClientList,
  initialIGuideClientList,
} from '@appModels/store/pendings/guide-client/guide-client/guide-client-list/guide-client-list.models';
/* Actions Imports */
import {guideClientListActions} from '@appActions/pendings/guide-client/guide-client';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

const initialGuideClientList: IGuideClientList = {
  ...initialIGuideClientList(),
};
export const guideClientListReducer: ActionReducer<IGuideClientList> = createReducer(
  initialGuideClientList,
  on(guideClientListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    clientStatus: API_REQUEST_STATUS_LOADING,
    clientsNeedsToReload: true,
  })),
  on(guideClientListActions.SET_FREIGHT_SELECTED, (state, {value}) => ({
    ...state,
    selectedFreightOption: value,
  })),
  on(guideClientListActions.SET_GUIDE_NUMBER, (state, {guideNumber}) => ({
    ...state,
    guideNumber,
  })),
);
