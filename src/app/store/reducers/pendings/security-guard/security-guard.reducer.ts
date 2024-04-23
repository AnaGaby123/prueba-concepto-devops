import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

import {
  initialSecurityGuard,
  ISecurityGuard,
} from '@appModels/store/pendings/security-guard/security-guard.models';
import {securityGuardDetailsReducer} from '@appReducers/pendings/security-guard/security-guard-details/security-guard-details.reducer';
import {
  SET_EDIT_MODE,
  SET_NEW_CONTACT,
} from '@appActions/pendings/security-guard/security-guard.actions';

export const securityGuardReducer: ActionReducer<ISecurityGuard> = combineReducers(
  {
    securityGuardDetails: securityGuardDetailsReducer,
    title: createReducer(initialSecurityGuard().title),
    editMode: createReducer(
      initialSecurityGuard().editMode,
      on(SET_EDIT_MODE, (state, {editMode}) => editMode),
    ),
    addNewVisitant: createReducer(
      initialSecurityGuard().addNewVisitant,
      on(SET_NEW_CONTACT, (state, {newContact}) => newContact),
    ),
  },
  {...initialSecurityGuard()},
);
