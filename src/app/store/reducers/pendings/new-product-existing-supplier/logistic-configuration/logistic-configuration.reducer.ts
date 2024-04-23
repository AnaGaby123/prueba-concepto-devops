import {createReducer, on} from '@ngrx/store';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration';

import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

import {map} from 'lodash-es';
import {buildStringFamily} from '@appUtil/strings';
import {ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj} from 'api-catalogos';
import {
  IFamilyLogisticConfiguration,
  ILogisticConfigurationDetailsState,
  initialLogisticConfigurationDetailsState,
  IOfferDeliveryRoutes,
} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

export const logisticConfigurationDetailsReducer = createReducer(
  initialLogisticConfigurationDetailsState(),
  on(
    logisticConfigurationDetailsActions.SET_SEARCH_TERM,
    (state: ILogisticConfigurationDetailsState, {searchTerm}) => ({
      ...state,
      searchTerm,
      familiesList: [],
      selectedFamily: null,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.SET_FILTER_SELECTED,
    (state: ILogisticConfigurationDetailsState, {filters}): ILogisticConfigurationDetailsState => ({
      ...state,
      filters,
      familiesList: [],
      selectedFamily: null,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.SET_SELECTED_FAMILY,
    (
      state: ILogisticConfigurationDetailsState,
      {selectedFamily},
    ): ILogisticConfigurationDetailsState => ({
      ...state,
      familiesList: map(
        state.familiesList,
        (o: IFamilyLogisticConfiguration): IFamilyLogisticConfiguration => {
          if (
            selectedFamily.IdCotPartidaCotizacionInvestigacion ===
            o.IdCotPartidaCotizacionInvestigacion
          ) {
            return {
              ...o,
              isSelected: true,
            };
          } else if (
            state.selectedFamily?.IdCotPartidaCotizacionInvestigacion ===
            o.IdCotPartidaCotizacionInvestigacion
          ) {
            return {...state.selectedFamily, isSelected: false};
          }

          return {...o, isSelected: false};
        },
      ),
      selectedFamily,
      apiStatusDetails: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.CHANGE_LOADING_API_STATUS,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      apiStatusDashboard: API_REQUEST_STATUS_LOADING,
      apiStatusDetails: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.CHANGE_SUCCESS_API_STATUS,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      apiStatusDashboard: API_REQUEST_STATUS_SUCCEEDED,
      apiStatusDetails: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_SUCCESS,
    (
      state: ILogisticConfigurationDetailsState,
      {logisticItems},
    ): ILogisticConfigurationDetailsState => ({
      ...state,
      familiesList: map(logisticItems, (o: IFamilyLogisticConfiguration, index: number) => ({
        ...o,
        fullFamilyName: buildStringFamily(
          o.CatTipoProductoNombre,
          o.CatSubTipoProductoNombre,
          o.CatControlNombre,
          ' · ',
        ),
        needsToReloadInfo: true,
        isSelected: index === 0 ? true : false,
      })),
      selectedFamily: {
        ...logisticItems[0],
        fullFamilyName: buildStringFamily(
          logisticItems[0].CatTipoProductoNombre,
          logisticItems[0].CatSubTipoProductoNombre,
          logisticItems[0].CatControlNombre,
          ' · ',
        ),
        needsToReloadInfo: true,
        isSelected: true,
      },
      apiStatusDashboard: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_FAILED,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      apiStatusDashboard: API_REQUEST_STATUS_FAILED,
    }),
  ),

  on(
    logisticConfigurationDetailsActions.FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_SUCCESS,
    (
      state: ILogisticConfigurationDetailsState,
      {familyDetails},
    ): ILogisticConfigurationDetailsState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        needsToReloadInfo: false,
        detailsConfiguration: map(
          familyDetails,
          (o: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj) => {
            return {
              ...o,
              IdValorConfiguracionTiempoEntrega: o.ValorConfiguracionTiempoEntrega
                ?.IdValorConfiguracionTiempoEntrega
                ? o.ValorConfiguracionTiempoEntrega?.IdValorConfiguracionTiempoEntrega
                : null,
              isSelected: o.catRutaEntrega.Orden === 1,
            };
          },
        ),
        detailConfigurationBackup: map(
          familyDetails,
          (o: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj) => {
            return {
              ...o,
              IdValorConfiguracionTiempoEntrega: o.ValorConfiguracionTiempoEntrega
                ?.IdValorConfiguracionTiempoEntrega
                ? o.ValorConfiguracionTiempoEntrega?.IdValorConfiguracionTiempoEntrega
                : null,
              isSelected: o.catRutaEntrega.Orden === 1,
            };
          },
        ),
      },
      apiStatusDetails: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_FAILED,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      apiStatusDetails: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_SUCCESS_WITHOUT_RESULTS,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      apiStatusDashboard: API_REQUEST_STATUS_SUCCEEDED,
      apiStatusDetails: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  //DOCS: ACTIONS DE LA CONIFGURACIÓN
  // on(
  //   logisticConfigurationDetailsActions.FETCH_DELIVERY_ROUTE_LOGISTIC_CONFIGURATION_SUCCESS,
  //   (
  //     state: ILogisticConfigurationDetailsState,
  //     {deliveryRoutesList},
  //   ): ILogisticConfigurationDetailsState => ({
  //     ...state,
  //      catDeliveryRoutes: deliveryRoutesList,
  //   }),
  // ),
  on(
    logisticConfigurationDetailsActions.SET_SELECTED_DELIVERY_ROUTE,
    (state: ILogisticConfigurationDetailsState, {deliveryRouteId}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        detailsConfiguration: map(
          state.selectedFamily.detailsConfiguration,
          (o: IOfferDeliveryRoutes) => {
            if (o.IdCatRutaEntrega === deliveryRouteId) {
              return {...o, isSelected: true};
            } else {
              return {...o, isSelected: false};
            }
          },
        ),
      },
    }),
  ),
  on(
    logisticConfigurationDetailsActions.SET_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE,
    (state: ILogisticConfigurationDetailsState, {field, value}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        detailsConfiguration: map(
          state.selectedFamily.detailsConfiguration,
          (o: IOfferDeliveryRoutes) => {
            if (o.isSelected) {
              return {
                ...o,
                [field]: value,
              };
            }
            return {...o};
          },
        ),
      },
    }),
  ),
  on(
    logisticConfigurationDetailsActions.SHOW_POP_UP,
    (state: ILogisticConfigurationDetailsState, {value}): ILogisticConfigurationDetailsState => ({
      ...state,
      isActivePopUp: value,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.RESTORE_BACKUP_SELECTED_FAMILY,
    (state: ILogisticConfigurationDetailsState): ILogisticConfigurationDetailsState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        detailsConfiguration: state.selectedFamily.detailConfigurationBackup,
      },
    }),
  ),
  on(
    logisticConfigurationDetailsActions.SET_PRESELECTED_FAMILY,
    (
      state: ILogisticConfigurationDetailsState,
      {preSelectedFamily},
    ): ILogisticConfigurationDetailsState => ({
      ...state,
      preSelectedFamily,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE_SUCCESS,
    (state: ILogisticConfigurationDetailsState, {family}): ILogisticConfigurationDetailsState => ({
      ...state,
      selectedFamily: family,
    }),
  ),
  on(
    logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC_SUCCESS,
    (state: ILogisticConfigurationDetailsState) => initialLogisticConfigurationDetailsState(),
  ),
  on(logisticConfigurationDetailsActions.CLEAN_DATA, (state: ILogisticConfigurationDetailsState) =>
    initialLogisticConfigurationDetailsState(),
  ),
);
