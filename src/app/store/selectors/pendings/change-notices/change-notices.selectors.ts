import {createSelector} from '@ngrx/store';
import {selectChangeNotices} from '@appSelectors/pendings/pendings.selectors';
import {IChangeNotices} from '@appModels/store/pendings/change-notices/change-notices.models';

export const selectChangeNoticesTitle = createSelector(
  selectChangeNotices,
  (state: IChangeNotices) => state.title,
);
export const selectIsDetails = createSelector(
  selectChangeNotices,
  (state: IChangeNotices) => state.detailsMode,
);
export const selectChangeNoticesList = createSelector(
  selectChangeNotices,
  (state: IChangeNotices) => state.changeNoticesList,
);
export const selectChangeNoticesDetails = createSelector(
  selectChangeNotices,
  (state: IChangeNotices) => state.changeNoticesDetails,
);
