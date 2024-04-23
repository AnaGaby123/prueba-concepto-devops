/*core imports */
import {createSelector} from '@ngrx/store';
import {
  selectDetails,
  selectNewCustomerSection,
} from '@appSelectors/quotation/quotation-details/details/details.selectors';
import {filter, find, isEqual, omit} from 'lodash-es';

/*model imports */
import {
  IDireccion,
  initialIDireccion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {
  CatRutaEntrega,
  CatTipoNumeroTelefonico,
  CatZona,
  ContactoDetalleObj,
  DireccionCliente,
  NumeroTelefonico,
  ParametroGeocoding,
  VCliente,
} from 'api-catalogos';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IClientsGeneralDataBackUp,
  INewClientForm,
} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';
import {
  getArrayForDropDownList,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredNumber,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {IDetails} from '@appModels/store/quotation/quotation-details/details/details.models';

/*selector imports */
import {
  selecCatIndustriaForDropDown,
  selectCatalogs,
  selectCatPaisForDropDownList,
  selectCatRolClientsForDropDown,
  selectCatSectorForDropDown,
  selectListCatDecisionLevelForDropDown,
  selectListCatDifficultyForDropDown,
  selectListCatJobLevelForDropDown,
  selectListCatMaintenanceForDropDown,
  selectListDeliveryRoutes,
  selectTipoTelefono,
  selectZoneCatalogList,
} from '@appSelectors/catalogs/catalogs.selectors';

/*tools imports */
import {
  IGMClienteCotizacion,
  initialGMClient,
} from '@appModels/store/quotation/quotation-details/details/sections/gm-client-quotation.models';
import {Cliente, DatosPersona, Direccion, GMContactoClienteCompleto} from 'api-logistica';
import {QuotationDetailsState} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {selectQuotationDetails} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import {RutaEntregaHelpers} from '@appHelpers/shared/shared.helpers';

export const selectNewCustomer = createSelector(
  selectDetails,
  (state: IDetails): INewClientForm => state?.newCustomer,
);
export const selectSelectedClient = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): VCliente => state.selectedClient,
);
export const selectContactCustomerList = createSelector(
  selectNewCustomer,
  (state: INewClientForm): Array<ContactoDetalleObj> => state?.contacts,
);
export const selectDeliveryAddresses = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): Array<DropListOption> => state?.deliveryAddresses,
);
export const selectDeliveryAddressSelected = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): DropListOption => state?.deliveryAddressSelected,
);
export const selectGMClientQuotation = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): IGMClienteCotizacion => state.gmClientQuotation,
);
export const selectBackUpCustomer = createSelector(
  selectNewCustomer,
  (state: INewClientForm): IClientsGeneralDataBackUp => state?.backup,
);
export const selectMap = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): boolean => state.showMap,
);
export const selectAlertChanges = createSelector(
  selectNewCustomer,
  (state: INewClientForm): boolean => state?.alertChanges,
);
export const selectNewContactForm = createSelector(
  selectGMClientQuotation,
  (state: IGMClienteCotizacion): GMContactoClienteCompleto => state.contactForm,
);
export const selectPersonData = createSelector(
  selectNewContactForm,
  (state: GMContactoClienteCompleto) => state.DatosPersona,
);
export const selectPhonesContact = createSelector(
  selectContactCustomerList,
  (state: Array<ContactoDetalleObj>) =>
    state.map((o: ContactoDetalleObj): Array<NumeroTelefonico> => o?.NumeroTelefonico),
);
export const selectContactFromPhones = createSelector(
  selectNewContactForm,
  (state: GMContactoClienteCompleto): Array<NumeroTelefonico> => state.NumerosTelefonicos,
);
export const selectClient = createSelector(
  selectGMClientQuotation,
  (state: IGMClienteCotizacion) => state.Cliente,
);
export const selectDirection = createSelector(
  selectGMClientQuotation,
  (state: IGMClienteCotizacion) => state.Direccion,
);
export const selectAddressForm = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): IDireccion => state.addressForm,
);
export const selectedNewClient = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): VCliente => state?.selectedClient,
);
export const selectedClientName = createSelector(
  selectSelectedClient,
  (state: VCliente): string => state.Nombre,
);
export const selectedClientRFC = createSelector(
  selectedNewClient,
  (state: VCliente): string => state.RFC,
);
export const selectRecogeEnProquifa = createSelector(
  selectSelectedClient,
  selectDeliveryAddressSelected,
  (state: VCliente, deliveryAddress: DropListOption): boolean =>
    state.RecogeEnProquifa || deliveryAddress === null,
);
export const selectZipCodeIsValid = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): boolean => state?.zipCodeIsValid,
);
export const openAddAlert = createSelector(selectNewCustomer, (state: INewClientForm): boolean => {
  return (
    !isEqual(
      JSON.stringify(omit(state?.selectedClient, ['FechaUltimaActualizacion', 'FechaRegistro'])),
      JSON.stringify(omit(initialGMClient(), ['FechaUltimaActualizacion', 'FechaRegistro'])),
    ) ||
    !isEqual(
      JSON.stringify(omit(state.addressForm, ['FechaUltimaActualizacion', 'FechaRegistro'])),
      JSON.stringify(omit(initialIDireccion(), ['FechaUltimaActualizacion', 'FechaRegistro'])),
    ) ||
    state.contacts.length !== 0
  );
});

