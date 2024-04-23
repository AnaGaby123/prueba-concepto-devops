import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import * as moment from 'moment';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export class Direccion {
  IdDireccion = DEFAULT_UUID;
  IdCatRutaEntrega = null;
  IdCatZona = null;
  DireccionTextoUno = null;
  DireccionTextoDos = null;
  UsaFormatoEnTexto = null;
  TipoRegion = null;
  Calle = null;
  NumeroInterior = null;
  NumeroExterior = null;
  Colonia = null;
  Ciudad = null;
  Municipio = null;
  Estado = null;
  CodigoPostal = null;
  Latitud = null;
  Longitud = null;
  FechaRegistro = DEFAULT_DATE;
  FechaUltimaActualizacion = DEFAULT_DATE;
  RequiereCita = null;
  IdCatTipoDireccion: string = null;
  IdCatPais = null;
  AddressTypeName = null;
  Activo = true;
  horariosEntrega: Schedule[] = [];
  horariosRevision: Schedule[] = [];
  horariosCobro: Schedule[] = [];
  horariosVisita: Schedule[] = [];
  DeliveryData: DeliveryData = null;
  DeliveryDataComments: DeliveryDataComments[] = [];
  $index?: number;
  clienteDireccion: ClienteDireccion = new ClienteDireccion();
  updateModeEdit = false;
  localActive = true;
}

export class Schedule {
  IdHorarioAtencion?: string;
  HoraInicioPrimerHorario?: string;
  HoraFinPrimerHorario?: string;
  DosTurnos?: boolean;
  HoraInicioSegundoHorario?: string;
  HoraFinSegundoHorario?: string;
  Activo?: boolean;
  Dia?: string;
  checked?: boolean;

  constructor(object: Schedule = {} as Schedule) {
    const {
      IdHorarioAtencion = DEFAULT_UUID,
      HoraInicioPrimerHorario = '',
      HoraFinPrimerHorario = '',
      HoraInicioSegundoHorario = '',
      HoraFinSegundoHorario = '',
      Activo = true,
      DosTurnos = true,
      Dia = '',
      checked = false,
    } = object;
    this.IdHorarioAtencion = IdHorarioAtencion;
    this.HoraInicioPrimerHorario = moment(HoraInicioPrimerHorario.toString(), 'H:mm')
      .format('H:mm')
      .toString();
    this.HoraFinPrimerHorario = moment(HoraFinPrimerHorario.toString(), 'H:mm')
      .format('H:mm')
      .toString();
    this.HoraInicioSegundoHorario = moment(HoraInicioSegundoHorario.toString(), 'H:mm')
      .format('H:mm')
      .toString();
    this.HoraFinSegundoHorario = moment(HoraFinSegundoHorario.toString(), 'H:mm')
      .format('H:mm')
      .toString();
    this.Activo = Activo;
    this.Dia = Dia;
    this.checked = checked;
  }
}

export class DeliveryData {
  IdEntregaDireccionCliente = DEFAULT_UUID;
  AceptaParciales = false;
  EntregaYRevisionMismoDia = false;
  SoloAceptaEntregasPorFactura = false;
  EntregaEnCondicionesDeAlmacenaje = false;
  PedidoOriginal = false;
  CopiasPorFactura = false;
  NumCopiasFacturas = 0;
  HojasSeguridad = false;
  CopiaPedido = false;
  NumCopiasPedido = 0;
  Certificados = false;
  AceptaParcialesPorLinea = false;
  IdCatDestino = '4642b44d-c6a0-416d-be66-fab164dfa3c1';
  selectedDestination = {} as DropListOption;
}

export class DeliveryDataComments {
  IdDatosDireccionClienteComentario = DEFAULT_UUID;
  IdDatosDireccionCliente = '';
  Comentario = '';
  FechaRegistro = DEFAULT_DATE;
  Activo = true;
  IdCatTipoDireccion = DEFAULT_UUID;
}

/*********************************** Request-Objects ***********************************/
export class ClienteDireccion {
  IdDireccionCliente = DEFAULT_UUID;
  IdCliente = null;
  IdDireccion = null;
  IdEntregaDireccionCliente = null;
  IdHorarioAtencionEntrega = null;
  IdHorarioAtencionCobro = null;
  IdHorarioAtencionRevision = null;
  IdHorarioAtencionVisita = null;
  Activo = true;
}

export interface ISchedule {
  IdHorarioAtencion?: string;
  HoraInicioPrimerHorario?: DropListOption;
  HoraFinPrimerHorario?: DropListOption;
  DosTurnos?: boolean;
  HoraInicioSegundoHorario?: DropListOption;
  HoraFinSegundoHorario?: DropListOption;
  Activo?: boolean;
  Dia?: string;
  checked?: boolean;
}
