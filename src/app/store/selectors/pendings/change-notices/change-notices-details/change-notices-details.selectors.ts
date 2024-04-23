import {createSelector} from '@ngrx/store';
import {selectChangeNoticesDetails} from '@appSelectors/pendings/change-notices/change-notices.selectors';
import {IChangeNoticesDetails} from '@appModels/store/pendings/change-notices/change-notices-details/change-notices-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {isEmpty, map as _map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectedClient = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): any => state.selectedClient,
);
export const selectTabOptions = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): Array<ITabOption> =>
    !isEmpty(state.selectedClient)
      ? _map(state?.tabOptions, (o: ITabOption) => ({
          ...o,
          totalSubtitle:
            o.id === '1'
              ? state.selectedClient.TotalOrdenesDeCompra
              : o.id === '2'
              ? state.selectedClient.TotalFueraDeTiempo
              : o.id === '3'
              ? state.selectedClient.TotalUrgente
              : state.selectedClient.TotalEnTiempo,
        }))
      : state?.tabOptions,
);
export const selectedTabOption = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): ITabOption => state?.selectedTabOption,
);
export const selectSortList = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): Array<DropListOption> => state.dataByType,
);
export const selectSort = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): DropListOption => state.filterByType,
);
export const selectSearchTermOptions = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): Array<DropListOption> => state.searchTermOptions,
);
export const selectSearchTerm = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): string => state.searchTerm,
);
export const selectedSearchTermOption = createSelector(
  selectChangeNoticesDetails,
  (state: IChangeNoticesDetails): DropListOption => state.selectedSearchTermOption,
);
