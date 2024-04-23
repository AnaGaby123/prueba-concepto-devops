import {createSelector} from '@ngrx/store';
import {selectCharges} from '@appSelectors/pendings/pendings.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {selectListReviews} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CatRevision, Cliente} from 'api-catalogos';
import {map as _map} from 'lodash-es';

import {DEFAULT_UUID} from '@appUtil/common.protocols';

export const selectReviewResults = createSelector(selectCharges, (state) => state.reviewResults);
export const selectTabs = createSelector(
  selectReviewResults,
  (state): Array<ITabOption> => {
    return [
      {
        id: '1',
        label: 'TODAS',
        activeSubtitle: false,
      },
      {
        id: '2',
        label: 'EJECUTADAS',
        activeSubtitle: false,
      },
      {
        id: '3',
        label: 'FUERA DE TIEMPO',
        activeSubtitle: false,
      },
      {
        id: '4',
        label: 'REPROGRAMADAS',
        activeSubtitle: false,
      },
    ];
  },
);
export const selectReviewResultList = createSelector(
  selectReviewResults,
  (state) => state.reviewResultsList,
);

export const selectedTab = createSelector(selectReviewResultList, (state) => state.selectedTab);
export const selectDropReviews = createSelector(
  selectListReviews,
  (list: Array<CatRevision>): Array<DropListOption> => {
    return _map(list, (item: CatRevision) => ({
      value: item.IdCatRevision,
      label: item.Revision,
    }));
  },
);
export const selectListCustomer = createSelector(
  selectReviewResultList,
  (state) => state.customers,
);
export const selectDropCustomer = createSelector(
  selectListCustomer,
  (list: Array<Cliente>): Array<DropListOption> => {
    return list.length > 0
      ? _map(list, (item: Cliente) => ({
          label: item.Nombre,
          value: item.IdCliente,
        }))
      : [];
  },
);
export const selectListMessenger = createSelector(
  selectReviewResultList,
  (state) => state.messengers,
);
export const selectDropMessenger = createSelector(
  selectListMessenger,
  (list): Array<DropListOption> => {
    const dataDrop = _map(list, (item) => ({
      value: item.IdUsuario,
      label: item.UserName,
    }));
    dataDrop.unshift({value: DEFAULT_UUID, label: 'Todos'});
    return dataDrop;
  },
);
export const selectReview = createSelector(selectReviewResultList, (state) => state.selectedReview);
export const selectCustomer = createSelector(
  selectReviewResultList,
  (state) => state.selectedCustomer,
);
export const selectMessenger = createSelector(
  selectReviewResultList,
  (state) => state.selectedMessenger,
);
