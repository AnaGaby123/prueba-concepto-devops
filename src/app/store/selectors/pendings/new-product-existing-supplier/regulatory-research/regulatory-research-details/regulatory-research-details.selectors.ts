import {createSelector} from '@ngrx/store';
import {
  selectProductDetails,
  selectRegulatoryResearch,
} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.selectors';
import {IRegulatoryResearchState} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.models';
import {
  IRegulatoryResearchDetailsState,
  ProductRatificationExtended,
  TechnicalSection,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {ProviderListItemForRegulatoryResearch} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {filter, find} from 'lodash-es';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {
  getArrayForDropListOptionsPqf,
  isValidId,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredNumber,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {selectCatalogsState} from '@appCore/core.state';
import {
  CatMoneda,
  CatProductoInvestigacionSeguimiento,
  Producto,
  VMarcaFamilia,
  VProducto,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {
  selectCatalogs,
  selectCatBillingRestrictionForDropDownPqf,
  selectCatMoneda,
  selectCatProductInvestigationFollowList,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DEFAULT_UUID, ENUM_PRODUCT_FAMILY_KEY_VALIDATION} from '@appUtil/common.protocols';
import {
  isProductLabware,
  isProductMedicalDispositive,
  isProductPublication,
  isProductReactive,
  isProductStandar,
  isProductTraining,
  isStandarAndReactiveBiologic,
  isStandarAndReactiveChemist,
} from '@appHelpers/pending/new-product-existing-supplier/regulatory-research.helpers';
import {getOnlyFileName} from '@appUtil/files';
import {
  backOrderString,
  IRegulationFiles,
  ISupplements,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {CotPartidaCotizacionInvestigacionSeguimiento} from 'api-logistica';

export const regulatoryResearchDetailsState = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState): IRegulatoryResearchDetailsState =>
    state.regulatoryResearchDetails,
);

export const productDetails = createSelector(regulatoryResearchDetailsState, (state) => {
  return state?.selectedProduct?.productDetails;
});
export const selectTechnicalSection = createSelector(
  regulatoryResearchDetailsState,
  (state) => state?.selectedProduct?.technicalSection,
);
export const selectStructureMolecular = createSelector(regulatoryResearchDetailsState, (state) => {
  return state?.selectedProduct?.technicalSection?.ArchivoEstructuraMolecular;
});

export const selectSearchTerm = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state.searchTerm,
);
export const selectFilterOptions = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state.filterOptions,
);
export const selectedFilterOption = createSelector(
  selectFilterOptions,
  (state: Array<FilterOptionPqf>): FilterOptionPqf =>
    find(state, (o: FilterOptionPqf) => o.isActive),
);
export const selectTabOptions = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state.tabOptions,
);
export const selectValidCas = createSelector(
  regulatoryResearchDetailsState,
  (state) => state.selectedProduct?.casValid,
);
export const isTabRegulationAndRestrictions = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) =>
    state.tabOptions
      .find((it) => it.selected)
      ?.label.includes('regulationAndNonTariffRestrictions'),
);
export const selectProductList = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state.productList,
);
export const selectedProduct = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state.selectedProduct,
);

export const selectedProductId = createSelector(
  selectedProduct,
  (state: ProductRatificationExtended) => {
    return state?.IdProducto;
  },
);
export const selectedProvider = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state?.selectedProvider,
);
export const selectedProviderId = createSelector(
  selectedProvider,
  (state: ProviderListItemForRegulatoryResearch) => state?.IdProveedor,
);
export const selectProductListQueryInfo = createSelector(
  [selectedProviderId, selectSearchTerm, selectedFilterOption],
  (providerId: string, searchTerm: string, filterOption: FilterOptionPqf) => {
    const queryInfo = queryInfoWithActiveFilter(false, false);
    queryInfo.SortField = 'FechaRecepcion';
    queryInfo.SortDirection = 'asc';
    queryInfo.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: providerId,
    });
    if (searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'Descripcion',
        ValorFiltro: searchTerm,
      });
    }
    if (filterOption) {
      queryInfo.SortDirection = filterOption.id === '2' ? 'asc' : 'desc';
    }
    return queryInfo;
  },
);
export const selectBrandFamilyList = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => {
    return state.selectedProduct?.technicalSection?.familiesList;
  },
);

