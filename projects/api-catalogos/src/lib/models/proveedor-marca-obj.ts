/* tslint:disable */
import { Proveedor } from './proveedor';
export interface ProveedorMarcaObj {
  Activo?: boolean;
  CotizarAlternos?: boolean;
  CotizarComplementarios?: boolean;
  Direccion?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdCatPaisCompra?: string;
  IdCatPaisManufactura?: string;
  IdMarca?: string;
  Nombre?: string;
  NombreImagen?: string;
  Proveedores?: Array<Proveedor>;
  RazonSocial?: string;
  TaxId?: string;
}
