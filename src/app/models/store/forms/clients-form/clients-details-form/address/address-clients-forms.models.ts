import {
  DatosDireccionCliente,
  DatosDireccionClienteComentario,
  Direccion,
  DireccionCliente,
  HorarioAtencion,
  ResultadoValidadorDireccion,
  ResultadoValidarCodigoPostal,
} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IClientAddress {
  searchTermByAddress: string;
  address: Array<IDireccion>;
  addressForm: IDireccion;
  addressFormBackUp: IDireccion;
  deleteAddress: Array<IDireccion>;
  deleteComments: Array<DatosDireccionClienteComentario>;
  backUp: {
    address: Array<IDireccion>;
  };
  zipCodeIsValid: boolean;
  zipCodeResult: ResultadoValidarCodigoPostal;
  addressValidation: ResultadoValidadorDireccion;
  schedulePopOpen: boolean;
  showMap: boolean;
  IdClient: string;
  deliveryComment: DatosDireccionClienteComentario;
  reviewDataComment: DatosDireccionClienteComentario;
  chargesDataComment: DatosDireccionClienteComentario;
  visitComment: DatosDireccionClienteComentario;
  openAddressModal: boolean;
  showMapCount: number;
  addressModalTitle: string;
  scheduleModalTitle: string;
}

export const initialIClientAddress = (): IClientAddress => ({
  searchTermByAddress: '',
  address: [],
  addressForm: initialIDireccion(),
  addressFormBackUp: {} as IDireccion,
  deleteAddress: [],
  deleteComments: [],
  backUp: {
    address: [],
  },
  zipCodeIsValid: true,
  zipCodeResult: {
    Colonia: true,
    Estado: true,
    Municipio: true,
    Valido: false,
  },
  addressValidation: {
    Valido: false,
    Mensaje: '',
  },
  schedulePopOpen: false,
  showMap: false,
  IdClient: null,
  chargesDataComment: initialDatosDireccionclienteComentario(),
  deliveryComment: initialDatosDireccionclienteComentario(),
  reviewDataComment: initialDatosDireccionclienteComentario(),
  visitComment: initialDatosDireccionclienteComentario(),
  openAddressModal: false,
  showMapCount: 0,
  addressModalTitle: '',
  scheduleModalTitle: '',
});

export interface IDireccion extends Direccion {
  AddressTypeName?: string;
  DeliveryData?: IDatosDireccioncliente;
  DeliveryDataComments?: Array<DatosDireccionClienteComentario>;
  PagaGuiaEnvio?: boolean;
  clienteDireccion?: DireccionCliente;
  horariosCobro?: Array<IHorarioAtencion>;
  horariosEntrega?: Array<IHorarioAtencion>;
  horariosRevision?: Array<IHorarioAtencion>;
  horariosVisita?: Array<IHorarioAtencion>;
  isSelected?: boolean;
  allowEditForm?: boolean;
  index?: number;
}

export interface IHorarioAtencion extends HorarioAtencion {
  Dia?: string;
  checked?: boolean;
}

export const initialIHorarioAtencion = (): IHorarioAtencion => ({
  IdHorarioAtencion: DEFAULT_UUID,
  HoraInicioPrimerHorario: '',
  HoraFinPrimerHorario: '',
  DosTurnos: false,
  HoraInicioSegundoHorario: '',
  HoraFinSegundoHorario: '',
  Activo: true,
  Dia: '',
  checked: false,
});
export const initialIDireccion = (): IDireccion => ({
  Activo: true,
  AddressTypeName: '',
  Calle: null,
  Ciudad: null,
  CodigoPostal: null,
  Colonia: null,
  DeliveryData: null,
  DeliveryDataComments: [],
  DireccionTextoDos: null,
  DireccionTextoUno: null,
  Estado: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatPais: null,
  IdCatRutaEntrega: null,
  IdCatTipoDireccion: null,
  IdCatZona: null,
  IdDireccion: DEFAULT_UUID,
  Latitud: 0,
  Longitud: 0,
  Municipio: null,
  NumeroExterior: null,
  NumeroInterior: null,
  PagaGuiaEnvio: false,
  RequiereCita: false,
  TipoRegion: null,
  UsaFormatoEnTexto: null,
  clienteDireccion: initialIDireccionCliente(),
  horariosCobro: [],
  horariosEntrega: [],
  horariosRevision: [],
  horariosVisita: [],
  isSelected: false,
  allowEditForm: false,
  index: null,
});

export const initialIDireccionCliente = (): DireccionCliente => ({
  IdDireccionCliente: DEFAULT_UUID,
  IdCliente: null,
  IdDireccion: null,
  IdDatosDireccionCliente: null,
  IdHorarioAtencionEntrega: null,
  IdHorarioAtencionCobro: null,
  IdHorarioAtencionRevision: null,
  IdHorarioAtencionVisita: null,
  Activo: true,
  DistanciaCartaPorte: null,
});

export interface IDatosDireccioncliente extends DatosDireccionCliente {
  selectedDestination: DropListOption;
}

export const initialIDatosDireccioncliente = (): IDatosDireccioncliente => ({
  AceptaParciales: false,
  EntregaYRevisionMismoDia: false,
  SoloAceptaEntregasPorFactura: false,
  EntregaEnCondicionesDeAlmacenaje: false,
  PedidoOriginal: false,
  CopiasPorFactura: false,
  NumCopiasFacturas: 0,
  HojasSeguridad: false,
  CopiaPedido: false,
  NumCopiasPedido: 0,
  Certificados: false,
  AceptaParcialesPorLinea: false,
  IdCatDestino: '4642b44d-c6a0-416d-be66-fab164dfa3c1',
  selectedDestination: {} as DropListOption,
  IdDatosDireccionCliente: DEFAULT_UUID,
});
export const initialDatosDireccionclienteComentario = (): DatosDireccionClienteComentario => ({
  Activo: true,
  Comentario: '',
  FechaRegistro: DEFAULT_DATE,
  IdCatTipoDireccion: null,
  IdDatosDireccionCliente: null,
  IdDatosDireccionClienteComentario: DEFAULT_UUID,
});
