import {ITabOption} from '@appModels/botonera/botonera-option';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  Aduana,
  AduanaDetalle,
  CatTipoNumeroTelefonico,
  ConceptoAgenteAduanal,
  Contacto,
  ContactoAduana,
  ContactoDetalleAgenteAduanalObj,
  Direccion,
  VAgenteAduanal,
} from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface ICustomsAgentsDetails {
  tabOptions: Array<ITabOption>;
  tabOptionSelected: ITabOption;
  customAgentSelected: VAgenteAduanal;
  activitiesOptions: Array<BarActivityOption>;
  activitySelected: BarActivityOption;
  generalData: IGeneralDataCustomsAgents;
  dispatchPoint: IDispatchPoint;
  contactFormOpen: boolean;
  backUp: ICustomAgentDetailBackUp;
  cancelPop: ICancelPop;
  preSelectedDispatchPoint: OptionBar;
  initialDispatchPoint: AduanaDetalle;
}

export const initialStateAgentsDetails = (): ICustomsAgentsDetails => ({
  tabOptions: [
    {id: '1', label: 'DATOS GENERALES', activeSubtitle: false},
    {id: '2', label: 'DESADUANAJE', activeSubtitle: false},
  ],
  customAgentSelected: {},
  tabOptionSelected: {
    id: '1',
    label: 'DATOS GENERALES',
    activeSubtitle: false,
  },
  activitiesOptions: [
    {id: 1, label: 'DATOS GENERALES', activeSubtitle: false},
    {id: 2, label: 'DESADUANAJE', activeSubtitle: false},
  ],
  activitySelected: {id: 1, label: 'DATOS GENERALES', activeSubtitle: true},
  generalData: initialStateGeneralData(),
  dispatchPoint: initialStateDispatchPoint(),
  contactFormOpen: false,
  backUp: {},
  cancelPop: {
    isOpen: false,
    origen: '',
  },
  preSelectedDispatchPoint: null,
  initialDispatchPoint: initialAduanaDetalle(),
});

export interface IGeneralDataCustomsAgents {
  customAgentSelected: VAgenteAduanal;
  contacts: Array<ICustomAgentContact>;
  contactForm: ICustomAgentContact;
  contactAction: string;
  disableContacts: Array<ContactoDetalleAgenteAduanalObj>;
  lisCatTIipoTelefono: Array<CatTipoNumeroTelefonico>;
  needsToReloadCatTipoTelefono: boolean;
  existingEmail: IEmailVerify;
  zipCodeIsValid: boolean;
}

export const initialStateGeneralData = (): IGeneralDataCustomsAgents => ({
  customAgentSelected: initialCustomAgentSelected(),
  contacts: [],
  contactForm: {...initialStateContactForm(), haveChanges: true},
  contactAction: '',
  disableContacts: [],
  lisCatTIipoTelefono: [],
  needsToReloadCatTipoTelefono: true,
  existingEmail: {
    exist: false,
    email: '',
  },
  zipCodeIsValid: true,
});
export const initialStateDispatchPoint = (): IDispatchPoint => ({
  selectedDispatchPoint: {},
  dispatchPoints: [],
  dispatchPointList: [],
  addRate: initialIRateState(),
  deleteRate: [],
  apiStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReload: true,
  zipCodeValidate: true,
  allowEditForm: false,
});

export const initialStateContactForm = (): ICustomAgentContact => ({
  IdContactoAduana: DEFAULT_UUID,
  Activo: true,
  AgregadoExpo: true,
  ApellidoMaterno: '',
  ApellidoPaterno: '',
  CorreoElectronico: [
    {
      Activo: true,
      Correo: '',
      FechaRegistro: new Date().toISOString(),
      IdCorreoElectronico: DEFAULT_UUID,
      IdDatosPersona: DEFAULT_UUID,
    },
  ],
  NumeroTelefonico: [],
  Departamento: 'N/D',
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
  IdContacto: DEFAULT_UUID,
  IdCatDificultad: null,
  IdCatMantenimiento: DEFAULT_UUID,
  IdCatNivelDecision: DEFAULT_UUID,
  IdCatNivelPuesto: DEFAULT_UUID,
  IdDatosPersona: DEFAULT_UUID,
  OrigenRegistro: '',
  Prioridad: 0,
  Puesto: 'N/D',
  Mail: '',
  Nombres: '',
  NumeroMovil: '',
  NumeroTelefono1: '',
  NumeroTelefono2: '',
  Titulo: 'N/D',
  haveChanges: true,
});

