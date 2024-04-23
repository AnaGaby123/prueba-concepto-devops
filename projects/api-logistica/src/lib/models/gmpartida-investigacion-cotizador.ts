/* tslint:disable */
import { CotPartidaCotizacionInvestigacion } from './cot-partida-cotizacion-investigacion';
import { CotPartidaCotizacionInvestigacionComentario } from './cot-partida-cotizacion-investigacion-comentario';
export interface GMPartidaInvestigacionCotizador {
  IdCatTipoCotizacion?: string;
  cotPartidaCotizacionInvestigacion?: CotPartidaCotizacionInvestigacion;
  cotPartidaCotizacionInvestigacionComentario?: CotPartidaCotizacionInvestigacionComentario;
}
