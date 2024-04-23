import {createSelector} from '@ngrx/store';
import {selectChangeNoticesList} from '@appSelectors/pendings/change-notices/change-notices.selectors';
import {IChangeNoticesList} from '@appModels/store/pendings/change-notices/change-notices-list/change-notices-list.models';

export const selectDataByType = createSelector(
  selectChangeNoticesList,
  (state: IChangeNoticesList) => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectChangeNoticesList,
  (state: IChangeNoticesList) => state.filterByType,
);
export const selectTabOptions = createSelector(
  selectChangeNoticesList,
  (state: IChangeNoticesList) => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectChangeNoticesList,
  (state: IChangeNoticesList) => state.selectedTabOption,
);
export const selectSearchTerm = createSelector(
  selectChangeNoticesList,
  (state: IChangeNoticesList) => state.searchTerm,
);
