/* tslint:disable */
import { Proveedor } from './proveedor';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
export interface CotCotizacionFleteExpressDetalle {
  Activo?: boolean;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  GravaIVA?: boolean;
  IdCotCotizacion?: string;
  IdCotCotizacionFleteExpress?: string;
  IdProveedor?: string;
  PorcentajeProquifa?: number;
  Precio?: number;
  PrecioAjustado?: number;
  PrecioDeOrigen?: number;
  PrecioIVA?: number;
  PrecioTotal?: number;
  Proveedor?: Proveedor;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
}
