/* tslint:disable */
import { ConceptoAgenteAduanal } from './concepto-agente-aduanal';
import { ConfiguracionPrecioProveedor } from './configuracion-precio-proveedor';
import { ConfiguracionPrecioProveedorFamilia } from './configuracion-precio-proveedor-familia';
import { ConfiguracionProveedorFamiliaGeneral } from './configuracion-proveedor-familia-general';
import { ConfiguracionTiempoEntregaProveedorFamilia } from './configuracion-tiempo-entrega-proveedor-familia';
import { MarcaFamiliaProveedor } from './marca-familia-proveedor';
import { MarcaFamiliaProveedorConsolidacion } from './marca-familia-proveedor-consolidacion';
export interface ConfProveedorCompra {
  ConceptoAgenteAduanal?: ConceptoAgenteAduanal;
  ConfiguracionPrecioProveedor?: ConfiguracionPrecioProveedor;
  ConfiguracionPrecioProveedorFamilia?: ConfiguracionPrecioProveedorFamilia;
  ConfiguracionProveedorFamiliaGeneral?: ConfiguracionProveedorFamiliaGeneral;
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  MarcaFamiliaProveedor?: MarcaFamiliaProveedor;
  MarcaFamiliaProveedorConsolidacion?: Array<MarcaFamiliaProveedorConsolidacion>;
}
