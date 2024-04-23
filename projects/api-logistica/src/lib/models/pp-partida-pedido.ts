/* tslint:disable */
export interface PpPartidaPedido {
  Activo?: boolean;
  AplicaFleteExpress?: boolean;
  CantidadExistenteStock?: number;
  Comentarios?: string;
  FechaCaducidadStock?: string;
  FechaEstimadaEntrega?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  GravaIVA?: boolean;
  IVA?: number;
  IdPPIncidenciaPartidaPedido?: string;
  IdPPPPartidaPedidoCorregida?: string;
  IdPPPartidaPedido?: string;
  IdPPPartidaPedidoConfiguracion?: string;
  IdPPPartidaPedidoMadre?: string;
  IdPPPedido?: string;
  IdPcPartidaPromesaDeCompra?: string;
  IdProducto?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  Notas?: string;
  Numero?: number;
  NumeroDePiezas?: number;
  PrecioFleteNoDesglosado?: number;
  PrecioFleteNoDesglosadoIVA?: number;
  PrecioUnitario?: number;
  Programada?: boolean;
  TiempoEstimadoEntrega?: number;
  Total?: number;
  Tramitada?: boolean;
  Validada?: boolean;
}
