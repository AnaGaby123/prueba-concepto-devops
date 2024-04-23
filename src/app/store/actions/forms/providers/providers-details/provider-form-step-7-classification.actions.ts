import {createAction, props} from '@ngrx/store';
// Models
import {IVMarcaFamilia} from '@appModels/store/forms/providers/providers-details/provider-form-step-7-classification.model';
import {AgrupadorCaracteristica} from 'api-catalogos';
import {ICard} from '@appModels/card/card';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'ProviderFormStep7Api';
const typeReducer = 'ProviderFormStep7Reducer';

export const SET_FAMILIES_PROVIDER_API_STATUS = createAction(
  buildingStringActionType(typeApi, 'Set Families Provider Api Status'),
  props<{familiesApiStatus: number}>(),
);
export const GET_FAMILIES_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Families of Provider Load'),
);
export const GET_FAMILIES_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Families of Provider Load Success'),
  props<{list: Array<IVMarcaFamilia>}>(),
);
export const GET_FAMILIES_PROVIDER_ERROR = createAction(
  buildingStringActionType(typeApi, 'Get Families of Provider Load Error'),
  props<{error: any}>(),
);
export const UPDATE_FAMILY_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Update Family Selected'),
  props<{item: IVMarcaFamilia}>(),
);
export const SELECT_FAMILY_CARD = createAction(
  buildingStringActionType(typeApi, 'Select Family Card'),
  props<{itemId: string}>(),
);
export const GET_CONCEPTS_FAMILY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Concepts of Family Success'),
  props<{list: Array<AgrupadorCaracteristica>}>(),
);
export const SET_CONCEPT = createAction(
  buildingStringActionType(typeApi, 'Set Concept of Family'),
  props<{concept: string}>(),
);
export const VERIFY_DUPLICATE_CONCEPT = createAction(
  buildingStringActionType(typeReducer, 'Verify Duplicate Concept in SelectedFamily'),
);
export const ADD_CONCEPT_FAMILY = createAction(
  buildingStringActionType(typeApi, 'Add Concept of Family'),
);
export const DELETE_CONCEPT_FAMILY = createAction(
  buildingStringActionType(typeApi, 'Delete Concept of Family'),
  props<{item: AgrupadorCaracteristica}>(),
);
export const SAVE_CONCEPTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save Concepts of Family'),
);
export const DELETE_CONCEPTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Delete concepts success'),
);
export const SAVE_FAMILIES_DATA = createAction(
  buildingStringActionType(typeApi, 'Save families data'),
);
export const SAVE_FAMILIES_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save families data success'),
  props<{conceptsList: Array<AgrupadorCaracteristica>}>(),
);
export const SET_CLASSIFICATION_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Set Classification backUp'),
);
export const RESTORE_CLASSIFICATION_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Restore classification backup'),
);
export const CLEAN_STATE = createAction(buildingStringActionType(typeReducer, 'Clean state'));
export const HANDLE_SELECTED_FAMILY_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle selected family component effect'),
  props<{selectedFamily: ICard}>(),
);
export const SET_PRESELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set preselected family'),
  props<{selectedFamily: ICard}>(),
);
export const HANDLE_CLOSE_POP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle close pop component effect'),
  props<{value: boolean}>(),
);
export const SELECT_FAMILY_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Select family component effect'),
);
