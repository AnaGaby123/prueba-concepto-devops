/* Selectors Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectPlanDispatchDetails} from '@appSelectors/pendings/imports/plan-dispatch/plan-dispatch.selectors';

/* Models Imports */
import {
  IDispatchOrder,
  IGroupArrivalList,
  IPlanDispatchArrivalListTotals,
  IPlanDispatchDetails,
  IPlanDispatchSteps,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import {
  IPlanDispatchArrivalList,
  IProvider,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {
  Aduana,
  AgenteAduanal,
  CatIncoterm,
  Empresa,
  GroupQueryInfo,
  QueryInfo,
} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {
  selectListAduana,
  selectListAgenteAduanal,
  selectListIncoterm,
  selectvEmpresas,
} from '@appSelectors/catalogs/catalogs.selectors';

/* Utils Imports */
import {filter, flow, isEmpty, sumBy} from 'lodash-es';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export const selectSteps = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): Array<BarActivityOption> => state.steps,
);
export const selectStepSelected = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): number => state.selectedStep,
);
export const selectDispatchOrdersStatus = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): number => state.dispatchOrdersStatus,
);
export const selectDispatchOrdersList = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): Array<IDispatchOrder> => state.dispatchOrdersList,
);
export const selectStepsState = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): IPlanDispatchSteps => state.stepsState,
);
export const selectedDispatchOrder = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): IDispatchOrder => state.selectedDispatchOrder,
);
export const selectedNeedsToReloadProviders = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): boolean => state.needsToReloadProviders,
);
export const selectedProvidersWithoutDispatchOrder = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): Array<IProvider> => state?.providersList,
);
export const selectProvidersStep1Status = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): number => state?.providersStatus,
);
export const selectedStepsProvider = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): IProvider => state?.selectedProvider,
);
export const selectStep1ProvidersSearchTerm = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): string => state?.providersSearchTerm,
);
export const selectArrivalListStep1Status = createSelector(
  selectedStepsProvider,
  (state: IProvider): number => state?.arrivalListStatus || API_REQUEST_STATUS_DEFAULT,
);
export const selectArrivalList = createSelector(
  selectedStepsProvider,
  (state: IProvider): Array<IPlanDispatchArrivalList> =>
    !isEmpty(state?.arrivalList) ? state?.arrivalList : [],
);
export const selectedNeedsToReloadArrivalList = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): boolean => state.selectedProvider?.needsToReloadArrivalList,
);
export const selectArrivalListGroupStep1Status = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): number => state?.arrivalListGroupStatus,
);
export const selectArrivalListGroup = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): IGroupArrivalList => state.arrivalListGroup,
);
export const selectCustomsAgentsList = createSelector(
  selectListAgenteAduanal,
  (customsAgentsList: Array<AgenteAduanal>): Array<AgenteAduanal> => customsAgentsList,
);
export const selectExportersList = createSelector(
  selectvEmpresas,
  (customsAgentsList: Array<Empresa>): Array<Empresa> =>
    filter(customsAgentsList, (o: Empresa) => o.Exportador),
);
export const selectImportersList = createSelector(
  selectvEmpresas,
  (customsAgentsList: Array<Empresa>): Array<Empresa> =>
    filter(customsAgentsList, (o: Empresa) => o.Importador),
);
export const selectCatIncoterm = createSelector(
  selectListIncoterm,
  (catIncoterm: Array<CatIncoterm>): Array<CatIncoterm> => catIncoterm,
);
export const selectedCustomAgent = createSelector(
  [selectListAgenteAduanal, selectedDispatchOrder],
  (customsAgentsList: Array<AgenteAduanal>, dispatchOrder: IDispatchOrder): AgenteAduanal =>
    flow(
      () =>
        filter(
          customsAgentsList,
          (o: AgenteAduanal) => o.IdAgenteAduanal === dispatchOrder?.IdAgenteAduanal,
        ),
      (customAgent) => (!isEmpty(customAgent) ? customAgent[0] : ({} as AgenteAduanal)),
    )(),
);
export const selectCustomsListByAgent = createSelector(
  [selectListAduana, selectedCustomAgent],
  (customsList: Array<Aduana>, customAgent: AgenteAduanal): Array<Aduana> =>
    !isEmpty(customsList) && !isEmpty(customAgent)
      ? filter(customsList, (o: Aduana) => o.IdAgenteAduanal === customAgent?.IdAgenteAduanal)
      : customsList,
);
export const selectCurrentStepName = createSelector(
  selectStepSelected,
  (currentStep: number): string =>
    currentStep === 0
      ? 'imports-settings'
      : currentStep === 1
      ? 'consolidate'
      : currentStep === 2
      ? 'documentation'
      : currentStep === 3
      ? 'generate-order'
      : null,
);
export const selectQueryInfoOds = createSelector(
  selectPlanDispatchDetails,
  (state: IPlanDispatchDetails): QueryInfo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: state?.selectedProvider?.IdProveedor,
    });
    queryInfo.SortField = 'Folio';
    queryInfo.SortDirection = 'asc';
    return queryInfo;
  },
);
export const selectQueryInfoRefreshOd = createSelector(
  selectedDispatchOrder,
  (state: IDispatchOrder): QueryInfo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.Filters.push({
      NombreFiltro: 'IdImpOrdenDespacho',
      ValorFiltro: state?.IdImpOrdenDespacho,
    });
    return queryInfo;
  },
);
export const selectQueryInfoProviders = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): QueryInfo => {
    const queryInfo: QueryInfo = {
      Filters: [
        {
          NombreFiltro: 'IdImpOrdenDespacho',
          ValorFiltro: null,
        },
      ],
    };
    if (state?.providersSearchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'NombreProveedor',
        ValorFiltro: state?.providersSearchTerm,
      });
    }
    return queryInfo;
  },
);
export const selectQueryInfoArrivalList = createSelector(
  selectStepsState,
  (state: IPlanDispatchSteps): QueryInfo => {
    return {
      Filters: [
        {
          NombreFiltro: 'IdProveedor',
          ValorFiltro: state.selectedProvider?.IdProveedor,
        },
        {
          NombreFiltro: 'IdImpOrdenDespacho',
          ValorFiltro: null,
        },
      ],
    };
  },
);
export const selectQueryInfoArrivalListInOD = createSelector(
  selectedDispatchOrder,
  (state: IDispatchOrder): GroupQueryInfo => {
    return {
      Filters: [
        {
          NombreFiltro: 'IdImpOrdenDespacho',
          // ValorFiltro: state?.IdImpOrdenDespacho,
          ValorFiltro: 'CB6DDD73-D94E-440D-9C56-136873427208',
        },
      ],
      GroupColumn: 'NombreProveedor',
    };
  },
);
export const selectArrivalListTotals = createSelector(
  selectArrivalList,
  (arrivalList: Array<IPlanDispatchArrivalList>): IPlanDispatchArrivalListTotals => ({
    TotalPieces: sumBy(arrivalList, (o: IPlanDispatchArrivalList) => o.NumeroDePiezas),
    Amount: sumBy(arrivalList, (o: IPlanDispatchArrivalList) => o.TotalUSD),
  }),
);
export const validatorForStep0 = createSelector(
  selectedDispatchOrder,
  (dispatchOrder: IDispatchOrder) =>
    !!(
      !isEmpty(dispatchOrder) &&
      dispatchOrder.IdEmpresaImportador &&
      dispatchOrder.IdEmpresaExportador &&
      dispatchOrder.IdAgenteAduanal &&
      dispatchOrder.IdAduana &&
      dispatchOrder.IdCatIncoterm &&
      (dispatchOrder.PackingListAmbos ||
        dispatchOrder.PackingListDetallado ||
        dispatchOrder.PackingListSimplificado)
    ),
);
export const validatorForStep1 = createSelector(
  selectedDispatchOrder,
  (dispatchOrder: IDispatchOrder) => true,
);
export const validatorForStep2 = createSelector(
  selectedDispatchOrder,
  (dispatchOrder: IDispatchOrder) => true,
);
export const validatorForNextSteps = createSelector(
  [selectStepSelected, validatorForStep0, validatorForStep1],
  (selectedStep: number, step0: boolean, step1: boolean) =>
    !!((selectedStep === 0 && step0) || (selectedStep === 1 && step1) || selectedStep === 2),
);
