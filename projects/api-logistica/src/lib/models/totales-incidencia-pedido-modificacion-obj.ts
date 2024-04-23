/* tslint:disable */
import { VClienteModificacionPedido } from './vcliente-modificacion-pedido';
export interface TotalesIncidenciaPedidoModificacionObj {
  Clientes?: number;
  ClientesModificacionPedido?: Array<VClienteModificacionPedido>;
  TotalPedidos?: number;
  TotalPedidosConIncidencias?: number;
  TotalPedidosSinIncidencias?: number;
  ValorTotal?: number;
  ValorTotalPedidosConIncidencias?: number;
  ValorTotalPedidosSinIncidencias?: number;
}