export const selectedBrandFamily = createSelector(
  [selectBrandFamilyList, productDetails],
  (list: DropListOptionPqf[], productDetails: VProductoDetalle) => {
    return list?.find((it) => it.id === productDetails?.IdMarcaFamilia);
  },
);

export const selectTypeProduct = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): string => {
    if (isProductStandar(state?.label)) {
      return 'ProductoEstandar';
    }

    if (isProductReactive(state?.label)) {
      return 'ProductoReactivo';
    }

    if (isProductPublication(state?.label)) {
      return 'ProductoPublicacion';
    }

    if (isProductLabware(state?.label)) {
      return 'ProductoLabware';
    }

    if (isProductMedicalDispositive(state?.label)) {
      return 'ProductoDispositivoMedico';
    }
    if (isProductTraining(state?.label)) {
      return 'ProductoCapacitacion';
    }
    return null;
  },
);

export const selectedTypeForValidations = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): string => {
    if (isStandarAndReactiveBiologic(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.BIOLOGIC;
    }

    if (isStandarAndReactiveChemist(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.CHEMIST;
    }

    if (isProductPublication(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.PUBLICATION;
    }

    if (isProductLabware(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.LABWARE;
    }

    if (isProductMedicalDispositive(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.MEDICAL_DEVICE;
    }
    if (isProductTraining(state?.label)) {
      return ENUM_PRODUCT_FAMILY_KEY_VALIDATION.TRAINING;
    }
    return null;
  },
);

export const isStandarOrReactive = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductStandar(state?.label) || isProductReactive(state?.label);
  },
);

export const isStandardAndReactiveChemist = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isStandarAndReactiveChemist(state?.label);
  },
);

export const isStandardAndReactiveBiologic = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isStandarAndReactiveBiologic(state?.label);
  },
);

export const isStandar = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductStandar(state?.label);
  },
);

export const isLabware = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductLabware(state?.label);
  },
);

export const isPublication = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductPublication(state?.label);
  },
);

export const selectSupplementNode = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => state?.selectedProduct?.technicalSection?.supplement,
);

export const selectSupplementList = createSelector(regulatoryResearchDetailsState, (state) => {
  return state?.selectedProduct?.technicalSection?.supplementaryProducts;
});

export const isMedicalDispositive = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductMedicalDispositive(state?.label);
  },
);

export const isTraining = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf): boolean => {
    return isProductTraining(state?.label);
  },
);

export const nodeTypeProductDetails = createSelector(
  [selectTypeProduct, productDetails],
  (family: string, details: VProductoDetalle) => {
    if (!family) {
      return;
    }
    return details[family];
  },
);

export const nodeProduct = createSelector(
  productDetails,
  (productoDetalle: VProductoDetalle): Producto => {
    return productoDetalle?.Producto;
  },
);

export const nodeSupplementProduct = createSelector(
  productDetails,
  (productoDetalle: VProductoDetalle): Array<VProducto> => {
    return productoDetalle?.vProductoSuplementarios;
  },
);

export const selectsSupplementaryProductsToSave = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => {
    return filter(
      state.regulatoryResearchDetails?.selectedProduct?.technicalSection?.supplementaryProducts,
      (o: VProductoSuplementario) => o?.IdProductoSuplementario === DEFAULT_UUID,
    );
  },
);

export const selectCatCatClasificationList = createSelector(
  selectedProduct,
  (state: ProductRatificationExtended) => {
    return state?.technicalSection?.classificationList;
  },
);

export const selectCatCatClasification = createSelector(
  [selectCatCatClasificationList, nodeProduct],
  (list: DropListOptionPqf[], product: Producto) => {
    const idClasification = product?.IdCatClasificacionInformativaProducto;
    if (!list) {
      return null;
    }
    return list.find((it: DropListOptionPqf) => it.id === idClasification);
  },
);

