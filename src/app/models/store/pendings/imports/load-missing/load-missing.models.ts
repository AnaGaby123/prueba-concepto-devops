/* Models Imports */
import {
  ILoadMissingList,
  initialILoadMissingList,
} from '@appModels/store/pendings/imports/load-missing/load-missing-list/load-missing-list.models';

export const TITLE_LOAD_MISSING = 'CARGAR DOCUMENTACIÓN FALTANTE';

export interface ILoadMissingState {
  title: string;
  detailsMode: boolean;
  loadMissingList: ILoadMissingList;
}

export const initialILoadMissing = (): ILoadMissingState => ({
  title: TITLE_LOAD_MISSING,
  detailsMode: false,
  loadMissingList: initialILoadMissingList(),
});
