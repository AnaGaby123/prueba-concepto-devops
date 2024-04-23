/* tslint:disable */
import { DatosDireccionCliente } from './datos-direccion-cliente';
import { DatosDireccionClienteComentario } from './datos-direccion-cliente-comentario';
import { Direccion } from './direccion';
import { DireccionCliente } from './direccion-cliente';
import { HorarioAtencionClienteDetalle } from './horario-atencion-cliente-detalle';
import { CatDestino } from './cat-destino';
import { VCatPais } from './vcat-pais';
import { CatRutaEntrega } from './cat-ruta-entrega';
import { CatTipoDireccion } from './cat-tipo-direccion';
import { CatZona } from './cat-zona';
export interface DireccionClienteDetalle {
  DatosDireccionCliente?: DatosDireccionCliente;
  DatosDireccionClienteComentario?: Array<DatosDireccionClienteComentario>;
  Direccion?: Direccion;
  DireccionCliente?: DireccionCliente;
  HorarioAtencionCobro?: HorarioAtencionClienteDetalle;
  HorarioAtencionEntrega?: HorarioAtencionClienteDetalle;
  HorarioAtencionRevision?: HorarioAtencionClienteDetalle;
  HorarioAtencionVisita?: HorarioAtencionClienteDetalle;
  catDestino?: CatDestino;
  catPais?: VCatPais;
  catRutaEntrega?: CatRutaEntrega;
  catTipoDireccion?: CatTipoDireccion;
  catZona?: CatZona;
}
