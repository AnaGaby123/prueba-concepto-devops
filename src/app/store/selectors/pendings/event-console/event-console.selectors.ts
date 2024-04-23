import {createSelector} from '@ngrx/store';
import {selectEventConsole} from '@appSelectors/pendings/pendings.selectors';

export const selectTitle = createSelector(selectEventConsole, (state) => state.title);
