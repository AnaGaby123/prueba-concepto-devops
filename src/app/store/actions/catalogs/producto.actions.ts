import {createAction, props} from '@ngrx/store';

export const GET_PRODUCTS_LOAD = createAction('[API] Load Products', props<{payload: any}>());
export const GET_PRODUCTS_SUCCESS = createAction('[API] Prodcuts SUCCESS', props<{payload: any}>());
export const GET_PRODUCTS_ERROR = createAction('[API] Products ERROR', props<{error: any}>());
export const GET_PRECIOLISTA_LOAD = createAction(
  '[API] Precio Lista Load',
  props<{payload: any}>(),
);
export const GET_PRECIOLISTA_SUCCESS = createAction(
  '[API] Precio Lista SUCCESS',
  props<{payload: any}>(),
);
export const GET_PRECIOLISTA_ERROR = createAction(
  '[API] Precio Lista ERROR',
  props<{error: any}>(),
);
