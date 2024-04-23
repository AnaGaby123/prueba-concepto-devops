import {
  CatTipoNumeroTelefonico,
  ContactoDetalleObj,
  ResultadoValidadorDireccion,
  VCliente,
} from 'api-catalogos';
import {Persona} from '@appModels/catalogos/persona/persona';
import {initialContactForm} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {
  IDireccion,
  initialIDireccion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {
  IGMClienteCotizacion,
  initialGMClient,
  initialGMClientQuotation,
} from '@appModels/store/quotation/quotation-details/details/sections/gm-client-quotation.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface INewClientForm {
  selectedClient: VCliente;
  contacts: Array<ContactoDetalleObj>;
  contactsToDelete: Array<Persona>;
  contactForm: ContactoDetalleObj;
  backup: IClientsGeneralDataBackUp;
  catPhoneTypes: Array<CatTipoNumeroTelefonico>;
  addressForm: IDireccion;
  addressValidation: ResultadoValidadorDireccion;
  zipCodeIsValid: boolean;
  showMap: boolean;
  existingEmail: boolean;
  alertChanges: boolean;
  title: string;
  gmClientQuotation: IGMClienteCotizacion;
  deliveryAddresses: Array<DropListOption>;
  deliveryAddressSelected: DropListOption;
  allowEditForm: boolean;
}

export const initialNewClientFormState = (): INewClientForm => ({
  selectedClient: initialGMClient(),
  contacts: [],
  contactsToDelete: [],
  contactForm: initialContactForm(),
  backup: {
    selectedClient: {},
    contacts: [],
  },
  catPhoneTypes: [],
  addressForm: initialIDireccion(),

  addressValidation: {
    Valido: false,
    Mensaje: '',
  },
  zipCodeIsValid: true,
  showMap: false,
  existingEmail: false,
  alertChanges: false,
  title: 'COTIZAR · REGISTRAR NUEVO CLIENTE',
  gmClientQuotation: initialGMClientQuotation(),
  deliveryAddresses: [
    {
      value: '1',
      label: 'Recoge en  almacén Ciudad de México',
    },
    {
      value: '2',
      label: 'Recoge en almacén Guadalajara',
    },
    {
      value: '3',
      label: 'Envío a domicilio',
    },
  ],
  deliveryAddressSelected: null,
  allowEditForm: false,
});

export interface IClientsGeneralDataBackUp {
  selectedClient: VCliente;
  contacts: Array<ContactoDetalleObj>;
}

export const initialClient = (): VCliente => ({
  IdCliente: DEFAULT_UUID,
  IdCatCorporativo: null,
  Nombre: null,
  Alias: null,
  IdCatRolCliente: null,
  IdCatSector: null,
  IdCatIndustria: null,
  ObjetivoCrecimientoDeseado: null,
  ObjetivoCrecimientoFundamental: null,
  Contrato: null,
  Pagina: null,
  PortalFactura: null,
  IdCatNivelIngreso: null,
  FechaRegistro: new Date().toISOString(),
  FechaUltimaActualizacion: new Date().toISOString(),
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
});