export const selectPhysicalStateList = createSelector(selectCatalogs, (state) => {
  return state?.catPhysicalState?.listPhysicalStatesPqf || [];
});

export const selectPhysicalState = createSelector(
  [selectPhysicalStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatEstadoFisico);
  },
);

export const selectUseStateList = createSelector(selectCatalogs, (state) => {
  return state?.catUse?.listUsesPqf || [];
});
export const selectUseState = createSelector(
  [selectUseStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatUso);
  },
);

export const selectDepositaryStateList = createSelector(selectCatalogs, (state) => {
  return state?.catInternationalDepositary.listInternationalDepositaryPqf || [];
});

export const selectDepositaryState = createSelector(
  [selectDepositaryStateList, nodeProduct],
  (list: DropListOptionPqf[], product: Producto) => {
    return list.find((it) => it.id === product?.IdCatDepositarioInternacional);
  },
);
export const selectPresentationStateList = createSelector(selectCatalogs, (state) => {
  return state?.catPresentationType.listPresentationTypesPqf || [];
});

export const selectPresentationState = createSelector(
  [selectPresentationStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatTipoPresentacion);
  },
);

export const selectAplicationStateList = createSelector(selectCatalogs, (state) => {
  return state?.catApplication.listApplicationsPqf || [];
});

export const selectAplicationState = createSelector(
  [selectAplicationStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatAplicacion);
  },
);
export const selectcTransportationWayStateList = createSelector(selectCatalogs, (state) => {
  return state.catTransportationWay.listTransportationsWayPqf || [];
});

export const selectcTransportationWayState = createSelector(
  [selectcTransportationWayStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatMedioTransporte);
  },
);

export const selectcTransportationManagementStateList = createSelector(selectCatalogs, (state) => {
  return state.catTransportationManagement.listTransportationManagementPqf || [];
});

export const selectcTransportationManagementState = createSelector(
  [selectcTransportationManagementStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatManejoTransporte);
  },
);

export const selectcPublicationFormatList = createSelector(selectCatalogs, (state) => {
  return state.catPublicationsFormat.listPublicationsFormatPqf || [];
});

export const selectcBroadcastMediumList = createSelector(selectCatalogs, (state) => {
  return state.catMedioDeDifusion?.listCatMedioDeDifusionPqf;
});

export const selectcBroadcastMedium = createSelector(
  [selectCatalogs, nodeTypeProductDetails],
  (state, node) => {
    return state.catMedioDeDifusion?.listCatMedioDeDifusionPqf?.find(
      (it) => it.id === node?.IdCatMedioDifusion,
    );
  },
);

export const selectcPublicationFormat = createSelector(
  [selectcPublicationFormatList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatFormatoPublicacion);
  },
);
export const selectcTransportationStorageState = createSelector(
  [selectcTransportationManagementStateList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], state) => {
    return list.find((it) => it.id === state?.IdCatManejoAlmacenaje);
  },
);

export const selectUnidadList = createSelector(selectCatalogsState, (state) => {
  return state.unidadPqf.listUnidad;
});

export const selectUnidad = createSelector(
  [selectUnidadList, productDetails],
  (list: DropListOptionPqf[], productDetails: VProductoDetalle) => {
    return list.find((it) => it.id === productDetails?.Producto?.IdCatUnidad);
  },
);
export const selectAvaibleList = createSelector(
  selectCatalogsState,
  isTraining,
  (state: CatalogsState, isTraining: boolean): DropListOptionPqf[] => {
    const availabilities = getArrayForDropListOptionsPqf(
      state.catAvailability.listAvailability,
      'IdCatDisponibilidad',
      'Disponibilidad',
      null,
      null,
      'Clave',
    );
    if (isTraining) {
      return filter(availabilities, (o: DropListOptionPqf) => o.labelKey !== backOrderString);
    }
    return availabilities;
  },
);
export const selectedAvaible = createSelector(
  [selectAvaibleList, productDetails],
  (list: Array<DropListOptionPqf>, productDetails: VProductoDetalle) => {
    return list.find((it) => it.id === productDetails?.IdCatDisponibilidad);
  },
);
export const selectAvailabilityIsBackOrder = createSelector(
  selectedAvaible,
  (availability: DropListOptionPqf): boolean => {
    return availability?.labelKey === backOrderString;
  },
);
export const queryGroupCharacteristics = createSelector([productDetails], (productDetails) => {
  const body = queryInfoWithActiveFilter();
  body.Filters.push({
    NombreFiltro: 'IdMarcaFamilia',
    ValorFiltro: productDetails?.IdMarcaFamilia,
  });
  return body;
});

