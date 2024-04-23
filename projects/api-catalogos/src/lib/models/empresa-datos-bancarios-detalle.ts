/* tslint:disable */
import { DatosBancarios } from './datos-bancarios';
import { CatBanco } from './cat-banco';
import { CatMoneda } from './cat-moneda';
export interface EmpresaDatosBancariosDetalle {
  Activo?: boolean;
  DatosBancarios?: DatosBancarios;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdDatosBancarios?: string;
  IdEmpresa?: string;
  IdEmpresaDatosBancarios?: string;
  catBanco?: CatBanco;
  catMoneda?: CatMoneda;
}
