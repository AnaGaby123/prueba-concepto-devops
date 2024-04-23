/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectImports} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IImportsState} from '@appModels/store/pendings/imports/imports.models';
import {IRegisterDispatchState} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch.models';
import {IRegisterDispatchDetails} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';

export const selectRegisterDispatch = createSelector(
  selectImports,
  (state: IImportsState) => state.registerDispatch,
);
export const selectTitleRD = createSelector(
  selectRegisterDispatch,
  (state: IRegisterDispatchState) => state.title,
);
export const selectIsDetails = createSelector(
  selectRegisterDispatch,
  (state: IRegisterDispatchState) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectRegisterDispatch,
  (state: IRegisterDispatchState) => state.allowedToDetails,
);
export const selectRegisterDispatchList = createSelector(
  selectRegisterDispatch,
  (state: IRegisterDispatchState) => state.registerDispatchList,
);
export const selectRegisterDispatchDetails = createSelector(
  selectRegisterDispatch,
  (state: IRegisterDispatchState): IRegisterDispatchDetails => state.registerDispatchDetails,
);
