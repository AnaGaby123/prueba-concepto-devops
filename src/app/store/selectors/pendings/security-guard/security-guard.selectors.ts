import {selectSecurityGuard} from '@appSelectors/pendings/pendings.selectors';
import {ISecurityGuard} from '@appModels/store/pendings/security-guard/security-guard.models';
import {createSelector} from '@ngrx/store';

export const selectTitle = createSelector(
  selectSecurityGuard,
  (state: ISecurityGuard): string => state.title,
);

export const selectEditMode = createSelector(
  selectSecurityGuard,
  (state: ISecurityGuard): boolean => state.editMode,
);
export const newVisitant = createSelector(
  selectSecurityGuard,
  (state: ISecurityGuard): boolean => state.addNewVisitant,
);
