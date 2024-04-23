/* Selectors Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectDispatchMonitoringDetails} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.selectors';

/* Models Imports */
import {
  IDispatchMonitoringDetails,
  IGuidesDispatchMonitoring,
  IItem,
  IItemsConfigTotals,
  initialGuiaCancelacion,
  initialGuide,
  initialGuideConfirm,
  initialImpactFee,
  ITotalItems,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';

/* Dev Tools Imports */
import {countBy, find, isEmpty, map as _map, sumBy} from 'lodash-es';

import {ITabOption} from '@appModels/botonera/botonera-option';
import {QueryInfo} from 'api-finanzas';
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

export const selectDetails = createSelector(
  selectDispatchMonitoringDetails,
  (state: IDispatchMonitoringDetails): IDispatchMonitoringDetails => state,
);
export const selectTab = createSelector(selectDetails, (state) => state.tabSelected);
export const selectProvider = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.providerSelected,
);
export const selectNeedsToReloadGuides = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.needsToReloadGuides,
);
export const selectTabOptions = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails): Array<ITabOption> =>
    _map(state?.tabOptions, (o: ITabOption, index: number) => ({
      ...o,
      totalSubtitle:
        o.id === '1'
          ? state.providerSelected.NumeroDePiezas
          : o.id === '2'
          ? state.providerSelected.NumeroDePiezasAMasDe3Dias
          : o.id === '3'
          ? state.providerSelected.NumeroDePiezasA3Dias
          : o.id === '4'
          ? state.providerSelected.NumeroDePiezasA2Dias
          : state.providerSelected.NumeroDePiezasA1Dia,
    })),
);

export const selectProviderContacts = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.providerContacts,
);

export const selectedDropListProviderContact = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.selectedProviderContact,
);
export const selectContactsProviderDropList = createSelector(
  selectProviderContacts,
  (contacts: Array<ContactoDetalleProvObj>): Array<DropListOption> =>
    !isEmpty(contacts)
      ? contacts.map((item: ContactoDetalleProvObj) => {
          return {
            value: item.IdContactoProveedor,
            label: item.Nombres + ' ' + item.ApellidoPaterno + ' ' + item.ApellidoMaterno,
          };
        })
      : [],
);
export const selectedProviderContact = createSelector(
  [selectProviderContacts, selectProvider, selectedDropListProviderContact],
  (
    contactList: Array<ContactoDetalleProvObj>,
    provider: IProvider,
    selectedContact: DropListOption,
  ): IProviderContact => {
    const selectedFilteredContact: ContactoDetalleProvObj = find(
      contactList,
      (o: ContactoDetalleProvObj) => o.IdContactoProveedor === selectedContact.value,
    );
    return selectedFilteredContact
      ? {
          fullName:
            selectedFilteredContact?.Nombres +
            ' ' +
            selectedFilteredContact?.ApellidoPaterno +
            ' ' +
            selectedFilteredContact?.ApellidoMaterno,
          providerName: provider?.NombreProveedor,
          Mail: selectedFilteredContact?.Mail,
          NumeroTelefonico: selectedFilteredContact?.NumeroTelefonico,
          Departamento: selectedFilteredContact?.Departamento,
          Puesto: selectedFilteredContact?.Puesto,
          NivelDecision: selectedFilteredContact?.NivelDecision,
          IdContactoProveedor: selectedFilteredContact?.IdContactoProveedor,
        }
      : null;
  },
);
export const selectSearchTerm = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.searchTerm,
);
export const selectGuides = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.guides,
);
export const selectQueryGuides = createSelector(
  [selectProvider, selectSearchTerm, selectTab],
  (provider: IProvidersDispatchMonitoring, searchTerm: string, tabSelected: ITabOption) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdProveedor',
        ValorFiltro: provider.IdProveedor,
      },
    ];
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'NumeroGuiaOFletera',
        ValorFiltro: searchTerm,
      });
    }
    if (tabSelected.label === '3 + Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '3 + Días',
      });
    } else if (tabSelected.label === '3 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '3 Días',
      });
    } else if (tabSelected.label === '2 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '2 Días',
      });
    } else if (tabSelected.label === '1 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '1 Días',
      });
    }
    queryInfo.SortDirection = 'asc';
    queryInfo.SortField = 'TotalPartida';
    return queryInfo;
  },
);
export const selectGuideStatus = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) => state.guidesStatus,
);
export const selectGuideSelected = createSelector(
  selectDetails,
  (state: IDispatchMonitoringDetails) =>
    !isEmpty(state.guideSelected)
      ? state.guideSelected
      : {
          Index: 0,
          isSelected: false,
          items: [],
          itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
          itemsNeedsToReload: true,
          cancelConfig: false,
          withImpactFeeConfig: false,
          confirmedConfig: false,
          NumeroGuia: state.guideSelected.NumeroGuia,
          ...initialGuide(),
          guiaCancelacion: {
            ...initialGuiaCancelacion(),
            IdOcPackingList: state.guideSelected.IdOcPackingList,
          },
          guiaImpactoFee: {
            ...initialImpactFee(),
            IdOcPackingList: state.guideSelected.IdOcPackingList,
          },
          guideConfirm: {
            ...initialGuideConfirm(),
            IdOcPackingList: state.guideSelected.IdOcPackingList,
          },
          file: null,
        },
);

