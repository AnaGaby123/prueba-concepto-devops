/* tslint:disable */
import { ContratoCliente } from './contrato-cliente';
import { ContratoClienteMarca } from './contrato-cliente-marca';
import { ContratoClienteMarcaConfiguracion } from './contrato-cliente-marca-configuracion';
import { ContratoClienteMarcaConfiguracionCatClasificacionProducto } from './contrato-cliente-marca-configuracion-cat-clasificacion-producto';
import { ContratoClienteMarcaConfiguracionGeneral } from './contrato-cliente-marca-configuracion-general';
import { ContratoClienteMarcaConfiguracionPrecioLista } from './contrato-cliente-marca-configuracion-precio-lista';
import { ContratoClienteMarcaConfiguracionProducto } from './contrato-cliente-marca-configuracion-producto';
import { ValorConfiguracionTiempoEntrega } from './valor-configuracion-tiempo-entrega';
export interface ConfContratoCliente {
  ContratoCliente?: ContratoCliente;
  ContratoClienteMarca?: ContratoClienteMarca;
  ContratoClienteMarcaConfiguracion?: ContratoClienteMarcaConfiguracion;
  ContratoClienteMarcaConfiguracionCatClasificacionProducto?: ContratoClienteMarcaConfiguracionCatClasificacionProducto;
  ContratoClienteMarcaConfiguracionGeneral?: ContratoClienteMarcaConfiguracionGeneral;
  ContratoClienteMarcaConfiguracionPrecioLista?: ContratoClienteMarcaConfiguracionPrecioLista;
  ContratoClienteMarcaConfiguracionProducto?: ContratoClienteMarcaConfiguracionProducto;
  ValorConfiguracionTiempoEntrega?: ValorConfiguracionTiempoEntrega;
}
