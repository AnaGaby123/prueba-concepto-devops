import {
  Cliente,
  Direccion,
  DireccionCliente,
  GMClienteCotizacion,
  GMContactoClienteCompleto,
} from 'api-logistica';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IGMClienteCotizacion extends GMClienteCotizacion {
  contactIndexEdit?: number | null;
  contactForm?: GMContactoClienteCompleto;
}

export const initialGMClientQuotation = (): IGMClienteCotizacion => ({
  ContactosCliente: [],
  Direccion: initialGMDirection(),
  DireccionCliente: initialGMClientDirection(),
  IdsCotizacion: [],
  contactForm: initialGMContactForm(),
  contactIndexEdit: null,
  Cliente: initialGMClient(),
});

export const initialGMContactForm = (): GMContactoClienteCompleto => ({
  DatosPersona: {
    IdDatosPersona: DEFAULT_UUID,
    Prioridad: 0,
    Titulo: 'N/D',
    Nombres: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Puesto: 'N/D',
    Departamento: 'N/D',
    IdCatNivelDecision: null,
    IdCatNivelPuesto: null,
    AgregadoExpo: true,
    OrigenRegistro: '',
    IdCatDificultad: null,
    IdCatMantenimiento: null,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
  },
  CorreoElectronico: {
    Activo: true,
    Correo: '',
    FechaRegistro: DEFAULT_DATE,
    IdCorreoElectronico: DEFAULT_UUID,
    IdDatosPersona: DEFAULT_UUID,
  },
  Contacto: {
    IdContacto: DEFAULT_UUID,
    IdDatosPersona: DEFAULT_UUID,
    Prioridad: 0,
    FechaCaducidadRegistro: DEFAULT_DATE,
  },
  NumerosTelefonicos: [],
  ContactoCliente: {
    IdContactoCliente: DEFAULT_UUID,
    IdCliente: DEFAULT_UUID,
    IdContacto: DEFAULT_UUID,
    FechaRegistro: DEFAULT_DATE,
    FechaCaducidadRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
  },
  EsPrincipal: true,
});

export const initialGMClient = (): Cliente => ({
  IdCliente: DEFAULT_UUID,
  IdCatCorporativo: null,
  Nombre: null,
  Alias: null,
  IdCatRolCliente: null,
  IdCatSector: null,
  IdCatIndustria: null,
  ObjetivoCrecimientoDeseado: 10,
  ObjetivoCrecimientoFundamental: 10,
  Contrato: '',
  Pagina: null,
  PortalFactura: '',
  IdCatNivelIngreso: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Activo: true,
  IdConfiguracionPagos: null,
  IdCatImportanciaCliente: null,
  EsTerceroAutorizado: false,
  IdArchivo: null,
  RecogeEnProquifa: false,
  RestringirVentaSustanciasControladas: true,
  TramitarConOrdenDeCompraInterna: false,
  TramitarSinOrdenDeCompra: false,
  IdUsuarioVendedor: null,
  NombreImagen: '',
});

export const initialGMDirection = (): Direccion => ({
  Activo: true,
  Calle: '',
  Ciudad: '',
  CodigoPostal: '',
  Colonia: '',
  DireccionTextoDos: null,
  DireccionTextoUno: null,
  Estado: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatPais: '',
  IdCatRutaEntrega: '',
  IdCatTipoDireccion: '',
  IdCatZona: '',
  IdDireccion: DEFAULT_UUID,
  Latitud: 0.0,
  Longitud: 0.0,
  Municipio: null,
  NumeroExterior: null,
  NumeroInterior: null,
  RequiereCita: false,
  TipoRegion: null,
  UsaFormatoEnTexto: null,
});

export const initialGMClientDirection = (): DireccionCliente => ({
  Activo: true,
  Consecutivo: null,
  DistanciaCartaPorte: null,
  Folio: null,
  IdCliente: DEFAULT_UUID,
  IdDatosDireccionCliente: null,
  IdDireccion: DEFAULT_UUID,
  IdDireccionCliente: DEFAULT_UUID,
  IdHorarioAtencionCobro: null,
  IdHorarioAtencionEntrega: null,
  IdHorarioAtencionRevision: null,
  IdHorarioAtencionVisita: null,
  PagaGuiaEnvio: false,
  Proquifa: null,
});
