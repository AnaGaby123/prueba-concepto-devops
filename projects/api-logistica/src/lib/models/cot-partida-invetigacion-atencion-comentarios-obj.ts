/* tslint:disable */
import { VProducto } from './vproducto';
import { CotPartidaCotizacionInvestigacion } from './cot-partida-cotizacion-investigacion';
import { CotPartidaCotizacionInvestigacionAtencion } from './cot-partida-cotizacion-investigacion-atencion';
import { CotPartidaCotizacionInvestigacionComentario } from './cot-partida-cotizacion-investigacion-comentario';
export interface CotPartidaInvetigacionAtencionComentariosObj {
  Producto?: VProducto;
  cotPartidaCotizacionInvestigacion?: CotPartidaCotizacionInvestigacion;
  cotPartidaCotizacionInvestigacionAtencion?: CotPartidaCotizacionInvestigacionAtencion;
  cotPartidaCotizacionInvestigacionComentario?: Array<CotPartidaCotizacionInvestigacionComentario>;
}
