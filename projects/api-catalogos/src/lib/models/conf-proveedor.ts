/* tslint:disable */
import { ConceptoAgenteAduanal } from './concepto-agente-aduanal';
import { ConfiguracionPrecioProveedor } from './configuracion-precio-proveedor';
import { ConfiguracionPrecioProveedorFamilia } from './configuracion-precio-proveedor-familia';
import { ConfiguracionProveedorFamiliaClasificacion } from './configuracion-proveedor-familia-clasificacion';
import { ConfiguracionProveedorFamiliaCosto } from './configuracion-proveedor-familia-costo';
import { ConfiguracionProveedorFamiliaGeneral } from './configuracion-proveedor-familia-general';
import { ConfiguracionProveedorFamiliaProducto } from './configuracion-proveedor-familia-producto';
import { ConfiguracionTiempoEntregaProveedorFamilia } from './configuracion-tiempo-entrega-proveedor-familia';
import { ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj } from './configuracion-tiempo-entrega-proveedor-familia-ruta-entrega-obj';
import { MarcaFamiliaProveedor } from './marca-familia-proveedor';
import { MarcaFamiliaProveedorConsolidacion } from './marca-familia-proveedor-consolidacion';
import { ValorConfiguracionTiempoEntrega } from './valor-configuracion-tiempo-entrega';
export interface ConfProveedor {
  ConceptoAgenteAduanal?: ConceptoAgenteAduanal;
  ConfiguracionPrecioProveedor?: ConfiguracionPrecioProveedor;
  ConfiguracionPrecioProveedorFamilia?: ConfiguracionPrecioProveedorFamilia;
  ConfiguracionProveedorFamiliaClasificacion?: ConfiguracionProveedorFamiliaClasificacion;
  ConfiguracionProveedorFamiliaCosto?: ConfiguracionProveedorFamiliaCosto;
  ConfiguracionProveedorFamiliaGeneral?: ConfiguracionProveedorFamiliaGeneral;
  ConfiguracionProveedorFamiliaProducto?: ConfiguracionProveedorFamiliaProducto;
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega?: Array<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj>;
  MarcaFamiliaProveedor?: MarcaFamiliaProveedor;
  MarcaFamiliaProveedorConsolidacion?: Array<MarcaFamiliaProveedorConsolidacion>;
  ValorConfiguracionTiempoEntrega?: ValorConfiguracionTiempoEntrega;
}
