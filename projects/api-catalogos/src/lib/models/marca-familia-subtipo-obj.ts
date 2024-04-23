/* tslint:disable */
import { MarcaFamiliaControlObj } from './marca-familia-control-obj';
export interface MarcaFamiliaSubtipoObj {
  ClaveSubtipo?: string;
  Controles?: Array<MarcaFamiliaControlObj>;
  IdCatSubTipoProducto?: string;
  Orden?: number;
  Subtipo?: string;
}
