import {createAction, props} from '@ngrx/store';

export const GET_PROVIDERS_LOAD = createAction('[API] Load Providers', props<{payload: any}>());
export const GET_PROVIDERS_SUCCESS = createAction(
  '[API] PROVIDERS SUCCESS',
  props<{payload: any}>(),
);
export const GET_PROVIDERS_ERROR = createAction('[API] PROVIDERS ERROR', props<{error: any}>());
export const GET_FAMILY_PROVIDER_LOAD = createAction(
  '[API] FAMYLY PROVEEDO LOAD',
  props<{payload: any}>(),
);
export const GET_FAMILY_PROVIDER_SUCCESS = createAction(
  '[API] FAMILY PROVIDER SUCCESS',
  props<{payload: any}>(),
);
export const GET_FAMILY_PROVIDER_ERROR = createAction(
  '[API] FAMILY PROVIDER ERROR',
  props<{error: any}>(),
);

export const GET_VPROVIDERS_LOAD = createAction('[API] LOAD VPROVIDERS');

export const GET_VPROVIDERS_SUCCESS = createAction(
  '[API] VPROVIDERS SUCCESS',
  props<{payload: any}>(),
);

export const GET_VPROVIDERS_ERROR = createAction('[API] VPROVIDERS ERROR', props<{error: any}>());
