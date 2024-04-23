/* tslint:disable */
import { CorreoElectronico } from './correo-electronico';
import { NumeroTelefonico } from './numero-telefonico';
export interface ContactoDetalleAgenteAduanalObj {
  Activo?: boolean;
  AgregadoExpo?: boolean;
  ApellidoMaterno?: string;
  ApellidoPaterno?: string;
  CorreoElectronico?: Array<CorreoElectronico>;
  Departamento?: string;
  Dificultad?: string;
  FechaCaducidadRegistro?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatDificultad?: string;
  IdCatMantenimiento?: string;
  IdCatNivelDecision?: string;
  IdCatNivelPuesto?: string;
  IdContacto?: string;
  IdContactoAduana?: string;
  IdDatosPersona?: string;
  Mail?: string;
  Mantenimiento?: string;
  NivelDecision?: string;
  NivelPuesto?: string;
  Nombres?: string;
  NumeroMovil?: string;
  NumeroTelefonico?: Array<NumeroTelefonico>;
  NumeroTelefono1?: string;
  NumeroTelefono2?: string;
  OrigenRegistro?: string;
  Prioridad?: number;
  PrioridadContacto?: number;
  Puesto?: string;
  Titulo?: string;
}
