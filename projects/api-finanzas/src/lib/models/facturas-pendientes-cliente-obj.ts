/* tslint:disable */
import { Cliente } from './cliente';
import { ClienteDatosSTP } from './cliente-datos-stp';
import { ClienteTCDOFVigencia } from './cliente-tcdofvigencia';
import { ConfiguracionPagos } from './configuracion-pagos';
import { Direccion } from './direccion';
import { VDireccion } from './vdireccion';
import { TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal } from './tuple-tp-proforma-pedido-vfactura-cliente-calendario-cfdidecimal';
import { TupleFccNotaCreditoCFDIDecimal } from './tuple-fcc-nota-credito-cfdidecimal';
import { CatCondicionesDePago } from './cat-condiciones-de-pago';
import { CatMedioDePago } from './cat-medio-de-pago';
import { CatMetodoDePagoCFDI } from './cat-metodo-de-pago-cfdi';
import { CatMoneda } from './cat-moneda';
import { CatRevision } from './cat-revision';
import { CatUsoCFDI } from './cat-uso-cfdi';
import { Empresa } from './empresa';
export interface FacturasPendientesClienteObj {
  Activo?: boolean;
  AddendaDeCorreo?: boolean;
  AddendaDeLineaDeOrden?: boolean;
  AlMenosUnaFacturaMorada?: boolean;
  Cliente?: Cliente;
  ClienteDatosSTP?: ClienteDatosSTP;
  ClienteTCDOFVigencia?: ClienteTCDOFVigencia;
  ConfiguracionPagos?: ConfiguracionPagos;
  Contrasena?: string;
  Correo?: string;
  DireccionEmpresa?: Direccion;
  DireccionFacturacion?: VDireccion;
  EnviarPorCorreo?: boolean;
  FacturasDeudaSana?: Array<TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal>;
  FacturasMorosas?: Array<TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal>;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatMetodoDePagoCFDI?: string;
  IdCatMoneda?: string;
  IdCatMonedaTramitacion?: string;
  IdCatRegimenFiscal?: string;
  IdCatRevision?: string;
  IdCatTipoSociedadMercantil?: string;
  IdCatTipoValidacion?: string;
  IdCatUsoCFDI?: string;
  IdCliente?: string;
  IdDatosFacturacionCliente?: string;
  IdEmpresa?: string;
  MismaEmpresaFacturaPublicaciones?: boolean;
  NotasDeCredito?: Array<TupleFccNotaCreditoCFDIDecimal>;
  RFC?: string;
  RazonSocial?: string;
  RestriccionesTemporales?: boolean;
  TipoDeCambioBanamex?: boolean;
  TipoDeCambioDiarioOficial?: boolean;
  TipoValidacionCorreo?: boolean;
  TipoValidacionPortal?: boolean;
  TipoValidacionSAT?: boolean;
  TotalACobrar?: number;
  TotalDeudaSana?: number;
  TotalVencido?: number;
  URL?: string;
  Usuario?: string;
  catCondicionesDePago?: CatCondicionesDePago;
  catMedioDePago?: CatMedioDePago;
  catMetodoDePagoCFDI?: CatMetodoDePagoCFDI;
  catMoneda?: CatMoneda;
  catRevision?: CatRevision;
  catUsoCFDI?: CatUsoCFDI;
  empresa?: Empresa;
}
