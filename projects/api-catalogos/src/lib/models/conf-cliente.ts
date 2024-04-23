/* tslint:disable */
import { ClienteFamilia } from './cliente-familia';
import { ConceptoAgenteAduanal } from './concepto-agente-aduanal';
import { ConfiguracionClienteFamiliaClasificacion } from './configuracion-cliente-familia-clasificacion';
import { ConfiguracionClienteFamiliaCosto } from './configuracion-cliente-familia-costo';
import { ConfiguracionClienteFamiliaGeneral } from './configuracion-cliente-familia-general';
import { ConfiguracionClienteFamiliaProducto } from './configuracion-cliente-familia-producto';
import { ConfiguracionPrecioCliente } from './configuracion-precio-cliente';
import { ValorConfiguracionTiempoEntrega } from './valor-configuracion-tiempo-entrega';
export interface ConfCliente {
  ClienteFamilia?: ClienteFamilia;
  ConceptoAgenteAduanal?: ConceptoAgenteAduanal;
  ConfiguracionClienteFamiliaClasificacion?: ConfiguracionClienteFamiliaClasificacion;
  ConfiguracionClienteFamiliaCosto?: ConfiguracionClienteFamiliaCosto;
  ConfiguracionClienteFamiliaGeneral?: ConfiguracionClienteFamiliaGeneral;
  ConfiguracionClienteFamiliaProducto?: ConfiguracionClienteFamiliaProducto;
  ConfiguracionPrecioCliente?: ConfiguracionPrecioCliente;
  ValorConfiguracionTiempoEntrega?: ValorConfiguracionTiempoEntrega;
}
