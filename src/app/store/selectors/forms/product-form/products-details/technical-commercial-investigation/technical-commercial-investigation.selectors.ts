/* Core Imports */
/* Dev Tools*/
/* Selectors */
/* Models */
import {createSelector} from '@ngrx/store';
import {
  backOrderString,
  IProductTechnicalCommercialInvestigation,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {
  selectCatBroadCastMedia,
  selectCatMoneda,
  selectListTradeMark,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  getArrayForDropDownList,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {
  CatMedioDifusion,
  CatMoneda,
  Producto,
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  ProductoEstandar,
  ProductoLabware,
  ProductoPublicacion,
  ProductoReactivo,
  VMarcaFamilia,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {filter, find, map as _map, pick} from 'lodash-es';
import {selectDetailsProductState} from '@appSelectors/forms/product-form/product-form.selectors';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export const selectProduct = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state?.productDetails,
);
export const selectProductData = createSelector(
  selectProduct,
  (state: VProductoDetalle) => state?.Producto,
);
export const selectProductPublicationsData = createSelector(
  selectProduct,
  (state: VProductoDetalle) => state?.ProductoPublicacion,
);
export const selectProductTrainingData = createSelector(
  selectProduct,
  (state: VProductoDetalle) => state?.ProductoCapacitacion,
);
export const selectedTrademark = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state?.selectedTradeMark,
);

export const selectValidationSuplemmentaryProduct = createSelector(
  [selectDetailsProductState, selectProductData],
  (state: ProductsDetails, product: Producto): boolean => {
    return (
      validateFieldIsNotContainOnlySpacesAndLength(state.supplement?.Editorial) &&
      validateFieldIsNotContainOnlySpacesAndLength(state.supplement?.Edicion) &&
      validateFieldIsNotContainOnlySpacesAndLength(state.supplement?.ISBN, 1) &&
      validateFieldsRequiredString(state.supplement?.Descripcion) &&
      validateFieldsRequiredString(product.Descripcion) &&
      state.supplement?.Descripcion !== product.Descripcion
    );
  },
);
export const selectProductToSave = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) =>
    find(
      pick(state.productDetails, [
        'ProductoLabware',
        'ProductoPublicacion',
        'ProductoReactivo',
        'ProductoEstandar',
        'ProductoDispositivoMedico',
        'ProductoCapacitacion',
      ]),
      (
        o:
          | ProductoCapacitacion
          | ProductoPublicacion
          | ProductoEstandar
          | ProductoLabware
          | ProductoDispositivoMedico
          | ProductoReactivo,
      ) => o !== null && o.Activo,
    ),
);
export const selectProductToDelete = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) =>
    find(
      pick(state.productDetails, [
        'ProductoLabware',
        'ProductoPublicacion',
        'ProductoReactivo',
        'ProductoEstandar',
        'ProductoDispositivoMedico',
        'ProductoCapacitacion',
      ]),
      (
        o:
          | ProductoCapacitacion
          | ProductoPublicacion
          | ProductoEstandar
          | ProductoLabware
          | ProductoDispositivoMedico
          | ProductoReactivo,
      ) => o !== null && !o.Activo,
    ) ?? null,
);
export const selectValidateCas = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.validateCas,
);
export const selectCatTrademarkDropDownList = createSelector(selectListTradeMark, (trademarks) => {
  return getArrayForDropDownList(trademarks.listTrademark, 'IdMarca', 'Nombre');
});
export const selecteTypesProductsFamily = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => {
    const printValue = (value: string, prefix: string) =>
      value && value.toLowerCase() !== 'n/a' ? `${prefix}${value}` : '';
    return _map(
      state.productsTypeFamily,
      (o: VMarcaFamilia) =>
        ({
          value: o.IdMarcaFamilia,
          label: `${printValue(o.Tipo, '')}${printValue(o.Subtipo, ' · ')}${printValue(
            o.Control,
            ' · ',
          )}`,
          labelKey: `${printValue(o?.ClaveTipo, '')}${printValue(o.ClaveSubtipo, '')}${printValue(
            o?.ClaveControl,
            '',
          )}`,
        } as DropListOption),
    );
  },
);
export const selectProductTypeFamily = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productsTypeFamily,
);
export const selectedTypeProductsFamily = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state?.productTypeFamilySelected,
);
export const selectedUnit = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.unitSelected,
);
export const selectedAvailability = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): DropListOption => state.availabilitySelected,
);
export const selectedBillingRestrictionSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.billingRestrictionSelected,
);
export const selectPhysicalStateSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.selectedPhysicalState,
);
export const selectCatClassificationsSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.classificationProductSelected,
);
export const selectUseSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.useSelected,
);
export const selectTypePresentationSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.typePresentationSelected,
);
export const selectTypeApplicationSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.typeApplicationSelected,
);
export const selectInternationalDepositarySelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.internationalDepositarySelected,
);
export const selectTransportationWaySelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.transportationWaySelected,
);
export const selectTransportationManagementSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.transportationManagementSelected,
);
export const selectStorageSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.storageSelected,
);
export const selectePublicationsFormatSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.publicationsFormatSelected,
);
export const selectCharacteristicGrouper = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.characteristicGrouper,
);
export const selectCharacteristicGrouperSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.characteristicGrouperSelected,
);
export const selectDateValidityCuratorship = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.dateValidityCuratorship,
);
export const selectDateExpirationHelathRegister = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.dateExpirationHealthRegister,
);
export const selectFilesTechnicalCommercialInvestigation = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state?.technicalCommercialInvestigationFiles,
);
export const selectStructureMolecular = createSelector(
  selectFilesTechnicalCommercialInvestigation,
  (state: IProductTechnicalCommercialInvestigation) => state?.ArchivoEstructuraMolecular,
);

