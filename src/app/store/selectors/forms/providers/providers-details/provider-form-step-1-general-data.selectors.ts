import {createSelector} from '@ngrx/store';
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  selectedProvider,
  selectProvidersAddEdit,
} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {
  GeneralData,
  IContactoDetalleProvObj,
  IVProvider,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {filter, find, isEmpty, isEqual, map as _map, omit, trim} from 'lodash-es';
import {
  CatRutaEntrega,
  CatTipoNumeroTelefonico,
  CatZona,
  CorreoElectronico,
  Direccion,
  NumeroTelefonico,
} from 'api-catalogos';
import {
  selectCatPaisForDropDownList,
  selectListDeliveryRoutes,
  selectTypeMobile,
  selectTypePhone1,
  selectTypePhone2,
  selectvCatCustomerForDropDownList,
  selectvCatRolProviderForDropDownList,
  selectvCatRutasEntregaForDropDownList,
  selectvCatZonaForDropDownList,
  selectZoneCatalogList,
} from '@appSelectors/catalogs/catalogs.selectors';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {getArrayForDropDownList} from '@appUtil/util';

export const selectProvidersGeneralData = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): GeneralData => state?.generalData,
);

export const selectGeneralDataProviderObject = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): IVProvider => state?.provider,
);
export const selectGeneralDataProviderId = createSelector(
  selectGeneralDataProviderObject,
  (state: IVProvider): string => state?.IdProveedor,
);
export const getProviderId = createSelector(
  selectedProvider,
  (state: IVProveedor): string => state?.IdProveedor,
);
export const getZopCodeIsValid = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): boolean => state?.zipCodeIsValid,
);
export const selectProvider = createSelector(
  selectedProvider,
  (state: IVProveedor): IVProveedor => state,
);
export const selectedProviderIsMexican = createSelector(
  selectProvider,
  (state: IVProvider): boolean => state?.Mexicano,
);
export const selectProviderIsMexican = createSelector(
  selectGeneralDataProviderObject,
  (state: IVProvider): boolean => state?.Mexicano,
);
export const selectContacts = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): Array<IContactoDetalleProvObj> => state.contacts,
);
export const selectAddress = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): Direccion => state.address,
);
export const selectedCatPais = createSelector(
  [selectAddress, selectCatPaisForDropDownList],
  (address: Direccion, catPais: Array<DropListOption>): DropListOption =>
    find(catPais, (o: DropListOption) => address?.IdCatPais === o?.value),
);
export const selectedRoutesDelivery = createSelector(
  [selectAddress, selectvCatRutasEntregaForDropDownList],
  (address: Direccion, routesDelivery: Array<DropListOption>): DropListOption =>
    find(routesDelivery, (o: DropListOption) => address?.IdCatRutaEntrega === o?.value),
);

export const selectedZone = createSelector(
  [selectAddress, selectvCatZonaForDropDownList],
  (address: Direccion, zone: Array<DropListOption>): DropListOption =>
    find(zone, (o: DropListOption) => address?.IdCatZona === o?.value),
);
export const selectedCatCustomerBuy = createSelector(
  [selectGeneralDataProviderObject, selectvCatCustomerForDropDownList],
  (provider: IVProvider, routesDelivery: Array<DropListOption>): DropListOption =>
    find(routesDelivery, (o: DropListOption) => provider?.IdUsuarioComprador === o?.value),
);
export const selectedCatCustomerPay = createSelector(
  [selectGeneralDataProviderObject, selectvCatCustomerForDropDownList],
  (provider: IVProvider, routesDelivery: Array<DropListOption>): DropListOption =>
    find(routesDelivery, (o: DropListOption) => provider?.IdUsuarioPagador === o?.value),
);
export const selectedCatRolProvider = createSelector(
  [selectGeneralDataProviderObject, selectvCatRolProviderForDropDownList],
  (provider: IVProvider, zone: Array<DropListOption>): DropListOption =>
    find(zone, (o: DropListOption) => provider?.IdCatRolProveedor === o?.value),
);
export const selectDisableContacts = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): Array<IContactoDetalleProvObj> => state.disableContacts,
);
export const selectContactToEdit = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): IContactoDetalleProvObj => state.contactToEdit,
);
export const selectContactToEditEmail = createSelector(
  selectContactToEdit,
  (state: IContactoDetalleProvObj): CorreoElectronico =>
    !isEmpty(state?.CorreoElectronico) ? state?.CorreoElectronico[0] : null,
);
export const selectContactToEditPhone1 = createSelector(
  selectContactToEdit,
  selectTypePhone1,
  (state: IContactoDetalleProvObj, typePhone1: CatTipoNumeroTelefonico): NumeroTelefonico =>
    find(
      state?.NumeroTelefonico,
      (o: NumeroTelefonico) =>
        o.IdCatTipoNumeroTelefonico === typePhone1?.IdCatTipoNumeroTelefonico,
    ),
);
export const selectContactToEditPhone2 = createSelector(
  selectContactToEdit,
  selectTypePhone2,
  (state: IContactoDetalleProvObj, typePhone2: CatTipoNumeroTelefonico): NumeroTelefonico =>
    find(
      state?.NumeroTelefonico,
      (o: NumeroTelefonico) =>
        o.IdCatTipoNumeroTelefonico === typePhone2?.IdCatTipoNumeroTelefonico,
    ),
);
export const selectContactToEditMobile = createSelector(
  selectContactToEdit,
  selectTypeMobile,
  (state: IContactoDetalleProvObj, typeMobile: CatTipoNumeroTelefonico): NumeroTelefonico =>
    find(
      state?.NumeroTelefonico,
      (o: NumeroTelefonico) =>
        o.IdCatTipoNumeroTelefonico === typeMobile?.IdCatTipoNumeroTelefonico,
    ),
);
export const selectRfcValidation = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): boolean => state.rfcIsValid,
);
export const selectAllowedFormAddress = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): boolean => state.allowedFormAddress,
);
export const selectedFormCountryIsMexican = createSelector(
  [selectedCatPais],
  (selectedCountry: DropListOption): boolean => selectedCountry?.labelKey === 'MX',
);
export const generalDataHasChanges = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): boolean => {
    state = {
      ...state,
      contacts: _map(state.contacts, (o: IContactoDetalleProvObj) => omit(o, ['editing'])),
      backUp: {
        ...state.backUp,
        contacts: _map(state.backUp?.contacts, (o: IContactoDetalleProvObj) =>
          omit(o, ['editing']),
        ),
      },
    };
    const original = JSON.stringify(omit(state, ['backUp', 'contactToEdit']));
    const backup = JSON.stringify(omit(state.backUp, ['backUp', 'contactToEdit']));
    return !isEqual(original, backup);
  },
);

