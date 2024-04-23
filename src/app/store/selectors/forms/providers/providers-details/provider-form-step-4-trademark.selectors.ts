import {createSelector} from '@ngrx/store';
import {selectProvidersAddEdit} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  IVTrademarkDetail,
  IVTrademarkFamilyDetail,
  Trademark,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {FiltersOnlyActive, queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {getProviderId} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';

import {concat, filter, forEach, isEmpty, isEqual} from 'lodash-es';
import {VProveedor} from 'api-catalogos';

export const selectInitialProviderTrademark = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.trademark,
);
export const selectActualProvider = createSelector(
  selectInitialProviderTrademark,
  (state): VProveedor => state.provider,
);
export const selectSearchTerm = createSelector(
  selectInitialProviderTrademark,
  (state) => state.termSearch,
);
export const selectProvidersTrademarkList = createSelector(
  selectInitialProviderTrademark,
  (state) => state.tradeMarkList.Results,
);
export const selectProvidersTrademarkTotal = createSelector(
  selectInitialProviderTrademark,
  (state) => state.tradeMarkList.TotalResults,
);
export const selectProviderQueryInfo = createSelector(getProviderId, (state) => {
  const queryInfo = new FiltersOnlyActive();
  queryInfo.Filters.push({
    NombreFiltro: 'IdProveedor',
    ValorFiltro: state,
  });
  return queryInfo;
});
export const selectQueryInfoTradeMark = createSelector(
  selectInitialProviderTrademark,
  (state: Trademark) => {
    const queryInfo = {...state.queryInfo};
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];
    if (state.termSearch) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Nombre',
          ValorFiltro: state.termSearch,
        },
      ];
    }
    return queryInfo;
  },
);
export const selectQueryInfoAssociatedTradeMark = createSelector(
  getProviderId,
  (providerId: string) => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: providerId,
    });
    return queryInfo;
  },
);
export const selectTrademarkStatus = createSelector(
  selectInitialProviderTrademark,
  (state) => state.tradeMarkStatus,
);
export const selectIsOpenTrademarkPopUp = createSelector(
  selectInitialProviderTrademark,
  (state) => state.isOpenTrademarkPop,
);
export const selectAssociatedTrademarkStatus = createSelector(
  selectInitialProviderTrademark,
  (state) => state.associatedTradeMarkStatus,
);
export const selectAssociatedList = createSelector(
  selectInitialProviderTrademark,
  (state): Array<IVTrademarkDetail> => state.associatedList,
);
export const selectBackupAssociatedList = createSelector(
  selectInitialProviderTrademark,
  (state): Array<IVTrademarkDetail> => state.backUpAssociated?.associatedList,
);
export const selectAssociatedAndDeletedList = createSelector(
  selectInitialProviderTrademark,
  (state): Array<IVTrademarkDetail> => concat(state.associatedList, state.disableAssociated),
);
export const selectEnableEdit = createSelector(
  selectInitialProviderTrademark,
  (state) => state.enableEdit,
);
export const selectFetchMoreTrademarksInfo = createSelector(
  selectInitialProviderTrademark,
  (state: Trademark): IFetchMoreItemsInfo => {
    return {
      itemList: state.tradeMarkList?.Results,
      itemsTotalLength: state.tradeMarkList?.TotalResults,
      listRequestStatus: state.tradeMarkStatus,
      desiredPage: state.queryInfo.desiredPage,
      pageSize: state.queryInfo.pageSize,
      totalPages:
        state.tradeMarkList?.TotalResults >= state.queryInfo.pageSize
          ? Math.ceil(state.tradeMarkList?.TotalResults / state.queryInfo.pageSize)
          : 0,
    };
  },
);
export const selectTrademarkHasChanges = createSelector(
  selectAssociatedList,
  selectBackupAssociatedList,
  (list: Array<IVTrademarkDetail>, backupList: Array<IVTrademarkDetail>) => {
    const original = JSON.stringify(list);
    const backup = JSON.stringify(backupList);
    return !isEqual(original, backup);
  },
);
export const selectFamiliesAreNotEmpty = createSelector(
  selectAssociatedList,
  (list: Array<IVTrademarkDetail>) => {
    let valid = true;
    forEach(list, (o: IVTrademarkDetail) => {
      const linkedBrands = filter(
        o.vMarcaFamiliaDetalle,
        (i: IVTrademarkFamilyDetail) => i.MarcaFamiliaProveedor?.Activo,
      );
      if (linkedBrands.length <= 0) {
        valid = false;
      }
    });
    return valid;
  },
);
export const selectValidatorTrademark = createSelector(
  selectAssociatedList,
  selectFamiliesAreNotEmpty,
  selectTrademarkHasChanges,
  (associatedList: Array<IVTrademarkDetail>, familiesValidator: boolean, hasChanges: boolean) =>
    !isEmpty(associatedList) && familiesValidator && hasChanges,
);
