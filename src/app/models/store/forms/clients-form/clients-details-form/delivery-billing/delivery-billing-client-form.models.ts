import {
  Cliente,
  ClienteComentarioObj,
  ClienteTCDOFVigencia,
  CorreoValidacionFacturacionCliente,
  DatosFacturacionCliente,
  Direccion,
  DireccionCliente,
  DireccionClienteDetalle,
  RestriccionMensualDatosFacturacion,
  RestriccionTemporalDatosFacturacion,
} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IDeliveryBilling {
  billing: IBilling;
  clientSelected: Cliente;
  dataBackup: IDeliveryBilling;
  addressBackUp: IDireccionClienteDetalle;
  clientAddress: IDireccionClienteDetalle;
  clientAddressCopy: IDireccionClienteDetalle;
  allowedForm: boolean;
  rfcIsValid: boolean;
  temporalRestriction: ITemporalRestriction;
  email: CorreoValidacionFacturacionCliente;
  comment: ITopicComments;
  validityTypeChange: string;
  zipCodeIsValid: boolean;
  validZipCodeInfo: boolean;
  openAddressModal: boolean;
  addressModalTitle: string;
}

export interface IBilling extends DatosFacturacionCliente {
  Restriccion: RestriccionMensualDatosFacturacion;
  RestriccionesT: Array<RestriccionTemporalDatosFacturacion>;
  RestriccionesDelete: Array<RestriccionTemporalDatosFacturacion>;
  Comentarios: Array<ITopicComments>;
  ComentariosDeshabilitados: Array<ITopicComments>;
  DisableEmails?: Array<CorreoValidacionFacturacionCliente>;
  CorreosCFDI?: Array<CorreoValidacionFacturacionCliente>;
  OfferCurrencySelected: DropListOption;
  CompanySelected: DropListOption;
  MercantileSocietySelected: DropListOption;
  TaxRegimeSelected: DropListOption;
  BillingCurrencySelected: DropListOption;
  TypesChanges: Array<DropListOption>;
  TypeChangeSelected: DropListOption;
  isMexican: boolean;
  ClienteTCDOFVigencia: ClienteTCDOFVigencia;
}

export interface ITopicComments extends ClienteComentarioObj {
  TemaComentario: string;
  ThemeSelected: DropListOption;
}

export interface ITemporalRestriction extends RestriccionTemporalDatosFacturacion {
  FechaFinDate: Date;
  FechaInicioDate: Date;
}

export const initialDeliveryBillingClientsForm = (): IDeliveryBilling => ({
  billing: {
    TypesChanges: [
      {
        label: 'Interbancario',
        value: '1',
      },
      {
        label: 'Diario Oficial',
        value: '2',
      },
    ],
  } as IBilling,
  clientSelected: {} as Cliente,
  dataBackup: {} as IDeliveryBilling,
  allowedForm: false,
  clientAddress: {
    Direccion: initialDirection(),
    DireccionCliente: initialDirectionClient(),
    catTipoDireccionSelected: null,
    catCountrySelected: null,
    catRegionSelected: null,
    catRegionTypeSelected: null,
  },
  addressBackUp: {} as IDireccionClienteDetalle,
  clientAddressCopy: {} as IDireccionClienteDetalle,
  rfcIsValid: true,
  comment: initialComment(),
  email: initialEmail(),
  temporalRestriction: initialTemporalRestriction(),
  validityTypeChange: '',
  zipCodeIsValid: true,
  validZipCodeInfo: false,
  addressModalTitle: '',
  openAddressModal: false,
});
export const initialComment = (): ITopicComments => ({
  Activo: true,
  IdCliente: null,
  FechaRegistro: DEFAULT_DATE,
  Comentario: '',
  IdClienteComentario: DEFAULT_UUID,
  IdCatTemaComentario: null,
  catTemaComentario: null,
  TemaComentario: '',
  ThemeSelected: {} as DropListOption,
});

export const initialMonthlyRestriction = (): RestriccionMensualDatosFacturacion => ({
  RestriccionFinDeMes: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdDatosFacturacionCliente: null,
  APartirDelDia: 0,
  DiasAntesFinDeMes: 0,
  EntregaConRemision: false,
  IdRestriccionMensualDatosFacturacion: DEFAULT_UUID,
  RestriccionMensual: false,
});
export const initialTemporalRestriction = (): ITemporalRestriction => ({
  Activo: true,
  IdCliente: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  FechaFin: DEFAULT_DATE,
  FechaInicio: DEFAULT_DATE,
  Titulo: '',
  IdRestriccionTemporalDatosFacturacion: DEFAULT_UUID,
  FechaFinDate: null,
  FechaInicioDate: null,
});
export const initialEmail = (): CorreoValidacionFacturacionCliente => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  Correo: '',
  IdDatosFacturacionCliente: null,
  IdCorreoValidacionFacturacionCliente: DEFAULT_UUID,
});

export interface IDireccionClienteDetalle extends DireccionClienteDetalle {
  catTipoDireccionSelected: DropListOption;
  catCountrySelected: DropListOption;
  catRegionTypeSelected: DropListOption;
  catRegionSelected: DropListOption;
}

export const initialDirection = (): Direccion => ({
  IdDireccion: DEFAULT_UUID,
  IdCatTipoDireccion: null,
  Activo: true,
  Calle: null,
  Ciudad: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  CodigoPostal: null,
  Colonia: null,
  DireccionTextoDos: null,
  Estado: null,
  DireccionTextoUno: null,
  IdCatPais: null,
  IdCatRutaEntrega: null,
  IdCatZona: null,
  Latitud: null,
  Longitud: null,
  Municipio: null,
  NumeroExterior: null,
  NumeroInterior: null,
  RequiereCita: false,
  TipoRegion: null,
  UsaFormatoEnTexto: false,
});

export const initialDirectionClient = (): DireccionCliente => ({
  Activo: true,
  IdCliente: null,
  Consecutivo: null,
  Folio: null,
  IdDatosDireccionCliente: null,
  IdDireccion: null,
  IdDireccionCliente: DEFAULT_UUID,
  DistanciaCartaPorte: 0,
  Proquifa: false,
  IdHorarioAtencionCobro: null,
  IdHorarioAtencionEntrega: null,
  IdHorarioAtencionRevision: null,
  IdHorarioAtencionVisita: null,
});

export const initialClienteTCDOFVigencia = (): ClienteTCDOFVigencia => ({
  Activo: true,
  IdCliente: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdClienteTCDOFVigencia: DEFAULT_UUID,
  FinVigencia: DEFAULT_DATE,
  InicioVigencia: DEFAULT_DATE,
  IdUsuarioSolicitudCambio: null,
});
