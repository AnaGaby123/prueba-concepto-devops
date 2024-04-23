/* tslint:disable */
import { ArchivoCorreoRecibido } from './archivo-correo-recibido';
import { CatClasificacionCorreoRecibidoReferencia } from './cat-clasificacion-correo-recibido-referencia';
export interface CorreoRecibidoClienteReferenciaObj {
  Activo?: boolean;
  ArchivoCorreoRecibido?: ArchivoCorreoRecibido;
  Comentario?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivoCorreoRecibido?: string;
  IdCatClasificacionCorreoRecibidoReferencia?: string;
  IdCorreoRecibidoCliente?: string;
  IdCorreoRecibidoClienteReferencia?: string;
  IdPPPedidoOriginal?: string;
  Iva?: number;
  Referencia?: string;
  Subtotal?: number;
  Total?: number;
  catClasificacionCorreoRecibidoReferencia?: CatClasificacionCorreoRecibidoReferencia;
}