export const selectGroupCharacteristicList = createSelector(selectedProduct, (selectedProduct) => {
  return selectedProduct?.technicalSection?.groupCharacteristic || [];
});

export const selectGroupCharacteristic = createSelector(
  [selectGroupCharacteristicList, nodeProduct],
  (selectGroupCharacteristicList: DropListOptionPqf[], product: Producto) => {
    return selectGroupCharacteristicList.find((it) => it.id === product.IdAgrupadorCaracteristica);
  },
);

export const selectPurchaseRestrictionList = createSelector(
  selectCatBillingRestrictionForDropDownPqf,
  (list: DropListOptionPqf[]) => {
    return list;
  },
);

export const selectPurchaseRestriction = createSelector(
  [selectPurchaseRestrictionList, nodeTypeProductDetails],
  (list: DropListOptionPqf[], productDetails) => {
    return list.find((it: DropListOptionPqf) => it.id === productDetails?.IdCatRestriccionDeCompra);
  },
);

export const selectsSupplementaryProductsToDelete = createSelector(
  selectRegulatoryResearch,
  (state) => {
    return state.regulatoryResearchDetails?.selectedProduct?.technicalSection
      ?.supplementaryProductsToDelete;
  },
);

export const producTypeBackUp = createSelector(
  [selectTypeProduct, regulatoryResearchDetailsState],
  (family: string, state: IRegulatoryResearchDetailsState) => {
    if (!family) {
      return;
    }
    return state?.selectedProduct?.productDetailsBackUp[family];
  },
);

export const producDetailsBackUp = createSelector(
  [selectTypeProduct, regulatoryResearchDetailsState],
  (family: string, state: IRegulatoryResearchDetailsState): VProductoDetalle => {
    if (!family) {
      return;
    }
    return state?.selectedProduct?.productDetailsBackUp;
  },
);

export const productBackUp = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => {
    return state.selectedProduct?.productDetailsBackUp?.Producto;
  },
);

export const vProductoSuplementariosBackUp = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => {
    return state.selectedProduct?.productDetailsBackUp?.vProductoSuplementarios;
  },
);

export const hasChangesOnProduct = createSelector(
  [
    nodeTypeProductDetails,
    producTypeBackUp,
    nodeProduct,
    productBackUp,
    nodeSupplementProduct,
    vProductoSuplementariosBackUp,
    productDetails,
    producDetailsBackUp,
  ],
  (
    productType,
    productTypeBackUp,
    product,
    productBackUp,
    supplementary,
    supplementaryBackUp,
    productDetails,
    producDetailsBackUp,
  ) => {
    const formatJsonToCompare = (json): string => {
      if (!json) {
        return '';
      }
      return JSON.stringify(json, Object.keys(json).sort());
    };
    const isSameProductDetails: boolean =
      formatJsonToCompare(productType) === formatJsonToCompare(productTypeBackUp);
    const isSameProduct: boolean =
      formatJsonToCompare(product) === formatJsonToCompare(productBackUp);
    const isSameSupplementary: boolean =
      formatJsonToCompare(supplementary) === formatJsonToCompare(supplementaryBackUp);
    const hasChangesFamily = productDetails?.IdMarcaFamilia === producDetailsBackUp?.IdMarcaFamilia;
    return !(isSameProductDetails && isSameProduct && isSameSupplementary && hasChangesFamily);
  },
);

export const hasRestrictionsAndRegularizations = createSelector(
  selectedBrandFamily,
  (state: DropListOptionPqf) => {
    return (
      isProductLabware(state?.label) ||
      isProductStandar(state?.label) ||
      isProductReactive(state?.label)
    );
  },
);

