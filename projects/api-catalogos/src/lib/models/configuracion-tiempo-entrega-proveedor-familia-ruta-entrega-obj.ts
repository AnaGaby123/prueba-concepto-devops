/* tslint:disable */
import { ValorConfiguracionTiempoEntrega } from './valor-configuracion-tiempo-entrega';
import { CatRutaEntrega } from './cat-ruta-entrega';
export interface ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj {
  DiasAlmacenAInspeccion?: number;
  DiasArriboAImportacion?: number;
  DiasCompraAEmbarque?: number;
  DiasConsolidacionPharma?: number;
  DiasEmbarqueAArribo?: number;
  DiasImportacionAAlmacen?: number;
  DiasInspeccionAEmbalaje?: number;
  DiasPedidoACompra?: number;
  IdCatRutaEntrega?: string;
  IdConfiguracionTiempoEntregaProveedorFamilia?: string;
  IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  ValorConfiguracionTiempoEntrega?: ValorConfiguracionTiempoEntrega;
  catRutaEntrega?: CatRutaEntrega;
}