export const selectQueryItems = createSelector(
  selectGuideSelected,
  (guideSelected: IGuidesDispatchMonitoring) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdOcPackingList',
        ValorFiltro: guideSelected.IdOcPackingList,
      },
      {
        NombreFiltro: 'IdOcOrdenDeCompra',
        ValorFiltro: guideSelected.IdOcOrdenDeCompra,
      },
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];
    queryInfo.SortField = 'Indice';
    queryInfo.SortDirection = 'asc';
    return queryInfo;
  },
);
export const selectNeedToReloadItems = createSelector(
  selectGuideSelected,
  (guideSelected: IGuidesDispatchMonitoring) => guideSelected?.itemsNeedsToReload,
);
export const selectItems = createSelector(
  selectGuideSelected,
  (guideSelected: IGuidesDispatchMonitoring): Array<IItem> =>
    !isEmpty(guideSelected) ? guideSelected?.items : [],
);
export const selectItemsStatus = createSelector(
  selectGuideSelected,
  (state: IGuidesDispatchMonitoring) => state.itemsStatus,
);
export const selectItemsConfiguredTotals = createSelector(
  selectItems,
  (items: Array<IItem>): IItemsConfigTotals => {
    const countCancel = countBy(items, (o: IItem) => o.cancelConfig);
    const countWithImpact = countBy(items, (o: IItem) => o.withImpactFeeConfig);
    const countConfirmed = countBy(items, (o: IItem) => o.confirmedConfig);
    return {
      cancel: countCancel.true || 0,
      withImpact: countWithImpact.true || 0,
      confirmed: countConfirmed.true || 0,
    };
  },
);
export const selectTotalOfItem = createSelector(
  selectItems,
  selectItemsConfiguredTotals,
  (items: Array<IItem>, totals: IItemsConfigTotals) => {
    const objTotals: ITotalItems = {
      totalResults: items?.length,
      totalPieces: sumBy(items, (item: IItem) => item.NumeroDePiezas),
      totalAmount: sumBy(items, (item: IItem) => item.TotalPartida),
      totalClients: Object.keys(countBy(items, (item: IItem) => item.NombreCliente)).length,
      cancel: totals.cancel,
      withImpact: totals.withImpact,
      confirmed: totals.confirmed,
    };
    return objTotals;
  },
);
export const selectGuideFile = createSelector(
  selectGuideSelected,
  (guide: IGuidesDispatchMonitoring) => {
    return {
      IdArchivo: guide.IdArchivoGuia,
      FileKey: guide.ArchivoGuia,
    };
  },
);
export const selectPLFile = createSelector(
  selectGuideSelected,
  (guide: IGuidesDispatchMonitoring) => {
    return {
      IdArchivo: guide.IdArchivoPackingList,
      FileKey: guide.ArchivoPackingList,
    };
  },
);
export const selectCancelJustificacion = createSelector(
  selectGuideSelected,
  (state: IGuidesDispatchMonitoring) => state.guiaCancelacion,
);
export const selectImpactFeeConfig = createSelector(
  selectGuideSelected,
  (state: IGuidesDispatchMonitoring) => state.guiaImpactoFee,
);
export const selectConfirmGuide = createSelector(
  selectGuideSelected,
  (state: IGuidesDispatchMonitoring) => state.guideConfirm,
);
