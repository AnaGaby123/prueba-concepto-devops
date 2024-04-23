import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {TITLE_DECLARE_TRANSIT_ARRIVAL} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {
  IChangeNotices,
  initialIChangeNotices,
} from '@appModels/store/pendings/change-notices/change-notices.models';
import {changeNoticesListReducer} from '@appReducers/pendings/change-notices/change-notices-list/change-notices-list.reducer';
import {changeNoticesDetailsReducer} from '@appReducers/pendings/change-notices/change-notices-details/change-notices-details.reducer';

export const changeNoticesReducer: ActionReducer<IChangeNotices> = combineReducers(
  {
    title: createReducer(TITLE_DECLARE_TRANSIT_ARRIVAL),
    detailsMode: createReducer(false),
    changeNoticesList: changeNoticesListReducer,
    changeNoticesDetails: changeNoticesDetailsReducer,
  },
  initialIChangeNotices(),
);
