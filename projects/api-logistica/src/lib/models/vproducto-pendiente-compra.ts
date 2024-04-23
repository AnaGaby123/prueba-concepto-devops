/* tslint:disable */
export interface VProductoPendienteCompra {
  AsignadoStock?: boolean;
  Catalogo?: string;
  ClaveMoneda?: string;
  Descripcion?: string;
  FechaEstimadaEntrega?: string;
  FleteExpress?: boolean;
  FolioPedidoInterno?: string;
  IdCatMoneda?: string;
  IdFamilia?: string;
  IdOcPartida?: string;
  IdOcPendienteCompraProducto?: string;
  IdProducto?: string;
  IdProveedor?: string;
  Moneda?: string;
  MontoIVA?: number;
  NombreCliente?: string;
  NombreProveedor?: string;
  NumeroDePiezas?: number;
  NumeroDePiezasStock?: number;
  NumeroPiezasOcPartidaStock?: number;
  PartidaProgramada?: boolean;
  PartidaRegular?: boolean;
  PrecioLista?: number;
  StockDisponible?: boolean;
  TotalPartida?: number;
}
