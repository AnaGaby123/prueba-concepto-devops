import {createAction, props} from '@ngrx/store';

export const SAVE_RESTRICCION_ENTREGA_SUCCESS = createAction(
  '[API] Save Restricciones Entrega Success',
  props<{payload: any}>(),
);
export const SAVE_RESTRICCION_ENTREGA_ERROR = createAction(
  '[API] Save Restricciones Entrega Error',
  props<{error: any}>(),
);