export const saveValidatorStep1 = createSelector(
  [selectProvidersGeneralData, selectProviderIsMexican],
  (state: GeneralData, isMexican: boolean): boolean => {
    const isMexicanValidations = isMexican
      ? !!(state.address?.IdCatRutaEntrega && state.address?.IdCatZona) &&
        trim(state.address?.CodigoPostal).length === 5
      : true;

    return !!(
      trim(state.provider?.Nombre) &&
      trim(state.provider?.RazonSocial) &&
      trim(state.provider?.TaxId) &&
      state.provider?.IdCatRolProveedor &&
      trim(state.address?.Calle) &&
      trim(state.address?.Colonia) &&
      trim(state.address?.Ciudad) &&
      trim(state.address?.Municipio) &&
      trim(state.address?.Estado) &&
      trim(state.address?.IdCatPais) &&
      trim(state.address?.CodigoPostal) &&
      (state.provider?.ObjetivoCrecimientoFundamental > 0
        ? state.provider.ObjetivoCrecimientoFundamental <= 1
        : true) &&
      (state.provider?.ObjetivoCrecimientoDeseado > 0
        ? state.provider?.ObjetivoCrecimientoDeseado <= 1
        : true) &&
      isMexicanValidations &&
      state.contacts?.length > 0 &&
      state.rfcIsValid
    );
  },
);
export const selectContactFormHasChanges = createSelector(
  selectProvidersGeneralData,
  (state: GeneralData): boolean => {
    return (
      state.backUp.contactToEdit &&
      !isEqual(JSON.stringify(state.contactToEdit), JSON.stringify(state.backUp.contactToEdit))
    );
  },
);
export const contactValidation = createSelector(
  [selectContactToEdit, selectContactFormHasChanges],
  (state: IContactoDetalleProvObj, hasChanges: boolean): boolean =>
    !isEmpty(state?.Nombres) &&
    !isEmpty(state?.ApellidoPaterno) &&
    !isEmpty(state?.Titulo) &&
    !isEmpty(state?.Puesto) &&
    !isEmpty(state?.Departamento) &&
    !isEmpty(state?.NumeroTelefonico) &&
    !isEmpty(state?.CorreoElectronico[0]?.Correo) &&
    hasChanges,
);
export const selectCatZonaForDropDownList = createSelector(
  selectZoneCatalogList,
  selectedRoutesDelivery,
  (zonesList: Array<CatZona>, selectedRoute: DropListOption): Array<DropListOption> => {
    const filteredZones = filter(
      zonesList,
      (o: CatZona) => o.IdCatRutaEntrega === selectedRoute?.value,
    );
    return getArrayForDropDownList(filteredZones, 'IdCatZona', 'Zona');
  },
);
export const selectCATDeliveyRoutes = createSelector(
  selectListDeliveryRoutes,
  (deliveryRoutes: CatRutaEntrega[]) => {
    const routes = filter(
      deliveryRoutes,
      (route) => route.Clave === 'local' || route.Clave === 'foraneo',
    );
    return getArrayForDropDownList(routes, 'IdCatRutaEntrega', 'RutaEntrega');
  },
);