export const selectBaseProductValidation = createSelector(
  nodeProduct,
  (product: Producto): boolean => {
    return (
      validateFieldsRequiredString(product?.Catalogo, 2) &&
      validateFieldsRequiredString(product?.Descripcion) &&
      validateFieldsRequiredString(product?.IdCatUnidad) &&
      validateFieldsRequiredNumber(product?.PrecioListaMonedaProveedor) &&
      validateFieldsRequiredString(product?.Presentacion, 1) &&
      validateFieldsRequiredString(product?.FechaCaducidadVigenciaCuraduria) &&
      validateFieldIsNotContainOnlySpacesAndLength(product?.Nota)
    );
  },
);

export const selectIsDigitalPublication = createSelector(
  isPublication,
  selectcPublicationFormat,
  (isPublication: boolean, publicationsFormatSelected: DropListOptionPqf): boolean => {
    return isPublication && publicationsFormatSelected?.label.toLowerCase() !== 'farmacopea';
  },
);

export const selectValidations = createSelector(
  [
    selectedTypeForValidations,
    nodeProduct,
    nodeTypeProductDetails,
    selectBaseProductValidation,
    productDetails,
    selectIsDigitalPublication,
    selectValidCas,
    selectPurchaseRestriction,
  ],
  (
    familyName,
    product,
    family,
    baseProductValidation,
    productDetails,
    selectIsDigitalPublication: boolean,
    validCAS: boolean,
    purchaseRestriction: DropListOptionPqf,
  ) => {
    let validate = false;
    switch (familyName) {
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.BIOLOGIC:
        validate =
          baseProductValidation &&
          (purchaseRestriction?.label === 'Límite de Piezas' ? product.NumeroDePiezas > 0 : true) &&
          validateFieldsRequiredString(family?.IdCatTipoPresentacion) &&
          validateFieldsRequiredString(family?.IdCatUso) &&
          validateFieldIsNotContainOnlySpacesAndLength(product?.Peligrosidad) &&
          validateFieldsRequiredString(productDetails?.IdCatDisponibilidad);
        break;
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.CHEMIST:
        const validRestriction: boolean =
          purchaseRestriction?.label === 'Límite de Piezas' ? product.NumeroDePiezas > 0 : true;
        validate =
          baseProductValidation &&
          validCAS &&
          (purchaseRestriction?.label === 'Límite de Piezas' ? product.NumeroDePiezas > 0 : true) &&
          validateFieldsRequiredString(family?.IdCatUso) &&
          validateFieldIsNotContainOnlySpacesAndLength(product?.Peligrosidad) &&
          validateFieldsRequiredString(productDetails?.IdCatDisponibilidad) &&
          validateFieldsRequiredString(family?.CAS, 1) &&
          validateFieldIsNotContainOnlySpacesAndLength(family?.Sinonimos) &&
          validateFieldIsNotContainOnlySpacesAndLength(family?.FormulaQuimica);
        break;
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.PUBLICATION:
        const validateTariffFraction = selectIsDigitalPublication
          ? validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionArancelaria, 10) &&
            validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionImportacion, 10)
          : validateFieldsRequiredString(product.FraccionArancelaria, 10) &&
            validateFieldsRequiredString(product.FraccionImportacion, 10);
        validate =
          baseProductValidation &&
          validateTariffFraction &&
          (purchaseRestriction?.label === 'Límite de Piezas' ? product.NumeroDePiezas > 0 : true) &&
          validateFieldsRequiredString(family?.Autor) &&
          validateFieldIsNotContainOnlySpacesAndLength(family?.Editorial) &&
          validateFieldIsNotContainOnlySpacesAndLength(family?.Edicion) &&
          validateFieldsRequiredString(family?.IdCatFormatoPublicacion) &&
          validateFieldsRequiredString(productDetails?.IdCatDisponibilidad);
        break;
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.LABWARE:
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.MEDICAL_DEVICE:
        validate =
          baseProductValidation &&
          (purchaseRestriction?.label === 'Límite de Piezas' ? product.NumeroDePiezas > 0 : true);
        break;
      case ENUM_PRODUCT_FAMILY_KEY_VALIDATION.TRAINING:
        const validPriceGroup: boolean =
          family?.PrecioPorGrupo !== '' &&
          family?.PrecioPorGrupo !== null &&
          family?.PrecioPorGrupo &&
          validateFieldsRequiredNumber(family?.NumeroDePersonasPorGrupo, 1);
        const validPricePerson: boolean =
          family?.PrecioPorPersona !== '' &&
          family?.PrecioPorPersona !== null &&
          family?.PrecioPorPersona &&
          true;
        validate =
          validateFieldsRequiredString(family?.DuracionEvento, 1) &&
          validateFieldsRequiredString(family?.IdCatMedioDifusion) &&
          isValidId(family?.IdCatMedioDifusion || '') &&
          validateFieldsRequiredNumber(productDetails?.PrecioListaMonedaProveedor) &&
          validateFieldsRequiredString(productDetails?.Descripcion) &&
          validateFieldsRequiredString(family?.DescripcionDetallada) &&
          validateFieldsRequiredString(productDetails?.IdCatDisponibilidad) &&
          isValidId(family?.IdCatMedioDifusion || '') &&
          // DOCS: Si es precio por grupo validar numero de personas por grupo, si no, toma como requerido Precio por persona
          (validPriceGroup || validPricePerson);
        break;
      default:
        validate = false;
        break;
    }
    return validate;
  },
);

