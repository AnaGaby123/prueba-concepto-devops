/* tslint:disable */
import { DatosBancarios } from './datos-bancarios';
import { CatBanco } from './cat-banco';
import { CatMedioDePago } from './cat-medio-de-pago';
export interface ConfiguracionPagosDatosBancariosDetalle {
  Activo?: boolean;
  DatosBancarios?: DatosBancarios;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatMarcaTarjeta?: string;
  IdCatMedioDePago?: string;
  IdConfiguracionPagos?: string;
  IdConfiguracionPagosDatosBancarios?: string;
  IdDatosBancarios?: string;
  IdEmpresa?: string;
  catBanco?: CatBanco;
  catMedioDePago?: CatMedioDePago;
}
