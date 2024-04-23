/* tslint:disable */
import { MarcaFamiliaSubtipoObj } from './marca-familia-subtipo-obj';
export interface MarcaFamiliaTipoObj {
  ClaveTipo?: string;
  IdCatTipoProducto?: string;
  Orden?: number;
  Subtipos?: Array<MarcaFamiliaSubtipoObj>;
  Tipo?: string;
}
