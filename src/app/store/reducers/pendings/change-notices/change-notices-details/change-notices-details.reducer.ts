import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IChangeNoticesDetails,
  initialIChangeNoticesDetails,
} from '@appModels/store/pendings/change-notices/change-notices-details/change-notices-details.models';
import {changeNoticesDetailsActions} from '@appActions/pendings/change-notices';

export const changeNoticesDetailsReducer: ActionReducer<IChangeNoticesDetails> = createReducer(
  {...initialIChangeNoticesDetails()},
  on(
    changeNoticesDetailsActions.SET_SELECTED_TAB_OPTION,
    (state: IChangeNoticesDetails, {selectedTabOption}): IChangeNoticesDetails => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    changeNoticesDetailsActions.SET_SORT_SELECTED,
    (state: IChangeNoticesDetails, {filterByType}): IChangeNoticesDetails => ({
      ...state,
      filterByType,
    }),
  ),
  on(
    changeNoticesDetailsActions.SET_SEARCH_TYPE_SELECTED,
    (state: IChangeNoticesDetails, {selectedSearchTermOption}): IChangeNoticesDetails => ({
      ...state,
      selectedSearchTermOption,
    }),
  ),
  on(
    changeNoticesDetailsActions.SET_SEARCH_TERM,
    (state: IChangeNoticesDetails, {searchTerm}): IChangeNoticesDetails => ({
      ...state,
      searchTerm,
    }),
  ),
);
