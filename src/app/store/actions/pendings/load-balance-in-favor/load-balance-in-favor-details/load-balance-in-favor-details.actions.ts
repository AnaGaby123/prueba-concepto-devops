/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Load-Balance-In-Favor-Details';

export const SET_COMPANY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{companySelected: DropListOption}>(),
);
