import {createSelector} from '@ngrx/store';
import {patchBody} from '@appUtil/util';
import {FilterTuple, QueryInfo} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {QueryResultVEviResumenGeneral} from 'api-logistica';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {uniqBy} from 'lodash-es';

import {selectGeneralSummary} from '@appSelectors/pendings/pendings.selectors';
import {
  ICustomerSummary,
  IGeneralSummaryState,
} from '@appModels/store/general-summary/general-summary.models';

export const selectTabOptions = createSelector(
  selectGeneralSummary,
  (state): Array<ITabOption> => {
    const options: Array<ITabOption> = [];
    options.push({
      id: DEFAULT_UUID,
      label: 'TODOS LOS EVIS',
      activeSubtitle: false,
    });
    state.listEvi.Results.forEach((evi) => {
      options.push({
        id: evi.IdUsuario,
        label: evi.UserName,
        activeSubtitle: false,
      });
    });
    return options;
  },
);
export const selectTabOption = createSelector(selectGeneralSummary, (state) => state.option);
export const selectContractFilters = createSelector(
  selectGeneralSummary,
  (state) => state.contractFilters,
);
export const selectContractFilter = createSelector(
  selectGeneralSummary,
  (state) => state.contractFilter,
);
export const selectStateFilters = createSelector(
  selectGeneralSummary,
  (state) => state.stateFilters,
);
export const selectStateFilter = createSelector(selectGeneralSummary, (state) => state.stateFilter);
export const selectAllCustomer = createSelector(selectGeneralSummary, (state) => state.allCustomer);
export const selectDropListCustomer = createSelector(
  selectAllCustomer,
  (allCustomer: QueryResultVEviResumenGeneral): Array<DropListOption> => {
    let dataDropList: Array<DropListOption> = [];
    dataDropList.push({value: DEFAULT_UUID, label: 'Todos'});
    allCustomer.Results.forEach((item) => {
      dataDropList.push({value: item.IdCliente, label: item.Nombre});
    });
    dataDropList = uniqBy(dataDropList, 'value');
    return dataDropList;
  },
);
export const selectQueryInfo = createSelector(selectGeneralSummary, (state) => state.queryInfo);
export const selectCustomerFilter = createSelector(
  selectGeneralSummary,
  (state) => state.customerFilter,
);
export const filtersFromClients = createSelector(
  selectTabOption,
  selectQueryInfo,
  selectContractFilter,
  selectStateFilter,
  selectCustomerFilter,
  (option, queryInfo, contract, state, customer): QueryInfo => {
    const filters: Array<FilterTuple> = [];
    if (option.id !== DEFAULT_UUID) {
      filters.push({
        NombreFiltro: 'IdUsuario',
        ValorFiltro: option.id.toString(),
      });
    }
    if (contract.value !== '1') {
      filters.push({
        NombreFiltro: 'Contrato',
        ValorFiltro: contract.value === '2',
      });
    }
    if (state.value !== '1') {
      filters.push({
        NombreFiltro: 'EstadoCotizaciones',
        ValorFiltro: state.value === '3' ? '1' : '0',
      });
    }
    if (customer.value !== DEFAULT_UUID) {
      filters.push({
        NombreFiltro: 'IdCliente',
        ValorFiltro: customer.value.toString(),
      });
    }

    return patchBody(null, null, null, null, 'Nombre', filters, 'asc');
  },
);

export const selectListCustomer = createSelector(
  selectGeneralSummary,
  (state: IGeneralSummaryState) => state.customers.Results,
);
export const selectTotalCustomer = createSelector(
  selectGeneralSummary,
  (state: IGeneralSummaryState) => state.customers.TotalResults,
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectStatusApi = createSelector(
  selectGeneralSummary,
  (state: IGeneralSummaryState) => state.statusApi === 1,
);
export const selectCustomerSelected = createSelector(
  selectGeneralSummary,
  (state: IGeneralSummaryState): ICustomerSummary => state.customerSelected,
);
