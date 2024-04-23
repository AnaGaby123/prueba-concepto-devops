import {createReducer, on} from '@ngrx/store';
import {
  AvailabilityLetterModel,
  initialAvailabilityLetterState,
} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {availabilityActions} from '@appActions/dialogs';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export const availabilityLetterReducer = createReducer(
  initialAvailabilityLetterState(),
  on(
    availabilityActions.SET_LEGAL_REPRESENTATIVE,
    (state: AvailabilityLetterModel, {legalRepresentative}): AvailabilityLetterModel => ({
      ...state,
      availabilityLetterFile: null,
      legalRepresentativeSelected: legalRepresentative,
      statusFile: API_REQUEST_STATUS_DEFAULT,
    }),
  ),
  on(
    availabilityActions.SET_STATUS_FILE,
    (state: AvailabilityLetterModel, {status}): AvailabilityLetterModel => ({
      ...state,
      statusFile: status,
    }),
  ),
  on(
    availabilityActions.SET_FILE_AVAILABILITY_LETTER,
    (state: AvailabilityLetterModel, {file}): AvailabilityLetterModel => ({
      ...state,
      availabilityLetterFile: file,
    }),
  ),
  on(
    availabilityActions.SET_INITIAL_STATE,
    (state: AvailabilityLetterModel): AvailabilityLetterModel => ({
      ...initialAvailabilityLetterState(),
    }),
  ),
);