export const selectsSupplementaryProductsToSave = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) =>
    filter(
      state.supplementaryProducts,
      (o: VProductoSuplementario) => o.IdProductoSuplementario === DEFAULT_UUID,
    ),
);
export const selectsSupplementaryProductsToDelete = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.supplementaryProductsToDelete,
);

export const selectSupplementsProducts = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.supplement,
);
export const selectsSupplementaryProducts = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.supplementaryProducts,
);
export const selectBroadCastMediaRadios = createSelector(
  selectCatBroadCastMedia,
  (state): DropListOption[] => {
    return _map(
      state.listCatMedioDeDifusion,
      (o: CatMedioDifusion): DropListOption => {
        return {
          label: o.MedioDifusion,
          value: o.IdCatMedioDifusion,
        };
      },
    );
  },
);

export const selectBroadCastMediaSelected = createSelector(
  selectBroadCastMediaRadios,
  selectProductTrainingData,
  (broadCastMedia, training): string => {
    const selected: DropListOption = find(
      broadCastMedia,
      (o: DropListOption) => o.value === training?.IdCatMedioDifusion,
    );
    return selected?.label ?? 'N/D';
  },
);
export const selectAvailabilityIsBackOrder = createSelector(
  selectedAvailability,
  (availability: DropListOption): boolean => {
    return availability?.labelKey === backOrderString;
  },
);
export const selectBackOrderAvailabilityDate = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.fechaDisponibilidadBackOrderSelected,
);
export const selectProviderBuyCurrency = createSelector(
  [selectProductTypeFamily, selectedTypeProductsFamily, selectCatMoneda],
  (
    families: Array<VMarcaFamilia>,
    productTypeFamilySelected: DropListOption,
    catMoneda: Array<CatMoneda>,
  ): string => {
    const selectedFamily: VMarcaFamilia = find(
      families,
      (f: VMarcaFamilia) => f.IdMarcaFamilia === productTypeFamilySelected?.value,
    );
    return selectedFamily?.TieneProveedorPrincipal
      ? find(catMoneda, (o: CatMoneda) => o.IdCatMoneda === selectedFamily.IdCatMonedaPagos)
          ?.ClaveMoneda
      : 'USD';
  },
);
export const selectProviderSalesCurrency = createSelector(
  [selectProductTypeFamily, selectedTypeProductsFamily, selectCatMoneda],
  (
    families: Array<VMarcaFamilia>,
    productTypeFamilySelected: DropListOption,
    catMoneda: Array<CatMoneda>,
  ): string => {
    const selectedFamily: VMarcaFamilia = find(
      families,
      (f: VMarcaFamilia) => f.IdMarcaFamilia === productTypeFamilySelected?.value,
    );
    return selectedFamily?.TieneProveedorPrincipal
      ? find(catMoneda, (o: CatMoneda) => o.IdCatMoneda === selectedFamily.IdCatMonedaVentas)
          ?.ClaveMoneda
      : 'USD';
  },
);
