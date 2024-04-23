import {
  CatTipoNumeroTelefonico,
  Cliente,
  ContactoDetalleObj,
  NumeroTelefonico,
  VCliente,
  VClienteTerceroAutorizadoRelacion,
} from 'api-catalogos';
import {Persona} from '@appModels/catalogos/persona/persona';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IGeneralDataClientsForm {
  authorizedThirdSelected: DropListOption;
  backup: IClientsGeneralDataBackUp;
  catPhoneTypes: Array<CatTipoNumeroTelefonico>;
  contactForm: IContactoDetalleObj;
  contacts: Array<IContactoDetalleObj>;
  contactsToDelete: Array<Persona>;
  existingEmail: boolean;
  selectedClient: VCliente;
  modalIsOpen: boolean;
  tercerosAutorizados: IClientsTercerosAutorizados;
}

export interface IContactoDetalleObj extends ContactoDetalleObj {
  NumerosTelefonicosEliminados?: Array<NumeroTelefonico>;
  IdCliente?: string;
}

export const initialIGeneralDataClientsForm = (): IGeneralDataClientsForm => ({
  selectedClient: initialVcliente(),
  authorizedThirdSelected: null,
  tercerosAutorizados: {
    listTercerosAutorizados: [],
    tercerosAutorizadosSelected: [],
    tercerosAutorizadosToDelete: [],
  },
  contacts: [],
  contactsToDelete: [],
  contactForm: initialContactForm(),
  backup: {
    selectedClient: {},
    contacts: [],
    tercerosAutorizados: [],
    contactsToDelete: [],
  },
  catPhoneTypes: [],
  existingEmail: false,
  modalIsOpen: false,
});

export interface IClientsGeneralDataBackUp {
  selectedClient: VCliente;
  contacts: Array<IContactoDetalleObj>;
  contactsToDelete: Array<Persona>;
  tercerosAutorizados: Array<ClientTerceroAutorizadoRelacion>;
}

export const initialContactForm = (): IContactoDetalleObj => ({
  IdContactoCliente: DEFAULT_UUID,
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
  NumeroTelefonico: [],
  Departamento: 'N/D',
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  FechaCaducidadRegistro: DEFAULT_DATE,
  IdContacto: DEFAULT_UUID,
  IdCatDificultad: null,
  IdCatMantenimiento: null,
  IdCatNivelDecision: null,
  IdCatNivelPuesto: null,
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
  NumerosTelefonicosEliminados: [],
});

export interface IClientsTercerosAutorizados {
  listTercerosAutorizados: Array<Cliente>;
  tercerosAutorizadosSelected: Array<ClientTerceroAutorizadoRelacion>;
  tercerosAutorizadosToDelete?: Array<ClientTerceroAutorizadoRelacion>;
}

export interface ClientTerceroAutorizadoRelacion extends VClienteTerceroAutorizadoRelacion {
  Alias?: string;
}

export interface IGeneralDataToSave {
  client: VCliente;
  selectedClientsAuthorized: Array<ClientTerceroAutorizadoRelacion>;
  selectedClientsAuthorizedToDelete: Array<ClientTerceroAutorizadoRelacion>;
}

export const initialVcliente = (): VCliente => ({
  Activo: true,
  Alias: '',
  AreaCorporativo: '',
  Categoria: null,
  ClaveMonedaFacturacion: '',
  ClaveMonedaTramitacion: '',
  Cobrador: '',
  Codigo: '',
  CondicionesDePago: '',
  Contrato: '',
  ESAC: '',
  EVE: '',
  EVI: '',
  EmpresaFactura: '',
  EsTerceroAutorizado: false,
  FacturaPHS: false,
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
  IdUsuarioCoordinadorDeServicioAlCliente: null,
  IdUsuarioCoordinadorDeVentaInterna: null,
  IdCatCondicionesDePago: null,
  IdCatCorporativo: null,
  IdCatImportanciaCliente: null,
  IdCatIndustria: null,
  IdCatMoneda: null,
  IdCatMonedaTramitacion: null,
  IdCatNivelIngreso: null,
  IdCatPais: null,
  IdCatRegimenFiscal: null,
  IdCatRolCliente: null,
  IdCatRutaEntrega: null,
  IdCatSector: null,
  IdCliente: DEFAULT_UUID,
  IdConfiguracionPagos: null,
  IdDireccion: null,
  IdDireccionCliente: null,
  IdUsuarioCobrador: null,
  IdUsuarioESAC: null,
  IdUsuarioEVE: null,
  IdUsuarioEVI: null,
  IdUsuarioVendedor: null,
  Importancia: '',
  Industria: '',
  NivelIngreso: '',
  Nombre: '',
  NombreCatRolCliente: '',
  NombreCorporativo: '',
  NombrePais: '',
  ObjetivoCrecimientoDeseado: null,
  ObjetivoCrecimientoFundamental: null,
  Pagina: '',
  PortalFactura: '',
  RFC: '',
  RazonSocial: '',
  RecogeEnProquifa: false,
  RegimenFiscal: '',
  RestringirVentaSustanciasControladas: false,
  RutaEntrega: '',
  Sector: '',
  SinCredito: true,
  TipoDeCambioBanamex: false,
  TipoDeCambioDiarioOficial: false,
  TramitarConOrdenDeCompraInterna: false,
  TramitarSinOrdenDeCompra: false,
  UsuarioVendedor: '',
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
