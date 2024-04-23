import {CorreoElectronico, VNumeroTelefonico} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export class Persona {
  Nombres?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  Puesto?: string;
  Departamento?: string;
  Titulo?: string;
  Prioridad?: number;
  AgregadoExpo?: boolean;
  OrigenRegistro?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatNivelDecision?: string;
  IdCatNivelPuesto?: string;
  IdCatDificultad?: string;
  IdCatMantenimiento?: string;
  Email?: string;
  Movil?: string;
  Correos?: any[] = [];
  Telefonos?: any[] = [];
  IdContacto?: string;
  IdDatosPersona?: string;
  IdContactoCliente?: string;
  Mantenimiento?: string;
  Dificultad?: string;
  NivelDecision?: string;
  NivelPuesto?: string;
  Correo?: CorreoElectronico;
  Phone1?: VNumeroTelefonico;
  Phone2?: VNumeroTelefonico;
  Mobile?: VNumeroTelefonico;

  constructor() {
    this.Nombres = '';
    this.ApellidoPaterno = '';
    this.ApellidoMaterno = '';
    this.Puesto = '';
    this.Departamento = '';
    this.Titulo = '';
    this.Prioridad = 0;
    this.AgregadoExpo = false;
    this.OrigenRegistro = '';
    this.FechaRegistro = DEFAULT_DATE;
    this.FechaUltimaActualizacion = DEFAULT_DATE;
    this.IdCatNivelDecision = '';
    this.IdCatNivelPuesto = '';
    this.IdCatDificultad = '';
    this.IdCatMantenimiento = '';
    this.Email = '';
    this.Movil = '';
    this.Correos = [];
    this.Telefonos = [];
    this.IdContacto = DEFAULT_UUID;
    this.IdDatosPersona = DEFAULT_UUID;
    this.IdContactoCliente = DEFAULT_UUID;
    this.Mantenimiento = '';
    this.Dificultad = '';
    this.NivelDecision = '';
    this.NivelPuesto = '';
    this.Correo = {} as CorreoElectronico;
    this.Phone1 = {} as VNumeroTelefonico;
    this.Phone2 = {} as VNumeroTelefonico;
    this.Mobile = {} as VNumeroTelefonico;
  }
}
