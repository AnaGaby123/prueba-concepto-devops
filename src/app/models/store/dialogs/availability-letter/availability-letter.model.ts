import {ArchivoDetalle} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface AvailabilityLetterModel {
  availabilityLetterFile?: ArchivoDetalle;
  isLoadingFile?: boolean;
  legalRepresentativeSelected?: DropListOption;
  statusFile?: number;
}
export interface AvailabilityLetterData {
  idPedido: string;
  inPreprocess: boolean;
  onlyOneButton: boolean;
}
export const initialAvailabilityLetterState = (): AvailabilityLetterModel => ({
  availabilityLetterFile: null,
  isLoadingFile: false,
  legalRepresentativeSelected: null,
  statusFile: API_REQUEST_STATUS_DEFAULT,
});