export const selectGeoCodingInfo = createSelector(
  selectDirection,
  (state: Direccion): ParametroGeocoding => {
    const last = {
      CodigoPostal: state?.CodigoPostal,
      Estado: state?.Estado,
      Municipio: state?.Municipio,
      Asentamiento: state?.Colonia,
      Calle: state?.Calle,
      Numero: state?.NumeroExterior?.toString() || '0',
    };
    return last;
  },
);
export const selectDeliveryRouteId = createSelector(
  selectDirection,
  (state: Direccion): string => state?.IdCatRutaEntrega,
);
export const selectDirectionClient = createSelector(
  selectAddressForm,
  (state: IDireccion): DireccionCliente => state?.clienteDireccion,
);
export const selectDirectionClientDistance = createSelector(
  selectDirectionClient,
  (state: DireccionCliente): number => state?.DistanciaCartaPorte,
);
export const selectPayShippingGuide = createSelector(
  selectDirectionClient,
  (state: DireccionCliente): boolean => state?.PagaGuiaEnvio,
);
export const selectFilteredCatZonaForDropList = createSelector(
  [selectDeliveryRouteId, selectZoneCatalogList],
  (deliveryRouteId: string, catZona: Array<CatZona>): Array<DropListOption> =>
    getArrayForDropDownList(
      filter(catZona, (o: CatZona) => o?.IdCatRutaEntrega === deliveryRouteId),
      'IdCatZona',
      'Zona',
    ),
);
export const selectClientContacts = createSelector(
  selectGMClientQuotation,
  (state: IGMClienteCotizacion): GMContactoClienteCompleto[] => state.ContactosCliente,
);
export const selectContactFormPhone1 = (phoneType) =>
  createSelector(
    [selectContactFromPhones, selectTipoTelefono],
    (
      state: Array<NumeroTelefonico>,
      phoneTypesList: Array<CatTipoNumeroTelefonico>,
    ): NumeroTelefonico => {
      const phoneType1 = find(
        phoneTypesList,
        (o: CatTipoNumeroTelefonico) => o?.Clave === phoneType,
      );
      return find(
        state,
        (o: NumeroTelefonico) =>
          o?.IdCatTipoNumeroTelefonico === phoneType1?.IdCatTipoNumeroTelefonico,
      );
    },
  );

