/* tslint:disable */
import { ContratoClienteMarcaConfiguracionCatClasificacionProductoObj } from './contrato-cliente-marca-configuracion-cat-clasificacion-producto-obj';
import { ContratoClienteMarcaConfiguracionGeneralObj } from './contrato-cliente-marca-configuracion-general-obj';
import { ContratoClienteMarcaConfiguracionPrecioListaObj } from './contrato-cliente-marca-configuracion-precio-lista-obj';
import { ContratoClienteMarcaConfiguracionProductoObj } from './contrato-cliente-marca-configuracion-producto-obj';
import { Marca } from './marca';
export interface ContratoClienteMarcaObj {
  Activo?: boolean;
  ContratoClienteMarcaConfiguracionCatClasificacionProducto?: Array<ContratoClienteMarcaConfiguracionCatClasificacionProductoObj>;
  ContratoClienteMarcaConfiguracionGeneral?: Array<ContratoClienteMarcaConfiguracionGeneralObj>;
  ContratoClienteMarcaConfiguracionPrecioLista?: Array<ContratoClienteMarcaConfiguracionPrecioListaObj>;
  ContratoClienteMarcaConfiguracionProducto?: Array<ContratoClienteMarcaConfiguracionProductoObj>;
  IdContratoCliente?: string;
  IdContratoClienteMarca?: string;
  IdMarca?: string;
  Marca?: Marca;
}
