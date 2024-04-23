/* tslint:disable */
import { VContacto } from './vcontacto';
import { ContactoCliente } from './contacto-cliente';
import { CorreoRecibidoClienteReferenciaObj } from './correo-recibido-cliente-referencia-obj';
import { CorreoRecibidoComentarioObj } from './correo-recibido-comentario-obj';
import { CatClasificacionCorreoRecibido } from './cat-clasificacion-correo-recibido';
import { CatProceso } from './cat-proceso';
export interface CorreoRecibidoClienteObj {
  Activo?: boolean;
  Contacto?: VContacto;
  ContactoCliente?: ContactoCliente;
  CorreoRecibidoClienteReferencia?: Array<CorreoRecibidoClienteReferenciaObj>;
  CorreoRecibidoComentario?: Array<CorreoRecibidoComentarioObj>;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatClasificacionCorreoRecibido?: string;
  IdCliente?: string;
  IdContacto?: string;
  IdContactoCliente?: string;
  IdCorreoRecibido?: string;
  IdCorreoRecibidoCliente?: string;
  IdUsuario?: string;
  Leido?: boolean;
  Procesado?: boolean;
  catClasificacionCorreoRecibido?: CatClasificacionCorreoRecibido;
  catProceso?: CatProceso;
}