export const selectIsValidContact = createSelector(
  [selectPersonData, selectContactFormPhone1('telefono1')],
  (contact: DatosPersona, phone1: NumeroTelefonico): boolean =>
    contact?.Nombres !== null &&
    contact?.Nombres !== '' &&
    contact?.ApellidoPaterno !== null &&
    contact?.ApellidoPaterno !== '' &&
    contact?.Titulo !== null &&
    contact?.Titulo !== '' &&
    contact?.Puesto !== null &&
    contact?.Puesto !== '' &&
    contact?.Departamento !== null &&
    contact?.Departamento !== '' &&
    phone1 !== null &&
    phone1 !== undefined &&
    contact?.AgregadoExpo !== null,
);
export const selectvCatRutasEntregaForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> =>
    getArrayForDropDownList(
      state.rutasEntrega.listCatRutasEntrega,
      'IdCatRutaEntrega',
      'RutaEntrega',
      null,
      null,
      null,
      'Clave',
    ),
);
export const selectFormRoute = createSelector(
  [selectDirection, selectvCatRutasEntregaForDropDownList],
  (direction: Direccion, catRoutes: Array<DropListOption>): DropListOption =>
    find(catRoutes, (o: DropListOption) => o?.value === direction?.IdCatRutaEntrega),
);
export const selectFormZone = createSelector(
  [selectDirection, selectFilteredCatZonaForDropList],
  (direction: Direccion, catRoutes: Array<DropListOption>): DropListOption =>
    find(catRoutes, (o: DropListOption) => o?.value === direction?.IdCatZona),
);

export const selectValidateShowMap = createSelector(
  [selectFormRoute, selectvCatRutasEntregaForDropDownList, selectDirection],
  (formRoute: DropListOption, catRoutes: Array<DropListOption>, form: Direccion): boolean => {
    if (formRoute?.label === 'Local') {
      return formRoute === find(catRoutes, (o: DropListOption) => o?.label === 'Local');
    }
    if (formRoute?.label === 'Guadalajara') {
      return (
        formRoute ===
        find(catRoutes, (o: DropListOption) => o?.label === 'Local' || o?.label === 'Guadalajara')
      );
    }
  },
);
export const selectClientDirectionCoords = createSelector(
  selectDirection,
  (state: Direccion): object => ({lat: state?.Latitud, lng: state?.Longitud}),
);
export const selectFormCountry = createSelector(
  [selectDirection, selectCatPaisForDropDownList],
  (address: Direccion, catPais: Array<DropListOption>): DropListOption =>
    find(catPais, (o: DropListOption) => o?.value === address?.IdCatPais),
);
export const selectedFormCountryIsMexican = createSelector(
  [selectFormCountry],
  (selectedCountry: DropListOption): boolean => selectedCountry?.labelKey === 'MX',
);
export const selectedClientRole = createSelector(
  [selectCatRolClientsForDropDown, selectClient],
  (roles: Array<DropListOption>, client: Cliente): DropListOption =>
    find(roles, (o: DropListOption) => o?.value === client?.IdCatRolCliente),
);
export const selectedCatIndustry = createSelector(
  [selecCatIndustriaForDropDown, selectClient],
  (industry: Array<DropListOption>, client: Cliente): DropListOption =>
    find(industry, (o: DropListOption) => o?.value === client?.IdCatIndustria),
);
export const selectedCatSector = createSelector(
  [selectCatSectorForDropDown, selectClient],
  (sector: Array<DropListOption>, client: Cliente): DropListOption =>
    find(sector, (o: DropListOption) => o?.value === client?.IdCatSector),
);
export const selectedDificutad = createSelector(
  [selectPersonData, selectListCatDifficultyForDropDown],
  (contact: DatosPersona, zoneDrop: Array<DropListOption>): DropListOption =>
    find(zoneDrop, (o: DropListOption) => o?.value === contact?.IdCatDificultad),
);
export const selectedMaintenance = createSelector(
  [selectPersonData, selectListCatMaintenanceForDropDown],
  (contact: DatosPersona, zoneDrop: Array<DropListOption>): DropListOption =>
    find(zoneDrop, (o: DropListOption) => o?.value === contact?.IdCatMantenimiento),
);
export const selectedDecisionLevel = createSelector(
  [selectPersonData, selectListCatDecisionLevelForDropDown],
  (contact: DatosPersona, zoneDrop: Array<DropListOption>): DropListOption =>
    find(zoneDrop, (o: DropListOption) => o?.value === contact.IdCatNivelDecision),
);
export const selectedJobLevel = createSelector(
  [selectPersonData, selectListCatJobLevelForDropDown],
  (contact: DatosPersona, zoneDrop: Array<DropListOption>): DropListOption =>
    find(zoneDrop, (o: DropListOption) => o?.value === contact?.IdCatNivelPuesto),
);
export const getVerityEmail = createSelector(
  selectNewCustomer,
  (state: INewClientForm): boolean => state?.existingEmail,
);
export const selectedExitingLagAndLog = createSelector(
  [selectAddressForm],
  (address: IDireccion): boolean => address?.Latitud !== null && address?.Longitud !== null,
);

