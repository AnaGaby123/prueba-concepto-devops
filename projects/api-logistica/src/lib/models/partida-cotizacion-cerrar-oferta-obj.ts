/* tslint:disable */
import { CotPartidaCotizacionCapacitacionFecha } from './cot-partida-cotizacion-capacitacion-fecha';
import { CotPartidaCotizacionSeguimiento } from './cot-partida-cotizacion-seguimiento';
import { AjOfCondicionesdePagoCotizacion } from './aj-of-condicionesde-pago-cotizacion';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
import { AjOfPrecioCotizacion } from './aj-of-precio-cotizacion';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from './aj-of-valor-configuracion-tiempo-entrega-cotizacion';
import { CotCancelacionPartidaCotizacion } from './cot-cancelacion-partida-cotizacion';
import { CotCotizacionFleteExpress } from './cot-cotizacion-flete-express';
import { CotProductoOferta } from './cot-producto-oferta';
import { CotPromesaDeCompraPartida } from './cot-promesa-de-compra-partida';
import { CatMotivoSeguimientoCotizacion } from './cat-motivo-seguimiento-cotizacion';
import { Proveedor } from './proveedor';
import { VProducto } from './vproducto';
export interface PartidaCotizacionCerrarOfertaObj {
  Activo?: boolean;
  AjusteDeOferta?: boolean;
  AjusteRealizado?: boolean;
  AplicaFleteExpress?: boolean;
  AplicaPorPieza?: boolean;
  Autor?: string;
  CAS?: string;
  Caducada?: boolean;
  CaducadaCaducidadPrecio?: boolean;
  CaducadaCuraduria?: boolean;
  CaducadaPrecio?: boolean;
  CaducadaRegistroSanitario?: boolean;
  CaducadaTipoDeCambio?: boolean;
  Cancelacion?: boolean;
  CantidadExistenteStock?: number;
  CatControlClave?: string;
  Catalogo?: string;
  ClaveMedioDifusion?: string;
  ClaveMoneda?: string;
  ClaveTipoPartidaCotizacion?: string;
  Comentarios?: string;
  ConfiguracionCancelacionPartida?: boolean;
  ConfiguracionFleteExpress?: boolean;
  ConfiguracionPromesaDeCompra?: boolean;
  ConfiguracionSeguimiento?: boolean;
  ConfiguracionSeguimientoPendiente?: boolean;
  Configurada?: boolean;
  Control?: string;
  Controlado?: boolean;
  Descripcion?: string;
  Disponibilidad?: string;
  DisponibilidadClave?: string;
  DuracionEvento?: number;
  EnCerrarOferta?: boolean;
  EstadoCotizacion?: string;
  FechaCaducado?: string;
  FechaCaducidadLote?: string;
  FechaCaducidadStock?: string;
  FechaCaducidadVigenciaCuraduria?: string;
  FechaDisponibilidadBackOrder?: string;
  FechaVencimiento?: string;
  FechasRealizacionCapacitacion?: Array<CotPartidaCotizacionCapacitacionFecha>;
  FleteDesglosado?: boolean;
  FormatoPublicacion?: string;
  GravaIVA?: boolean;
  IdAjOfFleteExpressCotizacion?: string;
  IdCatControl?: string;
  IdCatEstadoCotizacion?: string;
  IdCatMoneda?: string;
  IdCatRestriccionDeCompra?: string;
  IdCatSubtipoProducto?: string;
  IdCatTipoPartidaCotizacion?: string;
  IdCatTipoPresentacion?: string;
  IdCatTipoProducto?: string;
  IdCliente?: string;
  IdCotCotizacion?: string;
  IdCotPartidaCotizacion?: string;
  IdCotPartidaCotizacionMadre?: string;
  IdCotPartidaCotizacionOriginal?: string;
  IdCotProductoOferta?: string;
  IdMarca?: string;
  IdProducto?: string;
  IdProveedorPrincipal?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  JustificacionAjuste?: string;
  ListaCotPartidaCotizacionSeguimiento?: Array<CotPartidaCotizacionSeguimiento>;
  MedioDifusion?: string;
  NombreImagenMarca?: string;
  NombreLote?: string;
  NombreMarca?: string;
  NombrePaisOrigen?: string;
  Nota?: string;
  Numero?: number;
  NumeroDePersonasPorGrupo?: number;
  NumeroDePiezas?: number;
  Orden?: number;
  Original?: boolean;
  PaisClaveProveedor?: string;
  PartidaConfigAjusteOferta?: number;
  PartidaConfigCancelacion?: number;
  PartidaConfigPromesCompra?: number;
  PartidaConfigSeguimiento?: number;
  PorcentajeIVA?: number;
  PorcentajeSobrePrecioCalculado?: number;
  PorcentajeSobrePrecioPactado?: number;
  PrecioCotizadoSubtotal?: number;
  PrecioCotizadoTotal?: number;
  PrecioCotizadoUnitarioConFlete?: number;
  PrecioCotizadoUnitarioConvertido?: number;
  PrecioCotizadoUnitarioMonedaOriginal?: number;
  PrecioCotizadoUnitarioPactado?: number;
  PrecioFleteNoDesglosado?: number;
  PrecioFleteNoDesglosadoIVA?: number;
  PrecioIVA?: number;
  PrecioLista?: number;
  PrecioListaConvertido?: number;
  PrecioPorGrupo?: boolean;
  PrecioPorPersona?: boolean;
  PrecioTotalCotizado?: number;
  PrecioTotalMXN?: number;
  PrecioTotalUSD?: number;
  Presentacion?: string;
  ProductoCapacitacionDescripcion?: string;
  PromesaDeCompra?: boolean;
  ProximoACaducar?: boolean;
  Publicaciones?: boolean;
  RestriccionDeCompra?: string;
  RestriccionDeCompraClave?: string;
  RestriccionProductoNumeroDePiezas?: number;
  Seguimiento?: boolean;
  Subtipo?: string;
  TiempoEntrega?: string;
  TiempoEstimadoEntrega?: number;
  TiempoEstimadoEntregaOriginal?: number;
  TieneStock?: boolean;
  Tipo?: string;
  TipoPartidaCotizacion?: string;
  TipoPresentacion?: string;
  TotalAlternativo?: number;
  TotalComplementario?: number;
  TotalCotizacionesVinculadas?: number;
  TotalSuplementario?: number;
  Unidad?: string;
  UnidadTiempo?: string;
  Uso?: string;
  VerEnAjusteOferta?: boolean;
  ajOfCondicionesdePagoCotizacion?: AjOfCondicionesdePagoCotizacion;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
  ajOfPrecioCotizacion?: AjOfPrecioCotizacion;
  ajOfValorConfiguracionTiempoEntregaCotizacion?: AjOfValorConfiguracionTiempoEntregaCotizacion;
  cotCancelacionPartidaCotizacion?: CotCancelacionPartidaCotizacion;
  cotCotizacionFleteExpress?: CotCotizacionFleteExpress;
  cotProductoOferta?: CotProductoOferta;
  cotPromesaDeCompraPartida?: CotPromesaDeCompraPartida;
  listaCatMotivoSeguimientoCotizacion?: Array<CatMotivoSeguimientoCotizacion>;
  proveedorFleteExpress?: Proveedor;
  rechazoStock?: boolean;
  vProducto?: VProducto;
}