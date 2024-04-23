/* tslint:disable */
export interface VClienteModificacionPedido {
  FechaPedidoMasAntigua?: string;
  FechaPedidoMasReciente?: string;
  IdCliente?: string;
  Nombre?: string;
  PedidosConIncidencias?: number;
  PedidosSinIncidencias?: number;
  TotalPartidas?: number;
  TotalPedidos?: number;
  ValorTotalUSD?: number;
}
