/* tslint:disable */
import { ConfiguracionProveedorFamiliaGeneral } from './configuracion-proveedor-familia-general';
import { ConfiguracionTiempoEntregaProveedorFamilia } from './configuracion-tiempo-entrega-proveedor-familia';
import { ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj } from './configuracion-tiempo-entrega-proveedor-familia-ruta-entrega-obj';
import { MarcaFamiliaProveedor } from './marca-familia-proveedor';
export interface ConfProveedorLogistica {
  ConfiguracionProveedorFamiliaGeneral?: ConfiguracionProveedorFamiliaGeneral;
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega?: Array<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj>;
  MarcaFamiliaProveedor?: MarcaFamiliaProveedor;
}
