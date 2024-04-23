import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IChangeNoticesList,
  initialIChangeNoticesList,
} from '@appModels/store/pendings/change-notices/change-notices-list/change-notices-list.models';
import {changeNoticesListActions} from '@appActions/pendings/change-notices';

export const changeNoticesListReducer: ActionReducer<IChangeNoticesList> = createReducer(
  {...initialIChangeNoticesList()},
  on(
    changeNoticesListActions.SET_TAB_SELECTED,
    (state: IChangeNoticesList, {selectedTabOption}): IChangeNoticesList => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    changeNoticesListActions.SET_OPTION_ORDER,
    (state: IChangeNoticesList, {filterByType}): IChangeNoticesList => ({
      ...state,
      filterByType,
    }),
  ),
  on(
    changeNoticesListActions.SET_SEARCH_TERM,
    (state: IChangeNoticesList, {searchTerm}): IChangeNoticesList => ({
      ...state,
      searchTerm,
    }),
  ),
);
