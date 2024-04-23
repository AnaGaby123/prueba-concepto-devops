/* tslint:disable */
import { Archivo } from './archivo';
import { VCliente } from './vcliente';
import { ContratoClienteMarcaObj } from './contrato-cliente-marca-obj';
import { CatCondicionesDePago } from './cat-condiciones-de-pago';
export interface ContratoClienteDetalle {
  Activo?: boolean;
  Acuerdo?: boolean;
  ApellidoMaternoFirma?: string;
  ApellidoMaternoRepresentanteLegalEmpresa?: string;
  ApellidoMaternoRepresentanteLegalFirma?: string;
  ApellidoPaternoFirma?: string;
  ApellidoPaternoRepresentanteLegalEmpresa?: string;
  ApellidoPaternoRepresentanteLegalFirma?: string;
  ArchivoContrato?: Archivo;
  ArchivoContratoFirmado?: Archivo;
  Cliente?: VCliente;
  ClienteEnvia?: boolean;
  Contrato?: boolean;
  ContratoClienteMarca?: Array<ContratoClienteMarcaObj>;
  FechaFin?: string;
  FechaInicio?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Folio?: string;
  IdArchivoContrato?: string;
  IdArchivoContratoFirmado?: string;
  IdCatCondicionesDePago?: string;
  IdCliente?: string;
  IdContratoCliente?: string;
  IdEmpresa?: string;
  NombreFirma?: string;
  NombreRepresentanteLegalEmpresa?: string;
  NombreRepresentanteLegalFirma?: string;
  Observacion?: string;
  Puesto?: string;
  catCondicionesDePago?: CatCondicionesDePago;
}
