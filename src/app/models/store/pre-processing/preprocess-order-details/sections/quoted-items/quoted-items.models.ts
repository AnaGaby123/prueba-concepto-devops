import {
  PpIncidenciaPartida,
  PpPartidaPedidoDetalle,
  PpPartidaPedidoObj,
  PretramitarPedidoPartidaDetalle,
} from 'api-logistica';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface ICorrectData {
  whoBills: boolean;
  businessName: boolean;
  paymentConditions: boolean;
  irregularities: boolean;
  // TODO: AGREGAR REFERENTE A DIRECCIÓN ENTREGA
  /*  deliveryAddress: boolean;*/
}
export interface IItemsOrders {
  Results?: Array<IPpPartidaPedidoDetallePretamitar>;
  TotalResults?: number;
}

export interface IPpPartidaPedidoObj extends PpPartidaPedidoObj {
  validity?: string;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  isNegative?: boolean;
  percentage?: number;
}
export interface ITotalsEntries {
  deleted: number;
  added: number;
  replaced: number;
  controlled: number;
}
export interface IPpPartidaPedidoDetallePretamitar extends PretramitarPedidoPartidaDetalle {
  ListaPPPartidaPedidoOriginales?: IPpPartidaPedidoObj[];
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  deliveryRestrictionsInputIsOpen?: boolean;
  hasInheritIncidences?: boolean;
  Tramitada?: boolean;
  Validada?: boolean | null;
  ImageHover?: string;
  nonWorkingDays?: string[];
  dateStartFEEBackup?: Date;
  freightItem?: IFreightItem;
  agreedUnitPrice?: number;
}

export const initialPpIncidenceQuote = (): PpIncidenciaPartida => ({
  IdPPIncidenciaPartida: DEFAULT_UUID,
  Catalogo: false,
  Descripcion: false,
  Presentacion: false,
  FechaRealizacionEnCapacitacion: false,
  Moneda: false,
  Marca: false,
  TiempoEstimadoEntrega: false,
  IVA: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Activo: true,
  Comentarios: null,
  PrecioUnitario: false,
});

export const initialIPpPartidaPedidoDetallePretamitar = (): IPpPartidaPedidoDetallePretamitar => ({
  Activo: true,
  Comentarios: null,
  CotizacionesVinculadas: 0,
  FechaConsulta: null,
  FechaEstimadaEntrega: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Flete: null,
  IVA: 0,
  IdPPIncidenciaPartidaPedido: null,
  IdPPPPartidaPedidoCorregida: null,
  IdPPPartidaPedidoConfiguracion: DEFAULT_UUID,
  IdPPPartidaPedidoMadre: null,
  IdPPPedido: DEFAULT_UUID,
  IdPcPartidaPromesaDeCompra: null,
  IdProducto: DEFAULT_UUID,
  IdValorConfiguracionTiempoEntrega: DEFAULT_UUID,
  Lote: null,
  Numero: 0,
  NumeroDePiezas: 0,
  PorcentajeSobrePrecioLista: 0,
  PrecioFleteNoDesglosado: 0,
  PrecioUnitario: 0,
  Programada: false,
  Subtotal: 0,
  TiempoEstimadoEntrega: 0,
  Total: 0,
  cotPartidaCotizacionDetalle: null,
  ppPartidaPedidoAddendaSanofi: null,
  ppPedidoFleteExpress: null,
  agreedUnitPrice: 0,
  ppPartidaPedidoConfiguracion: {
    IdPPPartidaPedidoConfiguracion: DEFAULT_UUID,
    Activo: true,
    DeCatalogo: false,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdContratoCliente: null,
    IdCotPartidaCotizacion: null,
    IdCotProductoOferta: null,
    IdEmpresa: null,
    TieneContrato: false,
  },
  ppIncidenciaPartida: initialPpIncidenceQuote(),
  ListaPPPartidaPedidoOriginales: [],
  quantityInputIsOpen: false,
  priceInputIsOpen: false,
  deliveryRestrictionsInputIsOpen: false,
  hasInheritIncidences: false,
  Tramitada: true,
  Validada: null,
  ImageHover: null,
  nonWorkingDays: [],
  dateStartFEEBackup: null,
});

//DOCS: YA NO LA OCUPA EL MÓDULO DE  PRETRAMITAR PEDIDO, SE MANTIENE PORQUE OTROS  MODULOS LA NECESITAN
export interface IPpPartidaPedidoDetalle extends PpPartidaPedidoDetalle {
  ListaPPPartidaPedidoOriginales?: IPpPartidaPedidoObj[];
  validity?: string;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  isNegative?: boolean;
  percentage?: number;
  hasInheritIncidences?: boolean;
}
