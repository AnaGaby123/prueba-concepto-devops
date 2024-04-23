import {createAction, props} from '@ngrx/store';

export const GET_CAT_TEMA_LOAD = createAction(
  '[API] GET CATÁLOGO TEMAS LOAD',
  props<{payload: any}>(),
);
export const GET_CAT_TEMA_SUCCESS = createAction(
  '[API] GET CATÁLOGO TEMAS SUCCESS',
  props<{payload: any}>(),
);
export const GET_CAT_TEMA_ERROR = createAction(
  '[API] GET CATÁLOGO TEMAS ERROR',
  props<{error: any}>(),
);