export const selectCatClassificationList = createSelector(selectCatalogsState, (catalogoState) => {
  return catalogoState?.catClasificacionRegulatoria.listCatClasificacionRegulatoriaPqf;
});

export const selectCatClassification = createSelector(
  [selectCatClassificationList, nodeTypeProductDetails],
  (selectGroupCharacteristicList: DropListOptionPqf[], product) => {
    return selectGroupCharacteristicList.find(
      (it) => it.id === product?.IdCatClasificacionRegulatoria,
    );
  },
);

export const sanitaryDate = createSelector(nodeProduct, (state: Producto) =>
  state.FechaCaducidadRegistroSanitario !== null
    ? new Date(state.FechaCaducidadRegistroSanitario)
    : null,
);

export const nameFileArchiveLetterAvailble = createSelector(selectRegulatoryResearch, (state) => {
  return getOnlyFileName(
    state.regulatoryResearchDetails?.selectedProduct?.productDetails?.ArchivoCartaDeDisponibilidad
      ?.FileKey,
  );
});

export const selectedTabOption = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState) => {
    return state.tabOptions.find((it) => it.selected);
  },
);

export const selectRegulationFiles = createSelector(nodeTypeProductDetails, (state) => {
  const sendFiles: IRegulationFiles = {
    ArchivoCartaDeDisponibilidad: state?.ArchivoCartaDeDisponibilidad,
    ArchivoCartaDeUso: state?.ArchivoCartaDeUso,
    ArchivoPermisoDeAdquisicionEnPlaza: state?.ArchivoPermisoDeAdquisicionEnPlaza,
    ArchivoPermisoDeImprotacion: state?.ArchivoPermisoDeImprotacion,
    ArchivoAvisoDeQuimicosEsenciales: state?.ArchivoAvisoDeQuimicosEsenciales,
    ArchivoZoosanitarios: state?.ArchivoZoosanitarios,
    ArchivoCicoplafest: state?.ArchivoCicoplafest,
    ArchivoOtroPermiso: state?.ArchivoOtroPermiso,
  };
  return sendFiles;
});

export const selectProductInvestigationFollow = createSelector(
  selectCatProductInvestigationFollowList,
  (state: Array<CatProductoInvestigacionSeguimiento>): CatProductoInvestigacionSeguimiento =>
    find(state, (o: CatProductoInvestigacionSeguimiento) => o.Clave === 'InvestigacionRegulatoria'),
);

