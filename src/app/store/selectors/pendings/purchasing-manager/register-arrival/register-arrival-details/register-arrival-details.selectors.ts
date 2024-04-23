/* Selectors Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectRegisterArrivalDetails} from '@appSelectors/pendings/purchasing-manager/register-arrival/register-arrival.selectors';
import {selectUser} from '@appSelectors/auth/auth.selectors';

/* Models Imports */
import {
  IBarcodeComponent,
  IDispatchOder,
  IProvidersPiecesArrived,
  IRegisterArrivalDetails,
  IStepsComponent,
  ITotalsPiecesArrived,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';
import {IFile} from '@appModels/files/files.models';
import {QueryInfo} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {UserInfo} from '@appModels/auth/user-info.model';
import {SistemaUsuariosAccessosService} from 'api-catalogos';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

/* Dev Tools Imports */
import {filter, sumBy} from 'lodash-es';

export const selectBarcodeComponent = createSelector(
  selectRegisterArrivalDetails,
  (state: IRegisterArrivalDetails) => state.barcodeComponent,
);
export const selectStepComponent = createSelector(
  selectRegisterArrivalDetails,
  (state: IRegisterArrivalDetails) => state.stepsComponent,
);
export const selectAllowedToBarcode = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.allowedToBarcode,
);
export const selectAllowedToSteps = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.allowedToSteps,
);
export const selectSteps = createSelector(
  selectStepComponent,
  (state: IStepsComponent) => state.steps,
);
export const selectStepSelected = createSelector(
  selectStepComponent,
  (state: IStepsComponent) => state.stepSelected,
);
export const selectImagesLoaded = createSelector(
  selectStepComponent,
  (state: IStepsComponent) => state.packageImages,
);
export const selectCurrentStep = createSelector(selectStepSelected, (currentStep: number) =>
  currentStep === 0
    ? 'openPackage'
    : currentStep === 1
    ? 'pieces-arrived'
    : currentStep === 2
    ? 'fingerprint-scan'
    : null,
);
export const validateAdvanceNextStep = createSelector(
  [selectCurrentStep, selectImagesLoaded, selectStepComponent],
  (currentStep: string, imagesLoaded: Array<IFile>, stepsComponent: IStepsComponent) => {
    if (currentStep === 'openPackage') {
      return imagesLoaded.length > 0;
    } else if (currentStep === 'pieces-arrived') {
      return (
        stepsComponent.providersWithItemsStatus !== API_REQUEST_STATUS_DEFAULT &&
        stepsComponent.providersWithItemsStatus !== API_REQUEST_STATUS_LOADING
      );
    } else {
      return false;
    }
  },
);
export const selectOrderOptions = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.dataByType,
);
export const selectOrderSelected = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.dataByTypeSelected,
);
export const selectSearchTerm = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.searchTerm,
);
export const selectNeedsToReloadDispatchOrders = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.needsToReloadDispatchOrders,
);
export const queryInfoDispatchOrders = createSelector(
  [selectBarcodeComponent, selectSearchTerm, selectOrderSelected],
  (barcodeComponent: IBarcodeComponent, searchTerm: string, order: DropListOption) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];

    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'NombreExportador',
        ValorFiltro: barcodeComponent.porterSelected.NombreExportador,
      },
    ];

    if (searchTerm !== '') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'GuiaDeEmbarque',
          ValorFiltro: searchTerm,
        },
      ];
    }

    queryInfo.SortField = 'MontoTotalUSD';
    queryInfo.SortDirection = order.value === '1' ? 'Desc' : 'Asc';

    return queryInfo;
  },
);
export const selectDispatchOrderstatus = createSelector(
  selectBarcodeComponent,
  (state: IBarcodeComponent) => state.dispatchOrdersStatus,
);
export const selectIsLoadingDispatchOrders = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) =>
    barcodeComponent.dispatchOrdersStatus === API_REQUEST_STATUS_DEFAULT ||
    barcodeComponent.dispatchOrdersStatus === API_REQUEST_STATUS_LOADING,
);
export const selectDispatchOrders = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.dispatchOrders,
);
export const selectDispatchOrderSelected = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => barcodeComponent.dispatchOrderSelected,
);
export const selectIsLoadingProvidersWithItems = createSelector(
  selectStepComponent,
  (stepComponent: IStepsComponent) =>
    stepComponent.providersWithItemsStatus === API_REQUEST_STATUS_DEFAULT ||
    stepComponent.providersWithItemsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectNeedsToReloadProvidersWithItems = createSelector(
  selectStepComponent,
  (stepComponent: IStepsComponent) => stepComponent.providersWithItemsNeedsToReload,
);
export const selectQueryProvidersWithItems = createSelector(
  selectBarcodeComponent,
  (barcodeComponent: IBarcodeComponent) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];

    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'NombreExportador',
        ValorFiltro: barcodeComponent.porterSelected?.NombreExportador,
      },
      {
        NombreFiltro: 'IdImpOrdenDespacho',
        ValorFiltro: barcodeComponent.dispatchOrderSelected?.IdImpOrdenDespacho,
      },
    ];

    return queryInfo;
  },
);
export const selectProvidersWithItems = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.providersWithItems,
);
export const selectPackingListObjs = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.packingListObj,
);
export const selectTotals = createSelector(
  selectProvidersWithItems,
  (providersWithItems: Array<IProvidersPiecesArrived>) => {
    const toArrived = sumBy(providersWithItems, 'PiezasPorArribar');
    const arrived = sumBy(providersWithItems, 'arrived');

    const totals: ITotalsPiecesArrived = {
      toArrived,
      arrived,
      missing: toArrived > arrived ? `-${toArrived - arrived}` : 0,
      surplus: arrived > toArrived ? `+${arrived - toArrived}` : 0,
    };

    return totals;
  },
);
export const selectCodeSecurityGuard = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.codeSecurityGuard,
);
export const selectShakedSecurityGuard = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.shakedSecurityGuard,
);
export const selectCodeIsFillSecurityGuard = createSelector(
  selectCodeSecurityGuard,
  (code: Array<number>) => filter(code, (o) => o !== null).length === 4,
);
export const selectCodeIsEmptySecurityGuard = createSelector(
  selectCodeSecurityGuard,
  (code: Array<number>) => filter(code, (o) => o === null).length === 4,
);
export const selectCodeSecurityGuardIsValid = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.codeSecurityGuardIsValid,
);
export const selectAuthorizationRequestChangeSecurity = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.authorizationRequestChangeSecurity,
);
export const selectCodeBuyer = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.codeBuyer,
);
export const selectShakedBuyer = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.shakedBuyer,
);
export const selectCodeIsFillBuyer = createSelector(
  selectCodeBuyer,
  (code: Array<number>) => filter(code, (o) => o !== null).length === 4,
);
export const selectCodeIsEmptyBuyer = createSelector(
  selectCodeBuyer,
  (code: Array<number>) => filter(code, (o) => o === null).length === 4,
);
export const selectCodeBuyerIsValid = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.codeBuyerIsValid,
);
export const selectAuthorizationRequestChangeBuyer = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) => stepsComponent.authorizationRequestChangeBuyer,
);
export const selectCodesAreValid = createSelector(
  selectStepComponent,
  (stepsComponent: IStepsComponent) =>
    stepsComponent.codeBuyerIsValid && stepsComponent.codeSecurityGuardIsValid,
);
export const selectObjCodes = createSelector(
  [selectUser, selectDispatchOrderSelected],
  (user: UserInfo, dispatchOrderSelected: IDispatchOder) => {
    const requestAuthorizationChange: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams = {
      tipoDeMovimiento: 'RegistrarArribo',
      idUsuarioSolicitaAutorizacion: user.IdUsuario,
      IdImpOrdenDespacho: dispatchOrderSelected.IdImpOrdenDespacho,
    };

    return requestAuthorizationChange;
  },
);
