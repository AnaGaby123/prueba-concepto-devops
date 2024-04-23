/* tslint:disable */
import { MarcaFamiliaIndustriaObj } from './marca-familia-industria-obj';
export interface MarcaFamiliaSectorObj {
  ClaveSector?: string;
  IdCatSector?: string;
  Industrias?: Array<MarcaFamiliaIndustriaObj>;
  Sector?: string;
}
