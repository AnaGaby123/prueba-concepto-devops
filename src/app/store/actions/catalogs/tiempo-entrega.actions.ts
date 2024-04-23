import {createAction, props} from '@ngrx/store';

export const SAVE_VALOR_CONFIG_ENTREGA_LOAD = createAction(
  '[API] Valor Configuracion Load',
  props<{payload: any}>(),
);
export const SAVE_VALOR_CONFIG_ENTREGA_ERROR = createAction(
  '[API] Valor Configuracion Error',
  props<{error: any}>(),
);
export const SAVE_CONFIG_TIEMPO_ENTREGA_LOAD = createAction(
  '[API] Valor Configuracion Load',
  props<{payload: any}>(),
);
export const SAVE_CONFIG_TIEMPO_ENTREGA_ERROR = createAction(
  '[API] Valor Configuracion Error',
  props<{error: any}>(),
);
