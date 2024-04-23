/* tslint:disable */
import { ImpCDGDonaFlete } from './imp-cdgdona-flete';
import { ImpCDGDonaProveedor } from './imp-cdgdona-proveedor';
import { ImpCDgDonaEntrega } from './imp-cdg-dona-entrega';
import { ImpCDGBarrasSemaforoEntrega } from './imp-cdgbarras-semaforo-entrega';
import { ImpCDGBarrasTReferencia } from './imp-cdgbarras-treferencia';
export interface ImpCDDashBoardGraficasTotales {
  EntregasProgramadasTotal?: number;
  EntregasUnicasTotal?: number;
  FletesExpressTotal?: number;
  FletesNormalTotal?: number;
  OrdenesCompraTotal?: number;
  PiezasTotal?: number;
  ProductosTotal?: number;
  ProveedoresTotal?: number;
  TiposEntregaTotal?: number;
  TiposFleteTotal?: number;
  ValorTotalEntregas?: number;
  ValorTotalFlete?: number;
  ValorTotalProveedor?: number;
  listImpCDGDonaFlete?: Array<ImpCDGDonaFlete>;
  listImpCDGDonaProveedor?: Array<ImpCDGDonaProveedor>;
  listImpCDgDonaEntrega?: Array<ImpCDgDonaEntrega>;
  objImpCDGBarrasSemaforoEntrega?: ImpCDGBarrasSemaforoEntrega;
  objImpCDGBarrasTReferencia?: ImpCDGBarrasTReferencia;
}
