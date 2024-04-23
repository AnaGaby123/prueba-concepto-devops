/* tslint:disable */
import { Archivo } from './archivo';
import { ArchivoCorreoRecibido } from './archivo-correo-recibido';
import { CorreoRecibido } from './correo-recibido';
import { CorreoRecibidoCliente } from './correo-recibido-cliente';
import { CorreoRecibidoContenido } from './correo-recibido-contenido';
export interface CorreoRecibidoClienteRequerimientoObj {
  Archivo?: Array<Archivo>;
  ArchivoCorreoRecibido?: Array<ArchivoCorreoRecibido>;
  CorreoRecibido?: CorreoRecibido;
  CorreoRecibidoCliente?: CorreoRecibidoCliente;
  CorreoRecibidoContenido?: CorreoRecibidoContenido;
}
