/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

import {
  IDispatchMonitoringDetails,
  IGuidesDispatchMonitoring,
  initialDispatchMonitoringDetails,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';
import {dispatchMonitoringDetailsActions} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {filter, isEmpty, map} from 'lodash-es';

const initialDispatchMonitoringList: IDispatchMonitoringDetails = {
  ...initialDispatchMonitoringDetails(),
};

export const dispatchMonitoringDetailsReducer: ActionReducer<IDispatchMonitoringDetails> = createReducer(
  initialDispatchMonitoringList,
  on(
    dispatchMonitoringDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IDispatchMonitoringDetails => ({
      ...initialDispatchMonitoringDetails(),
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.SET_PROVIDER_SELECTED,
    (state: IDispatchMonitoringDetails, {providerSelected}): IDispatchMonitoringDetails => ({
      ...state,
      providerSelected,
    }),
  ),
  on(dispatchMonitoringDetailsActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    tabSelected: tab,
  })),
  on(
    dispatchMonitoringDetailsActions.SET_SEARCH_TERM,
    (state: IDispatchMonitoringDetails, {searchTerm}) => ({
      ...state,
      searchTerm,
    }),
  ),
  on(dispatchMonitoringDetailsActions.FETCH_GUIDES_LOAD, (state: IDispatchMonitoringDetails) => ({
    ...state,
    guidesStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    dispatchMonitoringDetailsActions.FETCH_GUIDES_SUCCESS,
    (state: IDispatchMonitoringDetails, {guides}) => ({
      ...state,
      guides,
      guidesStatus: API_REQUEST_STATUS_SUCCEEDED,
      needsToReloadGuides: false,
      guideSelected: guides.length > 0 ? guides[0] : ({} as IGuidesDispatchMonitoring),
    }),
  ),
  on(dispatchMonitoringDetailsActions.FETCH_GUIDES_FAILED, (state: IDispatchMonitoringDetails) => ({
    ...state,
    guidesStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(
    dispatchMonitoringDetailsActions.SET_GUIDE_SELECTED,
    (state: IDispatchMonitoringDetails, {index}): IDispatchMonitoringDetails => ({
      ...state,
      guides: map(state.guides, (o: IGuidesDispatchMonitoring) => {
        if (o.Index === state.guideSelected.Index) {
          return {
            ...state.guideSelected,
            isSelected: o.Index === parseInt(index, 10),
          };
        } else if (o.Index === parseInt(index, 10)) {
          return {
            ...o,
            isSelected: true,
            guiaCancelacion: {
              ...state.guideSelected.guiaCancelacion,
            },
            guiaImpactoFee: {
              ...state.guideSelected.guiaImpactoFee,
            },
            guideConfirm: {
              ...state.guideSelected.guideConfirm,
            },
          };
        }
        return {...o, isSelected: false};
      }),
      guideSelected: filter(
        state.guides,
        (o: IGuidesDispatchMonitoring) => o.Index === parseInt(index, 10),
      )[0],
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.FETCH_ITEMS_SUCCESS,
    (state: IDispatchMonitoringDetails, {items}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        items,
        itemsNeedsToReload: false,
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.SET_ITEMS_STATUS,
    (state: IDispatchMonitoringDetails, {itemsStatus}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        itemsStatus,
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.SET_GUIDES_STATUS,
    (state: IDispatchMonitoringDetails, {guidesStatus}): IDispatchMonitoringDetails => ({
      ...state,
      guidesStatus,
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.CHECK_CANCEL_ITEMS,
    (state: IDispatchMonitoringDetails, {active}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        cancelConfig: active,
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.CHECK_IMPACT_ITEMS,
    (state: IDispatchMonitoringDetails, {active}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        withImpactFeeConfig: active,
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.CHECK_CONFIRM_ITEMS,
    (state: IDispatchMonitoringDetails, {active}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        confirmedConfig: active,
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.ACCEPT_CANCEL_GUIDE,
    (state: IDispatchMonitoringDetails, {value}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        guiaCancelacion: {
          ...state.guideSelected.guiaCancelacion,
          Justificacion: value,
        },
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.ACCEPT_IMPORT_FEE_GUIDE,
    (state: IDispatchMonitoringDetails, {FEA, justificacion}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        guiaImpactoFee: {
          ...state.guideSelected.guiaImpactoFee,
          FEA,
          Justificacion: justificacion,
        },
      },
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.SET_FEE_FILE,
    (state: IDispatchMonitoringDetails, {file}): IDispatchMonitoringDetails => ({
      ...state,
      guideSelected: {
        ...state.guideSelected,
        file,
      },
    }),
  ),
  on(dispatchMonitoringDetailsActions.REFRESH_GUIDES, (state: IDispatchMonitoringDetails) => ({
    ...state,
    guidesStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadGuides: true,
  })),
  on(
    dispatchMonitoringDetailsActions.SET_PROVIDER_CONTACT,
    (state: IDispatchMonitoringDetails, {contacts}): IDispatchMonitoringDetails => ({
      ...state,
      providerContacts: contacts,
      selectedProviderContact: !isEmpty(contacts)
        ? {
            label:
              contacts[0].Nombres +
              ' ' +
              contacts[0].ApellidoPaterno +
              ' ' +
              contacts[0].ApellidoMaterno,
            value: contacts[0].IdContactoProveedor,
          }
        : null,
    }),
  ),
  on(
    dispatchMonitoringDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IDispatchMonitoringDetails, {contactSelected}): IDispatchMonitoringDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
