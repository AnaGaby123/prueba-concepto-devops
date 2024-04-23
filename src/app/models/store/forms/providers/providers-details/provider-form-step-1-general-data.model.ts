import {
  ContactoDetalleProvObj,
  ContactoProveedor,
  Direccion,
  Proveedor,
  VProveedor,
} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {NumeroTelefonico} from 'api-logistica';

export interface GeneralData {
  provider: IVProvider;
  contacts: Array<IContactoDetalleProvObj>;
  address: Direccion;
  zipCodeIsValid: boolean;
  disableContacts: Array<IContactoDetalleProvObj>;
  contactToEdit: IContactoDetalleProvObj;
  backUp?: GeneralData;
  rfcIsValid: boolean;
  duplicateMail: boolean;
  allowedFormAddress: boolean;
}

export interface IVProvider extends VProveedor {
  Activo?: boolean;
  AplicaLicencia?: boolean;
  ColocarPhs?: boolean;
  CompraEnLinea?: boolean;
  CompraTradicional?: boolean;
  ConceptoFleteExpress?: string;
  DescripcionAmplia?: string;
  ExisteRelacionComercial?: boolean;
  FactorConversion?: number;
  FechaIngreso?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatMonedaPagos?: string;
  IdCatMonedaVentas?: string;
  IdCatRolProveedor?: string;
  IdConfiguracionPagos?: string;
  IdDireccion?: string;
  IdProveedor?: string;
  IdUsuarioComprador?: string;
  IdUsuarioInspector?: string;
  IdUsuarioPagador?: string;
  LeyendaFleteExpress?: string;
  MesInicioFiscal?: number;
  Nombre?: string;
  NombreImagen: string;
  ObjetivoCrecimientoDeseado?: number;
  ObjetivoCrecimientoFundamental?: number;
  Observaciones?: string;
  PrecioFleteExpress?: number;
  RazonSocial?: string;
  RegistroCompletado?: boolean;
  TaxId?: string;
  TieneFleteExpress?: boolean;
  Web?: string;
  Mexicano: boolean;
}

export interface IContactoDetalleProvObj extends ContactoDetalleProvObj {
  haveChanges?: boolean;
  selectedDifficultyOption?: DropListOption;
  selectedMaintenanceOption?: DropListOption;
  selectedDecisionLevelOption?: DropListOption;
  selectedJobLevelOption?: DropListOption;
  ContactoProveedor?: ContactoProveedor;
  FechaCaducidadRegistro?: string;
}

export const initialGeneralData = (): GeneralData => ({
  provider: initialDataProvider(),
  contacts: [],
  address: initialDataDirection(),
  zipCodeIsValid: true,
  disableContacts: [],
  contactToEdit: null,
  backUp: null,
  rfcIsValid: true,
  duplicateMail: false,
  allowedFormAddress: false,
});

const initialDataProvider = (): IVProvider => {
  return {
    Activo: true,
    ColocarPhs: false,
    CompraEnLinea: true,
    CompraTradicional: false,
    ConceptoFleteExpress: null,
    DescripcionAmplia: '',
    ExisteRelacionComercial: false,
    FactorConversion: null,
    FechaIngreso: DEFAULT_DATE,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCatMonedaPagos: null,
    IdCatMonedaVentas: null,
    IdCatRolProveedor: null,
    IdConfiguracionPagos: null,
    IdDireccion: null,
    IdProveedor: DEFAULT_UUID,
    IdUsuarioComprador: null,
    IdUsuarioInspector: null,
    IdUsuarioPagador: null,
    LeyendaFleteExpress: null,
    MesInicioFiscal: 0,
    Nombre: null,
    NombreImagen: null,
    ObjetivoCrecimientoDeseado: 0,
    ObjetivoCrecimientoFundamental: 0,
    Observaciones: null,
    PrecioFleteExpress: null,
    RazonSocial: null,
    TaxId: null,
    TieneFleteExpress: false,
    RegistroCompletado: true,
    AplicaLicencia: false,
  } as IVProvider;
};

const initialDataDirection = (): Direccion => {
  return {
    Activo: true,
    Calle: '',
    Ciudad: '',
    CodigoPostal: '',
    Colonia: '',
    DireccionTextoDos: '',
    DireccionTextoUno: '',
    Estado: '',
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCatPais: '',
    IdCatRutaEntrega: '',
    IdCatTipoDireccion: '',
    IdCatZona: '',
    IdDireccion: DEFAULT_UUID,
    Latitud: null,
    Longitud: null,
    Municipio: '',
    NumeroExterior: null,
    NumeroInterior: null,
    RequiereCita: false,
    TipoRegion: '',
    UsaFormatoEnTexto: false,
  } as Direccion;
};

export const initialProviderContact = (): IContactoDetalleProvObj => ({
  Activo: true,
  AgregadoExpo: false,
  ApellidoMaterno: '',
  ApellidoPaterno: '',
  CorreoElectronico: [
    {
      Activo: true,
      Correo: '',
      FechaRegistro: DEFAULT_DATE,
      IdCorreoElectronico: DEFAULT_UUID,
      IdDatosPersona: DEFAULT_UUID,
    },
  ],
  Departamento: 'N/D',
  Dificultad: '',
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatDificultad: null,
  IdCatMantenimiento: DEFAULT_UUID,
  IdCatNivelDecision: DEFAULT_UUID,
  IdCatNivelPuesto: DEFAULT_UUID,
  IdContacto: DEFAULT_UUID,
  IdContactoProveedor: DEFAULT_UUID,
  IdDatosPersona: DEFAULT_UUID,
  Mail: '',
  Mantenimiento: '',
  NivelDecision: '',
  NivelPuesto: '',
  Nombres: '',
  NumeroMovil: '',
  NumeroTelefonico: [],
  NumeroTelefono1: '',
  NumeroTelefono2: '',
  OrigenRegistro: '',
  Prioridad: 0,
  PrioridadContacto: 0,
  Puesto: 'N/D',
  Titulo: 'N/D',
  haveChanges: false,
  selectedDifficultyOption: null,
  selectedMaintenanceOption: null,
  selectedDecisionLevelOption: null,
  selectedJobLevelOption: null,
  ContactoProveedor: {
    Activo: true,
    FechaCaducidadRegistro: DEFAULT_DATE,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdContacto: DEFAULT_UUID,
    IdContactoProveedor: DEFAULT_UUID,
    IdProveedor: DEFAULT_UUID,
  },
});

export interface BackUpGeneralData {
  provider: Proveedor;
  contacts: Array<IContactoDetalleProvObj>;
  address: Direccion;
  disableContacts: Array<IContactoDetalleProvObj>;
  contactToEdit: IContactoDetalleProvObj;
}

export const initialBackUpGeneralData = (): BackUpGeneralData => ({
  provider: initialDataProvider(),
  contacts: [],
  address: initialDataDirection(),
  disableContacts: [],
  contactToEdit: null,
});
export const initialPhoneNumber = (): NumeroTelefonico => ({
  Activo: true,
  Extension: '',
  FechaRegistro: DEFAULT_DATE,
  IdCatTipoNumeroTelefonico: DEFAULT_UUID,
  IdDatosPersona: DEFAULT_UUID,
  IdNumeroTelefonico: DEFAULT_UUID,
  Numero: '',
});
