import {createSelector} from '@ngrx/store';
import {filter, find, isEmpty, isEqual, map as _map, omit} from 'lodash-es';

// SELECTORS
import {
  dropTiposDireccion,
  selectCatPaisForDropDownList,
  selectvCatAddressTypeForDropDownList,
  selectvCatRutasEntregaForDropDownList,
  selectvCatZonaForDropDownList,
  selectZoneCatalogList,
} from '@appSelectors/catalogs/catalogs.selectors';
import {getArrayForDropDownList} from '@appUtil/util';

// MODELS
import {
  CatTipoDireccion,
  CatZona,
  DatosDireccionClienteComentario,
  ParametroGeocoding,
} from 'api-catalogos';
import {
  IClientAddress,
  IDireccion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectClientDetailsForm} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';

export const selectAddress = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): IClientAddress => state.address,
);
export const selectedAddress = createSelector(
  selectAddress,
  (state: IClientAddress): IDireccion => find(state.address, (o: IDireccion) => o?.isSelected),
);
export const selectAddressOnly = createSelector(
  selectAddress,
  (state: IClientAddress): Array<IDireccion> => state.address,
);
export const selectedAddressIndex = createSelector(
  selectAddress,
  (state: IClientAddress): IDireccion => find(state.address, (o: IDireccion) => o.isSelected),
);
export const selectComments = createSelector(
  selectedAddressIndex,
  (state: IDireccion): Array<DatosDireccionClienteComentario> => state?.DeliveryDataComments,
);
export const selectAddressToDelete = createSelector(
  selectAddress,
  (state: IClientAddress) => state.deleteAddress,
);
export const selectSearchTerm = createSelector(
  selectAddress,
  (state: IClientAddress): string => state.searchTermByAddress,
);
export const selectDeliveryComments = createSelector(
  selectComments,
  dropTiposDireccion,
  (
    comments: DatosDireccionClienteComentario[],
    addressTypes: CatTipoDireccion[],
  ): DatosDireccionClienteComentario[] =>
    filter(
      comments,
      (o: DatosDireccionClienteComentario) =>
        o.IdCatTipoDireccion === find(addressTypes, (a) => a.Tipo === 'Entrega').IdCatTipoDireccion,
    ),
);
export const selectReviewComments = createSelector(
  selectComments,
  dropTiposDireccion,
  (
    comments: DatosDireccionClienteComentario[],
    addressTypes: CatTipoDireccion[],
  ): DatosDireccionClienteComentario[] =>
    filter(
      comments,
      (o: DatosDireccionClienteComentario) =>
        o.IdCatTipoDireccion ===
        find(addressTypes, (a) => a.Tipo === 'Revision').IdCatTipoDireccion,
    ),
);
export const selectChargesComments = createSelector(
  selectComments,
  dropTiposDireccion,
  (
    comments: DatosDireccionClienteComentario[],
    addressTypes: CatTipoDireccion[],
  ): DatosDireccionClienteComentario[] =>
    filter(
      comments,
      (o: DatosDireccionClienteComentario) =>
        o.IdCatTipoDireccion === find(addressTypes, (a) => a.Tipo === 'Cobro').IdCatTipoDireccion,
    ),
);
export const selectVisitComments = createSelector(
  selectComments,
  dropTiposDireccion,
  (
    comments: DatosDireccionClienteComentario[],
    addressTypes: CatTipoDireccion[],
  ): DatosDireccionClienteComentario[] =>
    filter(
      comments,
      (o: DatosDireccionClienteComentario) =>
        o.IdCatTipoDireccion === find(addressTypes, (a) => a.Tipo === 'Visita').IdCatTipoDireccion,
    ),
);
export const selectAddressForm = createSelector(
  selectAddress,
  (state: IClientAddress): IDireccion => state.addressForm,
);
export const selectDireccionCliente = createSelector(
  selectAddressForm,
  (state: IDireccion) => state.clienteDireccion,
);
export const selectedFormZone = createSelector(
  [selectAddress, selectvCatZonaForDropDownList],
  (address: IClientAddress, zoneDrop: DropListOption[]): DropListOption =>
    find(zoneDrop, (o: DropListOption) => o.value === address.addressForm.IdCatZona),
);
export const selectedFormCountry = createSelector(
  [selectAddress, selectCatPaisForDropDownList],
  (address: IClientAddress, catPais: Array<DropListOption>): DropListOption =>
    find(catPais, (o: DropListOption) => o.value === address.addressForm.IdCatPais),
);
export const selectedFormCountryIsMexican = createSelector(
  [selectAddress, selectedFormCountry],
  (address: IClientAddress, selectedCountry: DropListOption): boolean =>
    selectedCountry?.labelKey === 'MX',
);
export const selectedFormRoute = createSelector(
  [selectAddress, selectvCatRutasEntregaForDropDownList],
  (address: IClientAddress, catRoutes: DropListOption[]): DropListOption =>
    find(catRoutes, (o: DropListOption) => o.value === address.addressForm.IdCatRutaEntrega),
);
export const selectCatZonaForDropDownList = createSelector(
  [selectZoneCatalogList, selectedFormRoute],
  (zones: Array<CatZona>, selectedRoute: DropListOption): Array<DropListOption> => {
    const filteredZones = filter(
      zones,
      (o: CatZona) => o.IdCatRutaEntrega === selectedRoute?.value,
    );
    return getArrayForDropDownList(filteredZones, 'IdCatZona', 'Zona');
  },
);
export const selectedAddressType = createSelector(
  [selectAddress, selectvCatAddressTypeForDropDownList],
  (address: IClientAddress, addressTypes: DropListOption[]): DropListOption =>
    find(addressTypes, (o: DropListOption) => o.value === address.addressForm.IdCatTipoDireccion),
);
export const selectShowMapCount = createSelector(
  selectAddress,
  (state: IClientAddress): number => state.showMapCount,
);
export const showMapConfig = createSelector(
  selectedFormCountry,
  selectedFormRoute,
  selectvCatRutasEntregaForDropDownList,
  selectedAddressType,
  (
    formCountry: DropListOption,
    formRoute: DropListOption,
    catRoutes: Array<DropListOption>,
    addressType: DropListOption,
  ): boolean => {
    return (
      addressType?.label === 'Entrega' &&
      formCountry?.label === 'MÉXICO' &&
      (formRoute?.label === 'Local' || formRoute?.label === 'Guadalajara')
    );
  },
);
export const enableShippingGuide = createSelector(
  selectedAddressType,
  selectedFormRoute,
  (addressType: DropListOption, route: DropListOption): boolean => {
    return (
      addressType?.label === 'Entrega' && route?.label !== 'Local' && route?.label !== 'Guadalajara'
    );
  },
);
export const selectDeliveryComment = createSelector(
  selectAddress,
  (state: IClientAddress): DatosDireccionClienteComentario => state.deliveryComment,
);
export const selectReviewDataComment = createSelector(
  selectAddress,
  (state: IClientAddress): DatosDireccionClienteComentario => state.reviewDataComment,
);
export const selectChargesDataComment = createSelector(
  selectAddress,
  (state: IClientAddress): DatosDireccionClienteComentario => state.chargesDataComment,
);
export const selectVisitComment = createSelector(
  selectAddress,
  (state: IClientAddress): DatosDireccionClienteComentario => state.visitComment,
);
export const selectZipCodeIsValid = createSelector(
  selectAddress,
  (state: IClientAddress): boolean => state.zipCodeIsValid,
);
export const addressTypesWithValidation = createSelector(
  dropTiposDireccion,
  selectAddressOnly,
  (typesList: CatTipoDireccion[], addressList: IDireccion[]): DropListOption[] => {
    const typesAvailables = filter(typesList, (t: CatTipoDireccion) => {
      const exist = !isEmpty(
        find(addressList, (a: IDireccion) => a.IdCatTipoDireccion === t.IdCatTipoDireccion),
      );
      if (!exist || (exist && !t.UnicaEnClientes)) {
        return t;
      }
    });
    return getArrayForDropDownList(typesAvailables, 'IdCatTipoDireccion', 'Tipo');
  },
);
export const addressFormRequiredData = createSelector(
  selectAddressForm,
  (state: IDireccion): boolean => {
    return !!(
      state.IdCatTipoDireccion &&
      state.IdCatPais &&
      state.Ciudad &&
      state.CodigoPostal &&
      state.Calle &&
      state.Colonia &&
      state.Municipio &&
      state.Estado &&
      state.IdCatRutaEntrega &&
      state.IdCatZona
    );
  },
);
export const enableAddAddress = createSelector(
  selectAddress,
  selectCatPaisForDropDownList,
  selectedAddressType,
  selectedFormCountry,
  addressFormRequiredData,
  (
    state: IClientAddress,
    catPais: Array<DropListOption>,
    addressType: DropListOption,
    formCountry: DropListOption,
    requiredData: boolean,
  ): boolean => {
    const addressForm = state.addressForm;
    const selectedCountry: DropListOption = find(
      catPais,
      (o: DropListOption) => o.value === addressForm.IdCatPais,
    );
    if (
      (addressForm.TipoRegion === 'Local' || addressForm.TipoRegion === 'Guadalajara') &&
      addressType?.label === 'Entrega'
    ) {
      return (
        requiredData &&
        addressForm.clienteDireccion.DistanciaCartaPorte !== null &&
        (selectedCountry && selectedCountry.labelKey === 'MX'
          ? addressForm.CodigoPostal.length === 5
          : true) &&
        !isEqual(JSON.stringify(addressForm), JSON.stringify(state.addressFormBackUp))
      );
    } else {
      return (
        requiredData &&
        (selectedCountry && selectedCountry.labelKey === 'MX'
          ? addressForm.CodigoPostal.length === 5
          : true) &&
        !isEqual(JSON.stringify(addressForm), JSON.stringify(state.addressFormBackUp))
      );
    }
  },
);
export const selectGeoCodingInfo = createSelector(
  selectAddressForm,
  (state: IDireccion): ParametroGeocoding => {
    return {
      CodigoPostal: state?.CodigoPostal,
      Estado: state?.Estado,
      Municipio: state?.Municipio,
      Asentamiento: state?.Colonia,
      Calle: state?.Calle,
      Numero: state?.NumeroExterior !== null ? state?.NumeroExterior?.toString() : '0',
    };
  },
);
export const selectClientAddressesHasChanges = createSelector(
  selectAddress,
  (state: IClientAddress): boolean => {
    const addressList = _map(state.address, (o: IDireccion) => {
      return omit(o, ['isSelected']);
    });
    const addressBackUp = _map(state.backUp.address, (o: IDireccion) => {
      return omit(o, ['isSelected']);
    });
    return !isEqual(JSON.stringify(addressList), JSON.stringify(addressBackUp));
  },
);
export const validationAddresses = createSelector(
  [selectAddressOnly, selectClientAddressesHasChanges],
  (address: Array<IDireccion>, hasChanges: boolean): boolean => {
    const addressList = _map(address, (o: IDireccion) => {
      return omit(o, ['isSelected']);
    });
    const validation = filter(addressList, (o: IDireccion) =>
      ((o.DeliveryData?.CopiasPorFactura && o.DeliveryData?.NumCopiasFacturas) ||
        !o.DeliveryData?.CopiasPorFactura) &&
      ((o.DeliveryData?.CopiaPedido && o.DeliveryData?.NumCopiasPedido) ||
        !o.DeliveryData?.CopiaPedido) &&
      o.AddressTypeName === 'Entrega'
        ? o.horariosEntrega.length
        : true,
    );

    return validation.length === addressList.length && hasChanges;
  },
);
