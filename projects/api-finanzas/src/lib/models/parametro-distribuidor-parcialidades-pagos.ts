/* tslint:disable */
import { FacturaParametroDistribuidorParcialidadesPagos } from './factura-parametro-distribuidor-parcialidades-pagos';
export interface ParametroDistribuidorParcialidadesPagos {
  Facturas?: Array<FacturaParametroDistribuidorParcialidadesPagos>;
  IdFCCPagoCliente?: string;
  ListaFCCNotaCredito?: Array<string>;
}
