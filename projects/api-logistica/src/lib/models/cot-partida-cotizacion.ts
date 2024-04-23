/* tslint:disable */
export interface CotPartidaCotizacion {
  Activo?: boolean;
  AjusteDeOferta?: boolean;
  AjusteRealizado?: boolean;
  AplicaFleteExpress?: boolean;
  Cancelacion?: boolean;
  Comentarios?: string;
  ConfiguracionSeguimientoPendiente?: boolean;
  EnCerrarOferta?: boolean;
  IdAjOfFleteExpressCotizacion?: string;
  IdCatTipoPartidaCotizacion?: string;
  IdCotCotizacion?: string;
  IdCotPartidaCotizacion?: string;
  IdCotPartidaCotizacionMadre?: string;
  IdCotPartidaCotizacionOriginal?: string;
  IdCotProductoOferta?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  JustificacionAjuste?: string;
  Nota?: string;
  Numero?: number;
  PrecioTotalCotizado?: number;
  PrecioTotalMXN?: number;
  PrecioTotalUSD?: number;
  PromesaDeCompra?: boolean;
  Seguimiento?: boolean;
  TiempoEstimadoEntrega?: number;
  TiempoEstimadoEntregaOriginal?: number;
  VerEnAjusteOferta?: boolean;
  rechazoStock?: boolean;
}
