/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Warehouse-dashboard';

export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{tabSelected: ITabOption}>(),
);
