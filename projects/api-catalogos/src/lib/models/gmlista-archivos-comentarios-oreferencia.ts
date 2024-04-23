/* tslint:disable */
import { ArchivoCorreoRecibido } from './archivo-correo-recibido';
import { CorreoRecibidoClienteReferencia } from './correo-recibido-cliente-referencia';
import { CorreoRecibidoComentario } from './correo-recibido-comentario';
export interface GMListaArchivosComentariosOReferencia {
  ArchivoCorreoRecibido?: ArchivoCorreoRecibido;
  CorreoRecibidoClienteReferencia?: CorreoRecibidoClienteReferencia;
  CorreoRecibidoComentario?: CorreoRecibidoComentario;
}
