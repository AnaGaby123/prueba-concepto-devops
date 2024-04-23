// Actions
import {
  SET_ALLOW_TO_DETAILS,
  SET_IS_IN_DETAILS,
  SET_POP_BRAND_IS_OPEN,
  SET_TITLE,
} from '@appActions/forms/brand-form/brand-form.actions';
// Reducers
import {listBrandsFormReducer} from '@appReducers/forms/brands-form/brands-form-list/brands-form-list.reducer';
import {detailsBrandsFormReducer} from '@appReducers/forms/brands-form/brands-form-details/brands-form-details.reducer';
// Models
import {
  IBrandFormState,
  initialBrandFormState,
} from '@appModels/store/forms/brand-form/brand-form.models';
// Dev tools
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

export const brandFormReducer: ActionReducer<IBrandFormState> = combineReducers(
  {
    brandFormDetails: detailsBrandsFormReducer,
    brandFormList: listBrandsFormReducer,
    allowToDetails: createReducer(
      initialBrandFormState().allowToDetails,
      on(SET_ALLOW_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
    ),
    isInDetails: createReducer(
      initialBrandFormState().isInDetails,
      on(SET_IS_IN_DETAILS, (state, {isInDetails}) => isInDetails),
    ),
    title: createReducer(
      'CATÁLOGO DE CONTENIDO',
      on(SET_TITLE, (state, {title}) => title),
    ),
    popAlert: createReducer(
      initialBrandFormState().popAlert,
      on(SET_POP_BRAND_IS_OPEN, (state, {popAlert}) => popAlert),
    ),
  },
  {...initialBrandFormState()},
);
