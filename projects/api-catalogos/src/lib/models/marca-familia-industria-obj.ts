/* tslint:disable */
import { MarcaFamiliaTipoObj } from './marca-familia-tipo-obj';
export interface MarcaFamiliaIndustriaObj {
  ClaveIndustria?: string;
  IdCatIndustria?: string;
  Industria?: string;
  Orden?: number;
  Tipos?: Array<MarcaFamiliaTipoObj>;
}
