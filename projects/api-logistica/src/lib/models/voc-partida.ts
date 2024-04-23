/* tslint:disable */
export interface VOcPartida {
  A1Dia?: boolean;
  A2Dias?: boolean;
  A3Dias?: boolean;
  A7Dias?: boolean;
  AMasDe3Dias?: boolean;
  Activo?: boolean;
  CDBackOrder?: boolean;
  CDCancelar?: boolean;
  CDConfirmado?: boolean;
  CDResumen?: boolean;
  Catalogo?: string;
  ClaveMoneda?: string;
  ConfiguracionPartidaEdicionBackOrder?: boolean;
  ConfiguracionPartidaEdicionConImpactoFEE?: boolean;
  ConfiguracionPartidaEdicionSinImpactoFEE?: boolean;
  Confirmada?: boolean;
  Descripcion?: string;
  EstadoPartidaCompra?: boolean;
  EstadoPartidaEnInspeccion?: boolean;
  EstadoPartidaEnTransito?: boolean;
  EstadoPartidaEntregado?: boolean;
  EstadoPartidaPedido?: boolean;
  EstadoPartidaPorEmbalar?: boolean;
  FechaEstimadaDeArribo?: string;
  FechaEstimadaDeArriboOriginal?: string;
  FechaEstimadaEntrega?: string;
  FechaEstimadaEntregaPedido?: string;
  FleteExpress?: boolean;
  FolioPedidoInterno?: string;
  IdCatMoneda?: string;
  IdCliente?: string;
  IdFamilia?: string;
  IdImpListaArribo?: string;
  IdMarcaFamilia?: string;
  IdOcOrdenDeCompra?: string;
  IdOcPackingList?: string;
  IdOcPartida?: string;
  IdOcPendienteCompraProducto?: string;
  IdProducto?: string;
  IdProveedor?: string;
  Indice?: number;
  Moneda?: string;
  NombreCliente?: string;
  NombreProveedor?: string;
  NumeroDePiezas?: number;
  NumeroDePiezasStock?: number;
  NumeroOrdenDeCompra?: string;
  OrdenDeCompraConfirmada?: boolean;
  OrdenDeCompraEntregada?: boolean;
  OrdenDeCompraNoConfirmada?: boolean;
  PHS?: boolean;
  PackingListDeclarado?: boolean;
  PartidaProgramada?: boolean;
  PartidaRegular?: boolean;
  PrecioLista?: number;
  PrecioListaUSD?: number;
  RazonSocialEmpresaCompra?: string;
  Stock?: boolean;
  SubIndice?: number;
  TotalPartida?: number;
  TotalUSD?: number;
}