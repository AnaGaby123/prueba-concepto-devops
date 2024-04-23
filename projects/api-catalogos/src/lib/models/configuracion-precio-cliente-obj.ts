/* tslint:disable */
import { ConfCliente } from './conf-cliente';
import { ConfContratoCliente } from './conf-contrato-cliente';
import { ConfProveedor } from './conf-proveedor';
import { ConfProveedorUtilidadComision } from './conf-proveedor-utilidad-comision';
import { Producto } from './producto';
export interface ConfiguracionPrecioClienteObj {
  ConfCliente?: ConfCliente;
  ConfContratoCliente?: ConfContratoCliente;
  ConfProveedor?: ConfProveedor;
  ConfProveedorUtilidadComision?: ConfProveedorUtilidadComision;
  Producto?: Producto;
}
