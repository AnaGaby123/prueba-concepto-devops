import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {AgrupadorCaracteristica, VMarcaFamilia} from 'api-catalogos';
import {ICard} from '@appModels/card/card';

export interface ClassificationState {
  familiesList: Array<IVMarcaFamilia>;
  familiesApiStatus: number;
  selectedFamily: IVMarcaFamilia;
  selectedFamilyBackup: IVMarcaFamilia;
  concept: AgrupadorCaracteristica;
  isConceptDuplicate: boolean;
  alertPop: boolean;
  preSelectedFamily: ICard;
}

export const initialClassification = (): ClassificationState => ({
  familiesList: [],
  familiesApiStatus: API_REQUEST_STATUS_DEFAULT,
  selectedFamily: null,
  selectedFamilyBackup: null,
  concept: initialConcepto(),
  isConceptDuplicate: false,
  alertPop: false,
  preSelectedFamily: null,
});

export interface IVMarcaFamilia extends VMarcaFamilia {
  needsToReload?: boolean;
  isSelected?: boolean;
  conceptsList?: Array<AgrupadorCaracteristica>;
  deletedConceptsList?: Array<AgrupadorCaracteristica>;
}

export const initialConcepto = (): AgrupadorCaracteristica => ({
  Activo: true,
  Descripcion: '',
  FechaRegistro: DEFAULT_DATE,
  IdMarcaFamilia: null,
  IdAgrupadorCaracteristica: DEFAULT_UUID,
  FechaUltimaActualizacion: DEFAULT_DATE,
});
