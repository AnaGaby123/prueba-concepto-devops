/* tslint:disable */
import { VEmbalajeInspPartidas } from './vembalaje-insp-partidas';
export interface VEmbalajeDireccionClientePartidasDetalle {
  Calle?: string;
  Cliente?: string;
  Cobrador?: string;
  Contacto?: string;
  ESAC?: string;
  Guadalajara?: boolean;
  IdCliente?: string;
  IdContacto?: string;
  IdDireccion?: string;
  IdUsuarioEmbalar?: string;
  NumeroPiezas?: number;
  PartidasAmbiente?: number;
  PartidasCongelacion?: number;
  PartidasRefrigeracion?: number;
  PartidasSinManejo?: number;
  Prioridad?: string;
  Puesto?: string;
  RutaEntrega?: string;
  TotalPartidas?: number;
  UserNameEmbalar?: string;
  vEmbalajeInspPartidas?: Array<VEmbalajeInspPartidas>;
}
