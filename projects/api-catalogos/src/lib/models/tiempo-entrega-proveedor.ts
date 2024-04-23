/* tslint:disable */
import { ValorConfiguracionTiempoEntrega } from './valor-configuracion-tiempo-entrega';
import { CatRutaEntrega } from './cat-ruta-entrega';
export interface TiempoEntregaProveedor {
  Activo?: boolean;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatRutaEntrega?: string;
  IdConfiguracionTiempoEntregaProveedor?: string;
  IdProveedor?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  ValorConfiguracionTiempoEntrega?: ValorConfiguracionTiempoEntrega;
  catRutaEntrega?: CatRutaEntrega;
}
