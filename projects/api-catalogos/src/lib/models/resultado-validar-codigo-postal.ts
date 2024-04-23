/* tslint:disable */
import { CodigoPostal } from './codigo-postal';
export interface ResultadoValidarCodigoPostal {
  CodigoComparado?: CodigoPostal;
  Colonia?: boolean;
  Estado?: boolean;
  Municipio?: boolean;
  Valido?: boolean;
}