export const selectPhoneLength = (phoneType) =>
  createSelector(
    [selectContactFromPhones, selectTipoTelefono],
    (state: NumeroTelefonico[], phoneTypes: CatTipoNumeroTelefonico[]): number => {
      const phoneTypeObject: CatTipoNumeroTelefonico = find(
        phoneTypes,
        (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === phoneType,
      );
      const phone = find(
        state,
        (p: NumeroTelefonico) =>
          p.IdCatTipoNumeroTelefonico === phoneTypeObject.IdCatTipoNumeroTelefonico,
      );
      return phone?.Numero?.length || 0;
    },
  );
export const selectContactIndexEdit = createSelector(
  selectGMClientQuotation,
  (state: IGMClienteCotizacion) => state.contactIndexEdit,
);
export const selectIsValidForms = createSelector(
  [
    selectClient,
    selectDirection,
    selectClientContacts,
    selectZipCodeIsValid,
    selectFormRoute,
    selectDirectionClientDistance,
    selectedFormCountryIsMexican,
  ],
  (
    client: Cliente,
    address: Direccion,
    contacts: GMContactoClienteCompleto[],
    codzip: boolean,
    route: DropListOption,
    clientDistance: number,
    isMexican: boolean,
  ): boolean => {
    const fieldsRequiredToValidate = [
      client?.Alias,
      client?.Nombre,
      client?.IdCatRolCliente,
      client?.IdCatIndustria,
      client?.IdCatSector,
    ];
    const isRequiredValid = fieldsRequiredToValidate.every((f) => validateFieldsRequiredString(f));
    const fieldsRequiredAddressToValidate = [
      address?.IdCatPais,
      address?.IdCatRutaEntrega,
      address?.IdCatZona,
    ];
    const isRequiredAddressValid = fieldsRequiredAddressToValidate.every((f) =>
      validateFieldsRequiredString(f),
    );
    const fieldsOptionalAddressToValidate = [
      address?.Ciudad,
      address?.Calle,
      address?.Colonia,
      address?.CodigoPostal,
      address?.Estado,
      address?.Municipio,
    ];
    const isOptionalAddressValid = fieldsOptionalAddressToValidate.every((f) =>
      validateFieldIsNotContainOnlySpacesAndLength(f),
    );
    const isDistanceValid =
      route?.labelKey === RutaEntregaHelpers.local ||
      route?.labelKey === RutaEntregaHelpers.guadalajara
        ? clientDistance > 0
        : true;
    return (
      isRequiredValid &&
      validateFieldsRequiredNumber(contacts?.length) &&
      (client?.RecogeEnProquifa === false
        ? validateFieldIsNotContainOnlySpacesAndLength(address?.NumeroExterior, 0) &&
          validateFieldIsNotContainOnlySpacesAndLength(address?.NumeroInterior, 0) &&
          codzip &&
          isRequiredAddressValid &&
          isDistanceValid &&
          isOptionalAddressValid &&
          isMexican
          ? address.CodigoPostal.length === 5
          : true
        : true)
    );
  },
);
export const selectAllowEditForm = createSelector(
  selectNewCustomerSection,
  (state: INewClientForm): boolean => state.allowEditForm,
);
export const selectRouteIsInternalMessaging = createSelector(
  [selectFormRoute, selectListDeliveryRoutes],
  (route: DropListOption, routes: CatRutaEntrega[]): boolean => {
    const routeSelected = find(routes, (o: CatRutaEntrega) => o?.Clave === route?.labelKey);
    return routeSelected?.EsMensajeriaInterna;
  },
);
export const showMapConfig = createSelector(
  [selectFormRoute, selectedFormCountryIsMexican],
  (route: DropListOption, isMexican: boolean): boolean =>
    isMexican &&
    (route?.labelKey === RutaEntregaHelpers.local ||
      route?.labelKey === RutaEntregaHelpers.guadalajara),
);
