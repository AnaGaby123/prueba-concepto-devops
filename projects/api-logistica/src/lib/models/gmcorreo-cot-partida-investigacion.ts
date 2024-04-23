/* tslint:disable */
import { CotInvestigacionCorreoEnviado } from './cot-investigacion-correo-enviado';
export interface GMCorreoCotPartidaInvestigacion {
  Asunto?: string;
  ConCopiaCSV?: string;
  CorreoProveedor?: string;
  IdUsuarioAtiende?: string;
  ListaIdCotPartidaCotizacionInvestigacion?: Array<string>;
  ListaIdcotPartidaCotizacionInvestigacionCorreo?: Array<string>;
  cotInvestigacionCorreoEnviado?: CotInvestigacionCorreoEnviado;
}
