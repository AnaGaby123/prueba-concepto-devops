import {createSelector} from '@ngrx/store';
import {selectSecurityGuard} from '@appSelectors/pendings/pendings.selectors';
import {ISecurityGuard} from '@appModels/store/pendings/security-guard/security-guard.models';
import {
  ISecurityGuardDetails,
  ISegVisitaVisitanteDetalle,
} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {QueryInfo} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {SegVisitante} from 'api-logistica';
import {getArrayForDropDownList} from '@appUtil/util';
import {newVisitant} from '@appSelectors/pendings/security-guard/security-guard.selectors';
import {IFile} from '@appModels/files/files.models';

import {isEqual} from 'lodash-es';

export const securityGuardDetailsSelectors = createSelector(
  selectSecurityGuard,
  (state: ISecurityGuard): ISecurityGuardDetails => state.securityGuardDetails,
);

export const selectedCustomAgent = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): ISegVisitaVisitanteDetalle => state.selectedCustomAgent,
);

export const selectSearchTerm = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): string => state.searchTerm,
);

export const selectActualStep = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): number => state.actualStep,
);

export const selectNewVisitorData = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): SegVisitante => state?.newVisitor,
);
export const selectImageVisitorData = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): IFile => state.visitorImage,
);
export const selectCustomAgentList = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): ISegVisitaVisitanteDetalle[] => state.customAgentList,
);

export const selectedTabsStep = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): Array<ITabOption> => state.tabSteps,
);

export const selectTabSelected = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.tabSelected,
);

export const selectItemCustomAgentList = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.selectedCustomAgent,
);
export const selectErrorPop = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.errorPop,
);
export const selectGuideLabel = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.selectedCustomAgent?.AA,
);
export const selectGuidesInternational = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.selectedCustomAgent?.ListaimpOrdenDespacho,
);
export const selectGuidesNational = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.selectedCustomAgent?.ListaocEnvioList,
);

export const selectTabContainer = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): Array<BarActivityOption> => state.barOptions,
);
export const selectArrayImages = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.packageImages,
);

export const selectNeedsToReloadCustomAgentList = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails): boolean => state.needsToReloadCustomAgent,
);
export const selectFullNameVisit = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle): Array<SegVisitante> => state.visitorList,
);
export const selectLisVisitorListForDropDown = createSelector(selectedCustomAgent, (state) =>
  state?.visitorList
    ? getArrayForDropDownList(state?.visitorList, 'IdSegVisitante', 'NombreCompleto')
    : [],
);
export const selectSearchVisitor = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.searchVisitor,
);

export const selectVisiterListFilsters = createSelector(
  [selectedCustomAgent, selectSearchVisitor],
  (state: ISegVisitaVisitanteDetalle, visitor): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.SortField = 'NombreCompleto';
    body.SortDirection = 'asc';
    body.Filters.push({
      NombreFiltro: 'IdCatOrigenVisitante',
      ValorFiltro: state?.catOrigenVisitante?.IdCatOrigenVisitante,
    });
    if (visitor !== '') {
      body.Filters.push({
        NombreFiltro: 'NombreCompleto',
        ValorFiltro: visitor,
      });
    }
    return body;
  },
);
export const selectSegVisitorData = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.segVisitante,
);
export const selectSelectedVehicleType = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.selectedVehicleType,
);

export const selectSelectedVehicleBrand = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.selectedVehicleBrand,
);

export const selectSelectedVisitName = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.selectedNameVisitor,
);
export const selectStatusApi = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.customLegendStatus,
);
export const selectStatusImageCharger = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.statusImageCharger,
);
export const selectSizePage = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.pageSize,
);
export const selectDesiredPage = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.desiredPage,
);
export const selectTotalVisits = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.totalItems,
);

export const selectImageFile = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.imageFile,
);
export const selectImagesFiles = createSelector(
  securityGuardDetailsSelectors,
  (state: ISecurityGuardDetails) => state.packageImages,
);

