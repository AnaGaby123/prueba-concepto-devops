import {createAction, props} from '@ngrx/store';

export const SAVE_CONFIGURACION_PAGOS_LOAD = createAction(
  '[API] Save Configuracion Pagos LOAD Success',
  props<{payload: any; goToNextStep?: boolean}>(),
);
export const SAVE_CONFIGURACION_PAGOS_SUCCESS = createAction(
  '[API] Save Configuracion Pagos Success',
  props<{payload: any}>(),
);
export const SAVE_CONFIGURACION_PAGOS_ERROR = createAction(
  '[API] Save Configuracion Pagos Error',
  props<{error: any}>(),
);
