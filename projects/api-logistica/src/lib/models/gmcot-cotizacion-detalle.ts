/* tslint:disable */
import { CotCotizacion } from './cot-cotizacion';
import { GMCotPartidasDetalle } from './gmcot-partidas-detalle';
import { CotPartidasInvetigacionCotizacion } from './cot-partidas-invetigacion-cotizacion';
import { CotCotizacionFleteExpress } from './cot-cotizacion-flete-express';
import { CotCotizacionFleteUltimaMilla } from './cot-cotizacion-flete-ultima-milla';
export interface GMCotCotizacionDetalle {
  AliasEmpresaQueFacturaCotizacion?: string;
  AliasEmpresaQueFacturaPublicaciones?: string;
  ClaveMoneda?: string;
  CostoFletes?: number;
  CotCotizacion?: CotCotizacion;
  CotPartidasCotizacion?: Array<GMCotPartidasDetalle>;
  CotPartidasInvetigacionCotizacion?: Array<CotPartidasInvetigacionCotizacion>;
  FolioReferencia?: string;
  IVA?: number;
  InvestigacionesFinalizadas?: boolean;
  Subtotal?: number;
  Total?: number;
  cotCotizacionFleteExpress?: Array<CotCotizacionFleteExpress>;
  cotCotizacionFletesUltimaMilla?: Array<CotCotizacionFleteUltimaMilla>;
}
