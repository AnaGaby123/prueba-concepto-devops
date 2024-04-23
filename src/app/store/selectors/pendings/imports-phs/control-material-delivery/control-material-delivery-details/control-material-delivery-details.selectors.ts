import {createSelector} from '@ngrx/store';
import {selectControlMaterialDelivery} from '@appSelectors/pendings/imports-phs/control-material-delivery/control-material-delivery.selectors';
import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {isEmpty} from 'lodash-es';

import {QueryInfo} from 'api-finanzas';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

export const selectControlMaterialDeliveryDetails = createSelector(
  selectControlMaterialDelivery,
  (state) => state.controlMaterialDeliveryDetails,
);
export const selectAgent = createSelector(
  selectControlMaterialDeliveryDetails,
  (state): ICustomAgent => state.selectedAgent,
);
export const selectNameAgent = createSelector(selectAgent, (agent) =>
  !isEmpty(agent)
    ? agent.RazonSocialEmpresaImportador !== 'N/A'
      ? agent.RazonSocialEmpresaImportador
      : agent.Fletera !== 'N/A'
      ? agent.Fletera
      : agent.NombreLegalAgenteAduanal
    : '',
);
export const selectQueryInfo = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.queryInfo,
);
export const selectDataOrder = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.dataByType,
);
export const selectParamOrder = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.filterByType,
);

export const selectParamsDispatchOrders = createSelector(
  selectQueryInfo,
  selectAgent,
  selectParamOrder,
  (queryInfo: IQueryInfoOptions, agent, order: DropListOption): QueryInfo => {
    const params = new FiltersOnlyActive();
    if (order) {
      params.SortField = 'FechaEstimadaDeEntrega';
      params.SortDirection = order.value === '1' ? 'Desc' : 'Asc';
    }

    if (agent.RazonSocialEmpresaImportador !== 'N/A') {
      params.Filters.push({
        NombreFiltro: 'RazonSocialEmpresaImportador',
        ValorFiltro: agent.RazonSocialEmpresaImportador,
      });
    } else if (agent.Fletera !== 'N/A') {
      params.Filters.push({
        NombreFiltro: 'Fletera',
        ValorFiltro: agent.Fletera,
      });
    } else {
      params.Filters.push({
        NombreFiltro: 'NombreLegalAgenteAduanal',
        ValorFiltro: agent.NombreLegalAgenteAduanal,
      });
    }
    if (queryInfo.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'Folio',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    return params;
  },
);
export const selectListOrder = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.dispatchOrders.Results,
);
export const selectIsLoadingStatus = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.queryInfo.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectDispatchOrder = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.selectedOrder,
);
export const selectBase64File = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.base64,
);
export const selectApiStatusLoadingApi = createSelector(
  selectControlMaterialDeliveryDetails,
  (state) => state.loadingFile === API_REQUEST_STATUS_LOADING,
);
