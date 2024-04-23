/* tslint:disable */
import { VMarcaFamiliaDetalle } from './vmarca-familia-detalle';
export interface VMarcaDetalle {
  Activo?: boolean;
  Capacitaciones?: number;
  CotizarAlternos?: boolean;
  CotizarComplementarios?: boolean;
  Direccion?: string;
  DispositivoMedico?: number;
  Estandares?: number;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdCatPaisCompra?: string;
  IdCatPaisManufactura?: string;
  IdMarca?: string;
  Labware?: number;
  Nombre?: string;
  NombreImagen?: string;
  Publicaciones?: number;
  RazonSocial?: string;
  Reactivos?: number;
  TaxId?: string;
  TotalProductos?: number;
  vMarcaFamiliaDetalle?: Array<VMarcaFamiliaDetalle>;
}