export const initialCustomAgentSelected = (): VAgenteAduanal => ({
  Activo: true,
  Calle: '',
  Ciudad: '',
  CodigoPostal: '',
  Colonia: '',
  DescripcionAmpliada: '',
  DireccionCompleta: '',
  DireccionTextoDos: '',
  DireccionTextoUno: '',
  Estado: '',
  FechaRegistro: new Date().toISOString(),
  IdAgenteAduanal: DEFAULT_UUID,
  IdCatPais: DEFAULT_UUID,
  IdDireccion: DEFAULT_UUID,
  Municipio: '',
  NombreComercial: '',
  NombreEspanol: '',
  NombreLegal: '',
  NumeroExterior: null,
  NumeroInterior: null,
  NumeroPatente: '',
});

export const initialIRateState = (): ConceptoAgenteAduanal => ({
  Activo: true,
  Concepto: '',
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
  IdAduana: DEFAULT_UUID,
  IdAgenteAduanal: DEFAULT_UUID,
  IdConceptoAgenteAduanal: DEFAULT_UUID,
  IgualarAPedimento: false,
  LimiteMaximo: null,
  Monto: 0,
  MontoExportacion: 0,
  MontoImportacion: 0,
  Porcentaje: 0,
  PorcentajeAPedimento: false,
  SinLimite: false,
});

export interface IDispatchPoint {
  dispatchPoints: Array<OptionBar>;
  selectedDispatchPoint: AduanaDetalle;
  dispatchPointList: Array<Aduana>;
  addRate: ConceptoAgenteAduanal;
  deleteRate: Array<ConceptoAgenteAduanal>;
  apiStatus: number;
  needsToReload: boolean;
  zipCodeValidate: boolean;
  allowEditForm: boolean;
}

export interface ICustomAgentDetailBackUp {
  customAgentSelected?: VAgenteAduanal;
  contacts?: Array<ICustomAgentContact>;
  selectedDispatchPoint?: Aduana;
  dispatchPointList?: Array<Aduana>;
  contactForm?: ICustomAgentContact;
}

export interface ICustomAgentContact extends ContactoDetalleAgenteAduanalObj {
  ContactoAduana?: ContactoAduana;
  Contacto?: Contacto;
  haveChanges: boolean;
}

export interface IEmailVerify {
  exist: boolean;
  email: string;
}

export interface ICancelPop {
  isOpen: boolean;
  origen: string;
}

export const initialAddress = (): Direccion => ({
  Activo: true,
  Calle: '',
  Ciudad: '',
  CodigoPostal: '',
  Colonia: '',
  DireccionTextoDos: '',
  DireccionTextoUno: '',
  Estado: '',
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
  IdCatPais: null,
  IdCatRutaEntrega: null,
  IdCatTipoDireccion: null,
  IdCatZona: null,
  IdDireccion: DEFAULT_UUID,
  Latitud: 0,
  Longitud: 0,
  Municipio: '',
  NumeroExterior: null,
  NumeroInterior: null,
  RequiereCita: null,
  TipoRegion: '',
  UsaFormatoEnTexto: null,
});
export const initialAduanaDetalle = (): AduanaDetalle => ({
  Activo: true,
  CartaUso: false,
  Certificados: false,
  ConceptosAgenteAduanal: [],
  CorreoDeDocumentacion: '',
  Direccion: initialAddress(),
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
  IdAduana: DEFAULT_UUID,
  IdAgenteAduanal: null,
  IdDireccion: null,
  LimiteConsolidadoMaximo: 0,
  LimiteConsolidadoMinimo: 0,
  Nafta: false,
  NombreLugar: '',
  RequiereFacturasComerciales: true,
  RequierePackingList: false,
  catPais: null,
  Fletera: false,
});
export const initialTelephoneNumber = () => ({
  Activo: true,
  Extension: null,
  FechaRegistro: DEFAULT_DATE,
  IdCatTipoNumeroTelefonico: DEFAULT_UUID,
  IdDatosPersona: DEFAULT_UUID,
  IdNumeroTelefonico: DEFAULT_UUID,
  Numero: null,
});
