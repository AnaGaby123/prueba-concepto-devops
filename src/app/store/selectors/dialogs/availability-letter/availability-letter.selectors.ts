import {createSelector} from '@ngrx/store';
import {selectAvailabilityLetterState} from '@appSelectors/dialogs/dialogs.selectors';
import {AvailabilityLetterModel} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {ArchivoDetalle} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectCatLegalRepresentatives} from '@appSelectors/catalogs/catalogs.selectors';
import {EmpleadoDetalleObj} from 'api-logistica';
import {map} from 'lodash-es';
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

export const selectAvailabilityLetterFile = createSelector(
  selectAvailabilityLetterState,
  (state: AvailabilityLetterModel): ArchivoDetalle => state.availabilityLetterFile,
);
export const selectLegalRepresentativeSelected = createSelector(
  selectAvailabilityLetterState,
  (state: AvailabilityLetterModel): DropListOption => state.legalRepresentativeSelected,
);
export const selectStatusFile = createSelector(
  selectAvailabilityLetterState,
  (state: AvailabilityLetterModel): number => state.statusFile,
);
export const selectLegalRepresentatives = createSelector(
  selectCatLegalRepresentatives,
  (state): Array<DropListOption> =>
    map(
      state.listLegalRepresentatives,
      (o: EmpleadoDetalleObj): DropListOption => ({
        value: o.IdEmpleado,
        label: `${o.Nombres} ${o?.ApellidoPaterno !== null ? `${o?.ApellidoPaterno}` : ''} ${
          o?.ApellidoMaterno !== null ? `${o?.ApellidoMaterno} ` : ''
        }`,
      }),
    ),
);

export const selectValidationAvailabilityConfirmation = createSelector(
  selectAvailabilityLetterState,
  (state: AvailabilityLetterModel): boolean =>
    !!(state.statusFile === API_REQUEST_STATUS_SUCCEEDED && state.legalRepresentativeSelected),
);
