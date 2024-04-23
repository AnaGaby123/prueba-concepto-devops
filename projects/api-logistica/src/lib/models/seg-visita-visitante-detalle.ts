/* tslint:disable */
import { ImpOrdenDespacho } from './imp-orden-despacho';
import { OcEnvio } from './oc-envio';
import { VUsuario } from './vusuario';
import { CatMarcaVehiculo } from './cat-marca-vehiculo';
import { CatOrigenVisitante } from './cat-origen-visitante';
import { CatTipoVehiculo } from './cat-tipo-vehiculo';
import { SegVehiculoVisitante } from './seg-vehiculo-visitante';
import { SegVisitante } from './seg-visitante';
export interface SegVisitaVisitanteDetalle {
  AA?: boolean;
  Activo?: boolean;
  AplicaVehiculo?: boolean;
  FEA?: string;
  FechaHoraAproximadaDeArribo?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Fleteras?: boolean;
  IdSegVehiculoVisitante?: string;
  IdSegVisitaVisitante?: string;
  IdSegVisitante?: string;
  IdUsuarioAQuienVisita?: string;
  ListaimpOrdenDespacho?: Array<ImpOrdenDespacho>;
  ListaocEnvioList?: Array<OcEnvio>;
  Programadas?: boolean;
  Realizada?: boolean;
  UsuarioAQuienVisita?: VUsuario;
  catMarcaVehiculo?: CatMarcaVehiculo;
  catOrigenVisitante?: CatOrigenVisitante;
  catTipoVehiculo?: CatTipoVehiculo;
  segVehiculoVisitante?: SegVehiculoVisitante;
  segVisitante?: SegVisitante;
}
