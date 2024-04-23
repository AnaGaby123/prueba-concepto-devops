import {createAction, props} from '@ngrx/store';

export const SAVE_HORARIO_LOAD = createAction('[API] Save Horario Load', props<{payload: any}>());
export const SAVE_HORARIO_SUCCESS = createAction(
  '[API] Save Horario Success',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_ERROR = createAction('[API] Save Horario Success', props<{error: any}>());
export const SAVE_HORARIO_COBRO_LOAD = createAction(
  '[API] Save Horario Cobro Load',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_COBRO_SUCCESS = createAction(
  '[API] Save Horario Cobro Success',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_COBRO_ERROR = createAction(
  '[API] Save Horario Cobro  Success',
  props<{error: any}>(),
);
export const SAVE_HORARIO_ENTREGA_LOAD = createAction(
  '[API] Save Horario Entrega Load',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_ENTREGA_SUCCESS = createAction(
  '[API] Save Horario Entrega Success',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_ENTREGA_ERROR = createAction(
  '[API] Save Horario Entrega  Success',
  props<{error: any}>(),
);
export const SAVE_HORARIO_REVISION_LOAD = createAction(
  '[API] Save Horario Revision Load',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_REVISION_SUCCESS = createAction(
  '[API] Save Horario Revision Success',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_REVISION_ERROR = createAction(
  '[API] Save Horario Revision  Success',
  props<{error: any}>(),
);
export const SAVE_HORARIO_VISITA_LOAD = createAction(
  '[API] Save Horario Visita Load',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_VISITA_SUCCESS = createAction(
  '[API] Save Horario Visita Success',
  props<{payload: any}>(),
);
export const SAVE_HORARIO_VISITA_ERROR = createAction(
  '[API] Save Horario Visita  Success',
  props<{error: any}>(),
);
export const SAVE_RESTRICCION_ENTREGA_LOAD = createAction(
  '[API] Save Restriccion Entrega Load',
  props<{payload: any}>(),
);
export const SAVE_RESTRICCION_ENTREGA_SUCCESS = createAction(
  '[API] Save Restriccion Entrega Success',
  props<{payload: any}>(),
);
export const SAVE_RESTRICCION_ENTREGA_ERROR = createAction(
  '[API] Save Restriccion Entrega Success',
  props<{error: any}>(),
);
