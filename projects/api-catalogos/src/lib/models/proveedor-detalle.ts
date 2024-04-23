/* tslint:disable */
import { VContacto } from './vcontacto';
import { CorreoElectronico } from './correo-electronico';
import { NumeroTelefonico } from './numero-telefonico';
import { TiempoEntregaProveedor } from './tiempo-entrega-proveedor';
import { CatMoneda } from './cat-moneda';
export interface ProveedorDetalle {
  Activo?: boolean;
  ClaveMonedaPagos?: string;
  ClaveMonedaVentas?: string;
  CodigoPais?: string;
  Contacto?: VContacto;
  CorreoElectronico?: Array<CorreoElectronico>;
  DTA?: number;
  ExisteRelacionComercial?: boolean;
  FechaIngreso?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IGI?: number;
  IdCatMonedaPagos?: string;
  IdCatMonedaVentas?: string;
  IdCatPais?: string;
  IdProveedor?: string;
  IdUsuarioComprador?: string;
  IdUsuarioPagador?: string;
  MesInicioFiscal?: number;
  Mexicano?: boolean;
  MonedaPagos?: string;
  MonedaVentas?: string;
  Nombre?: string;
  NombreImagen?: string;
  NumeroTelefonico?: Array<NumeroTelefonico>;
  ObjetivoCrecimientoDeseado?: number;
  ObjetivoCrecimientoFundamental?: number;
  Observaciones?: string;
  Pais?: string;
  RazonSocial?: string;
  Rol?: string;
  TiempoEntregaProveedor?: Array<TiempoEntregaProveedor>;
  Web?: string;
  catMoneda?: CatMoneda;
}
