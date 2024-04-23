/* tslint:disable */
import { ContactoDetalleObj } from './contacto-detalle-obj';
import { DatosFacturacionClienteObj } from './datos-facturacion-cliente-obj';
import { VDireccion } from './vdireccion';
import { VPpPedidoTipoPartidaCotizacionObj } from './vpp-pedido-tipo-partida-cotizacion-obj';
import { CatCondicionesDePago } from './cat-condiciones-de-pago';
import { CatMoneda } from './cat-moneda';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
import { PpPedidoFleteExpressObj } from './pp-pedido-flete-express-obj';
import { PpPedidoFleteUltimaMilla } from './pp-pedido-flete-ultima-milla';
import { RestriccionMensualDatosFacturacion } from './restriccion-mensual-datos-facturacion';
import { RestriccionTemporalDatosFacturacion } from './restriccion-temporal-datos-facturacion';
export interface VPpPedidoObj {
  AceptaParciales?: boolean;
  Activo?: boolean;
  CambioAceptado?: boolean;
  ConCorreo?: boolean;
  ConOrdenDeCompra?: boolean;
  Consecutivo?: number;
  ContactoDetalle?: ContactoDetalleObj;
  DOF?: boolean;
  DatosFacturacionClienteDetalle?: DatosFacturacionClienteObj;
  DireccionEntrega?: VDireccion;
  EsFleteDesglosado?: boolean;
  FEAaTiempo?: boolean;
  FEAfueraDeTimpo?: boolean;
  FEAporVencer?: boolean;
  FechaEstimadaAjuste?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdArchivoOc?: string;
  IdCatEstadoPretramitacionPedido?: string;
  IdCatMoneda?: string;
  IdCliente?: string;
  IdContactoCliente?: string;
  IdCorreoRecibidoCliente?: string;
  IdFlete?: string;
  IdPPPedido?: string;
  IdPPPedidoCorregido?: string;
  IdSolicitudAutorizacionCambio?: string;
  IdUsuarioESAC?: string;
  Intramitable?: boolean;
  Iva?: number;
  MontoTotalMXN?: number;
  MontoTotalUSD?: number;
  Observaciones?: string;
  ObservacionesFEA?: string;
  OcInterna?: boolean;
  OrdenDeCompra?: string;
  PrecioFlete?: number;
  SinFEA?: boolean;
  Subtotal?: number;
  TieneObservaciones?: boolean;
  TipoCambioUSD?: number;
  TipoPartidasCotizacion?: Array<VPpPedidoTipoPartidaCotizacionObj>;
  Tramitado?: boolean;
  ValorTotal?: number;
  catCondicionesDePago?: CatCondicionesDePago;
  catMoneda?: CatMoneda;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
  ppPedidoFletesExpressObj?: Array<PpPedidoFleteExpressObj>;
  ppPedidoFletesUltimaMilla?: Array<PpPedidoFleteUltimaMilla>;
  restriccionMensualDatosFacturacion?: RestriccionMensualDatosFacturacion;
  restriccionTemporalDatosFacturacion?: Array<RestriccionTemporalDatosFacturacion>;
}