export const selectQueryFinishPurchasingConfiguration = createSelector(
  [selectProductInvestigationFollow, selectedProduct],
  (
    productInvestigationFollow: CatProductoInvestigacionSeguimiento,
    selectedProduct: ProductRatificationExtended,
  ): CotPartidaCotizacionInvestigacionSeguimiento => ({
    IdCotPartidaCotizacionInvestigacion: selectedProduct?.IdCotPartidaCotizacionInvestigacion,
    IdCatProductoInvestigacionSeguimiento:
      productInvestigationFollow?.IdCatProductoInvestigacionSeguimiento,
  }),
);

export const countListProducts = createSelector(
  regulatoryResearchDetailsState,
  (state: IRegulatoryResearchDetailsState): number => {
    return state?.productList.length || 0;
  },
);

export const isValidFinish = createSelector(
  [
    nodeTypeProductDetails,
    nodeProduct,
    productDetails,
    isPublication,
    isMedicalDispositive,
    isTraining,
  ],
  (productType, product, productDetails, isPublication, isMedicalDispositive, isTraining) => {
    if (isPublication || isMedicalDispositive || isTraining) {
      return true;
    }
    return !!(
      productType?.IdCatClasificacionRegulatoria ||
      product?.FraccionArancelaria ||
      product?.FraccionImportacion ||
      productType?.NotasRegulatoriasALaImportacion ||
      productType?.NumeroDeRegistroSanitario ||
      productType?.NumeroDeRegistroSanitario ||
      productDetails?.IdArchivoCartaDeDisponibilidad ||
      productDetails?.ArchivoCartaDeUso ||
      productDetails?.IdArchivoPermisoDeAdquisicionEnPlaza ||
      productDetails?.IdArchivoPermisoDeImprotacion ||
      productDetails?.IdArchivoAvisoDeQuimicosEsenciales ||
      productDetails?.IdArchivoZoosanitarios ||
      productDetails?.ArchivoCicoplafest ||
      productDetails?.IdArchivoOtroPermiso
    );
  },
);

export const selectProductDetailsListPrice = createSelector(
  productDetails,
  (state: VProductoDetalle): number => {
    return state?.PrecioListaMonedaProveedor;
  },
);

export const selectValidationSuplemmentaryProduct = createSelector(
  [selectSupplementNode, selectProductDetails],
  (supplement: ISupplements, product: VProductoDetalle): boolean => {
    return (
      validateFieldIsNotContainOnlySpacesAndLength(supplement?.Editorial) &&
      validateFieldIsNotContainOnlySpacesAndLength(supplement?.Edicion) &&
      validateFieldsRequiredString(supplement?.Descripcion) &&
      validateFieldsRequiredString(product?.Descripcion) &&
      supplement?.Descripcion !== product?.Descripcion
    );
  },
);
export const selectProviderSalesCurrency = createSelector(
  [selectProductDetails, selectTechnicalSection, selectCatMoneda],
  (
    productDetails: VProductoDetalle,
    technicalSection: TechnicalSection,
    catMoneda: Array<CatMoneda>,
  ): string => {
    const selectedFamily: VMarcaFamilia = find(
      technicalSection?.familyBrandList,
      (f: VMarcaFamilia) => f.IdMarcaFamilia === productDetails.IdMarcaFamilia,
    );
    return selectedFamily?.TieneProveedorPrincipal
      ? find(catMoneda, (o: CatMoneda) => o.IdCatMoneda === selectedFamily.IdCatMonedaVentas)
          ?.ClaveMoneda
      : 'USD';
  },
);
export const selectProviderBuyCurrency = createSelector(
  [selectProductDetails, selectTechnicalSection, selectCatMoneda],
  (
    productDetails: VProductoDetalle,
    technicalSection: TechnicalSection,
    catMoneda: Array<CatMoneda>,
  ): string => {
    const selectedFamily: VMarcaFamilia = find(
      technicalSection?.familyBrandList,
      (f: VMarcaFamilia) => f.IdMarcaFamilia === productDetails.IdMarcaFamilia,
    );
    return selectedFamily?.TieneProveedorPrincipal
      ? find(catMoneda, (o: CatMoneda) => o.IdCatMoneda === selectedFamily.IdCatMonedaPagos)
          ?.ClaveMoneda
      : 'USD';
  },
);
