/* tslint:disable */
import { ConceptoAgenteAduanal } from './concepto-agente-aduanal';
import { Direccion } from './direccion';
import { CatPais } from './cat-pais';
export interface AduanaDetalle {
  Activo?: boolean;
  CartaUso?: boolean;
  Certificados?: boolean;
  ConceptosAgenteAduanal?: Array<ConceptoAgenteAduanal>;
  CorreoDeDocumentacion?: string;
  Direccion?: Direccion;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Fletera?: boolean;
  IdAduana?: string;
  IdAgenteAduanal?: string;
  IdCatLugarDespacho?: string;
  IdDireccion?: string;
  LimiteConsolidadoMaximo?: number;
  LimiteConsolidadoMinimo?: number;
  LugarDespachoAICM?: boolean;
  LugarDespachoPHS?: boolean;
  Nafta?: boolean;
  NombreLugar?: string;
  RequiereFacturasComerciales?: boolean;
  RequierePackingList?: boolean;
  catPais?: CatPais;
}
