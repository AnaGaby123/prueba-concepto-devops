/* tslint:disable */
import { MotivosCancelacionTasaConversionObj } from './motivos-cancelacion-tasa-conversion-obj';
import { EstadoTasasConversionObj } from './estado-tasas-conversion-obj';
export interface TasasConversionObj {
  CausasCancelacion?: Array<MotivosCancelacionTasaConversionObj>;
  Estados?: Array<EstadoTasasConversionObj>;
  IdCatTipoPartidaCotizacion?: string;
  IdCliente?: string;
  IdMarca?: string;
  ToltalPartidas?: number;
}
