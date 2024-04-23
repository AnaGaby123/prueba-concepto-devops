import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ArchivoDetalle} from 'api-logistica';

const typeReducer = 'availability-letter-dialog-reducerS';
export const SET_STATUS_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set status file '),
  props<{status: number}>(),
);
export const SET_LEGAL_REPRESENTATIVE = createAction(
  buildingStringActionType(typeReducer, 'Set legal representative'),
  props<{legalRepresentative: DropListOption; idPedido: string; inPreprocess: boolean}>(),
);
export const SET_FILE_AVAILABILITY_LETTER = createAction(
  buildingStringActionType(typeReducer, 'Set File availability letter'),
  props<{file: ArchivoDetalle}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial state'),
);