export const selectQueryInfoVisit = createSelector(
  [securityGuardDetailsSelectors, selectedCustomAgent],
  (state: ISecurityGuardDetails, visit: ISegVisitaVisitanteDetalle): QueryInfo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.Filters.push({
      NombreFiltro: 'IdSegVisitaVisitante',
      ValorFiltro: visit?.IdSegVisitaVisitante,
    });
    return queryInfo;
  },
);
export const selectCustomAgentListFilters = createSelector(
  [selectTabSelected, selectSearchTerm, selectDesiredPage, selectSizePage],
  (
    tabOptionSelected: ITabOption,
    searchTerm: string,
    desiredPage: number,
    sizePage: number,
  ): QueryInfo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.SortField = 'FechaHoraAproximadaDeArribo';
    queryInfo.SortDirection = 'asc';
    queryInfo.Filters.push({
      NombreFiltro: 'Realizada',
      ValorFiltro: false,
    });
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'FleteraAgenteAduanal',
        ValorFiltro: searchTerm,
      });
    }
    if (tabOptionSelected.id === '2') {
      queryInfo.Filters.push({
        NombreFiltro: 'Fleteras',
        ValorFiltro: true,
      });
    }
    if (tabOptionSelected.id === '3') {
      queryInfo.Filters.push({
        NombreFiltro: 'AA',
        ValorFiltro: true,
      });
    }

    queryInfo.desiredPage = desiredPage;
    queryInfo.pageSize = sizePage;
    return queryInfo;
  },
);

export const selectIsNational = createSelector(
  [selectGuidesNational, selectGuidesInternational],
  (guideNational, guideInternational): boolean => {
    return guideNational?.length > 0;
  },
);

export const selectIncidenceComment = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state.guideSelected.ComentariosIncidencia,
);
export const selectTotalGuides = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.totalGuides,
);
export const selectedGuide = createSelector(
  selectedCustomAgent,
  (state: ISegVisitaVisitanteDetalle) => state?.guideSelected,
);
export const selectGuideNumber = createSelector(
  [selectedGuide, selectIsNational],
  (guide, isNational: boolean) => (isNational ? guide.Folio : guide.GuiaDeEmbarque),
);
export const validatorFields = createSelector(
  [selectedCustomAgent, securityGuardDetailsSelectors, newVisitant],
  (customAgent: ISegVisitaVisitanteDetalle, visit: ISecurityGuardDetails, action): boolean =>
    action
      ? !!(
          (customAgent &&
            visit &&
            visit?.newVisitor?.NombreCompleto !== '' &&
            visit?.newVisitor?.Celular !== '') ||
          visit?.newVisitor?.Telefono !== '' ||
          visit?.newVisitor?.Email !== ''
        )
      : (customAgent?.segVisitante?.NombreCompleto !== '' &&
          customAgent?.segVisitante?.Telefono !== '') ||
        customAgent?.segVisitante?.Email !== '' ||
        customAgent?.segVisitante?.Celular !== '',
);

export const selectValidationChangeSegVisitor = createSelector(
  [securityGuardDetailsSelectors, validatorFields, newVisitant, selectNewVisitorData],
  (state: ISecurityGuardDetails, validatorField, action, newVisitorData: SegVisitante) =>
    (!state?.visitorImage?.file &&
      state?.visitorImage !== null &&
      isEqual(state?.backupVisitor, state?.selectedCustomAgent?.segVisitante) &&
      !action) ||
    (state.visitorImage === null &&
      newVisitorData.NombreCompleto === '' &&
      newVisitorData.Celular === '' &&
      newVisitorData.Telefono === '' &&
      newVisitorData.Email === ''),
);
export const validateNextStep = createSelector(
  [validatorFields, selectedCustomAgent, selectSecurityGuard],
  (
    validationFieldsVisitor,
    visitor: ISegVisitaVisitanteDetalle,
    visit: ISecurityGuard,
  ): boolean => {
    if (visitor?.AplicaVehiculo) {
      return (
        visitor?.segVehiculoVisitante?.Color !== '' &&
        visitor?.segVehiculoVisitante?.Placas !== '' &&
        visitor?.segVehiculoVisitante?.IdCatMarcaVehiculo !== '' &&
        visitor?.segVehiculoVisitante?.IdCatTipoVehiculo !== '' &&
        visitor?.segVisitante?.NombreCompleto !== '' &&
        !visit.addNewVisitant &&
        !visit.editMode
      );
    } else {
      return true;
    }
  },
);
export const validatorStep2 = createSelector(
  [securityGuardDetailsSelectors, selectArrayImages, selectIsNational, validateNextStep],
  (
    state: ISecurityGuardDetails,
    images: Array<IFile>,
    isNational: boolean,
    nextStepValidation: boolean,
  ) => {
    return images?.length > 0 && !isNational && nextStepValidation;
  },
);
