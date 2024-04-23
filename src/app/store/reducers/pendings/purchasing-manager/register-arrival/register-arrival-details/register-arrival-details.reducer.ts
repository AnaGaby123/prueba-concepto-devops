/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIBarcodeComponent,
  initialIRegisterArrivalDetails,
  initialIStepsComponent,
  IProvidersPiecesArrived,
  IRegisterArrivalDetails,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';
import {OcPackingList} from 'api-logistica';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

/* Tools Imports */
import {map as _map} from 'lodash-es';

export const registerArrivalDetailsReducer: ActionReducer<IRegisterArrivalDetails> = createReducer(
  {...initialIRegisterArrivalDetails()},
  on(registerArrivalDetailsActions.SET_STEP_SELECTED, (state, {stepSelected}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      stepSelected,
    },
  })),
  on(registerArrivalDetailsActions.SET_ARRAY_IMAGES, (state, {packageImages}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      packageImages,
    },
  })),
  on(registerArrivalDetailsActions.SET_PORTER_SELECTED, (state, {porterSelected}) => ({
    ...state,
    barcodeComponent: {
      ...state.barcodeComponent,
      porterSelected,
      allowedToBarcode: true,
      isInBarcodeView: true,
    },
  })),
  on(registerArrivalDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    barcodeComponent: {
      ...state.barcodeComponent,
      searchTerm,
      needsToReloadDispatchOrders: true,
      dispatchOrdersStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(registerArrivalDetailsActions.SET_ORDER_SELECTED, (state, {dataByTypeSelected}) => ({
    ...state,
    barcodeComponent: {
      ...state.barcodeComponent,
      dataByTypeSelected,
      needsToReloadDispatchOrders: true,
      dispatchOrdersStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(registerArrivalDetailsActions.FETCH_DISPATCH_ORDERS_SUCCESS, (state, {dispatchOrders}) => ({
    ...state,
    barcodeComponent: {
      ...state.barcodeComponent,
      dispatchOrders,
      needsToReloadDispatchOrders: false,
      dispatchOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(
    registerArrivalDetailsActions.SET_DISPATCH_ORDER_SELECTED,
    (state, {dispatchOrderSelected}) => ({
      ...state,
      barcodeComponent: {
        ...state.barcodeComponent,
        dispatchOrderSelected,
      },
    }),
  ),
  on(registerArrivalDetailsActions.READ_BARCODE_SUCCESS, (state) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      allowedToSteps: true,
      isInStepsView: true,
    },
  })),
  on(registerArrivalDetailsActions.FETCH_STEP_ARRIVED_PIECES_DATA_LOAD, (state) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      providersWithItemsStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(
    registerArrivalDetailsActions.FETCH_STEP_ARRIVED_PIECES_DATA_SUCCESS,
    (state, {providersWithItems, packingListObj}) => ({
      ...state,
      stepsComponent: {
        ...state.stepsComponent,
        providersWithItems,
        providersWithItemsNeedsToReload: false,
        providersWithItemsStatus: API_REQUEST_STATUS_SUCCEEDED,
        packingListObj,
      },
    }),
  ),
  on(registerArrivalDetailsActions.FETCH_STEP_ARRIVED_PIECES_DATA_FAILED, (state) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      providersWithItemsStatus: API_REQUEST_STATUS_FAILED,
    },
  })),
  on(registerArrivalDetailsActions.SET_PROVIDER_IS_OPEN, (state, {IdOcPackingList}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      providersWithItems: _map(
        state.stepsComponent.providersWithItems,
        (pro: IProvidersPiecesArrived) => ({
          ...pro,
          isOpen: pro.IdOcPackingList === IdOcPackingList ? !pro.isOpen : false,
        }),
      ),
    },
  })),
  on(
    registerArrivalDetailsActions.SET_PIECES_ARRIVED_PROVIDER,
    (state, {pieces, IdOcPackingList}) => ({
      ...state,
      stepsComponent: {
        ...state.stepsComponent,
        providersWithItems: _map(
          state.stepsComponent.providersWithItems,
          (pro: IProvidersPiecesArrived) => ({
            ...pro,
            arrived: pro.IdOcPackingList === IdOcPackingList ? pieces : pro.arrived,
          }),
        ),
        packingListObj: _map(state.stepsComponent.packingListObj, (pro: OcPackingList) => ({
          ...pro,
          NumeroDePiezasArribadas:
            pro.IdOcPackingList === IdOcPackingList ? pieces : pro.NumeroDePiezasArribadas,
        })),
      },
    }),
  ),
  on(
    registerArrivalDetailsActions.SET_CODE_VALUE_BY_POSITION,
    (state, {position, value, name}) => ({
      ...state,
      stepsComponent: {
        ...state.stepsComponent,
        codeSecurityGuard:
          name === 'securityGuard'
            ? _map(state.stepsComponent.codeSecurityGuard, (o: number, index: number) => {
                if (position === index) {
                  return value;
                } else {
                  return o;
                }
              })
            : state.stepsComponent.codeSecurityGuard,
        codeBuyer:
          name === 'buyer'
            ? _map(state.stepsComponent.codeBuyer, (o: number, index: number) => {
                if (position === index) {
                  return value;
                } else {
                  return o;
                }
              })
            : state.stepsComponent.codeBuyer,
      },
    }),
  ),
  on(registerArrivalDetailsActions.SET_SHAKED, (state, {value, name}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      shakedSecurityGuard:
        name === 'securityGuard' ? value : state.stepsComponent.shakedSecurityGuard,
      shakedBuyer: name === 'buyer' ? value : state.stepsComponent.shakedBuyer,
    },
  })),
  on(registerArrivalDetailsActions.RESTORE_CODE_VALUE, (state, {name}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      codeSecurityGuard:
        name === 'securityGuard'
          ? [null, null, null, null]
          : state.stepsComponent.codeSecurityGuard,
      codeBuyer: name === 'buyer' ? [null, null, null, null] : state.stepsComponent.codeBuyer,
    },
  })),
  on(registerArrivalDetailsActions.SET_AUTHORIZED_CODE_IS_VALID, (state, {name}) => ({
    ...state,
    stepsComponent: {
      ...state.stepsComponent,
      codeSecurityGuardIsValid:
        name === 'securityGuard' ? true : state.stepsComponent.codeSecurityGuardIsValid,
      codeBuyerIsValid: name === 'buyer' ? true : state.stepsComponent.codeBuyerIsValid,
    },
  })),
  on(
    registerArrivalDetailsActions.FETCH_VERIFICATION_CODES_SUCCESS,
    (state, {authorizationRequestChangeSecurity, authorizationRequestChangeBuyer}) => ({
      ...state,
      stepsComponent: {
        ...state.stepsComponent,
        authorizationRequestChangeSecurity,
        authorizationRequestChangeBuyer,
      },
    }),
  ),
  on(registerArrivalDetailsActions.RESET_DETAILS_VIEWS, (state) => ({
    ...state,
    barcodeComponent: {
      ...initialIBarcodeComponent(),
    },
    stepsComponent: {
      ...initialIStepsComponent(),
    },
  })),
  on(registerArrivalDetailsActions.RESET_STEPS_COMPONENT, (state) => ({
    ...state,
    stepsComponent: {
      ...initialIStepsComponent(),
    },
  })),
);
