import {createSelector} from '@ngrx/store';
import {selectAttendInvestigationDetails} from '@appSelectors/pendings/attend-investigation/attend-investigation.selectors';
import {
  AVAILABILITY_TYPES,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY_B,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  selectCatalogs,
  selectCatBroadCastMedia,
  selectCatMoneda,
  selectListFamilyLine,
  selectListTradeMark,
} from '@appSelectors/catalogs/catalogs.selectors';
import {
  getArrayForDropDownList,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredNumber,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {
  CatDisponibilidad,
  CatMedioDifusion,
  CatMoneda,
  ParametroBuscadorSugerencias,
  Producto,
  ProductoCapacitacion,
  ProductoEstandar,
  ProductoPublicacion,
  ProductoReactivo,
  QueryInfo,
  VMarcaFamilia,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {
  IProduct,
  ListProductsForm,
} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {
  IAttendInvestigationDetails,
  ICotPartidaInvetigacionAtencionComentariosObj,
  IProductInvestigation,
  IProviderResponse,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {deburr, filter, find, forEach, isEmpty, isEqual, map as _map, pick} from 'lodash-es';
import {
  backOrderString,
  IProductTechnicalCommercialInvestigation,
  IVProductoDetalle,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {
  CotPartidaCotizacionInvestigacionComentario,
  CotPartidaInvestigacionProducto,
  ResumeGroupQueryInfo,
} from 'api-logistica';
import {
  AttendInvestigationProductsStatus,
  AttendInvestigationProductsStatusKeys,
  IProvider,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IMessageHistory} from '@appModels/shared-components/message-history';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';

export const selectTabOptions = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.tabOptions,
);

export const selectProviderSelected = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails): IProvider => state.providerSelected,
);

export const selectTabOptionSelected = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.tabOptionSelected,
);
export const selectFilterOptions = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.filterOptions,
);

export const selectFilterSelected = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.filterSelected,
);
export const selectProviderContacts = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.providerContacts,
);
/**/
// DOCS Products selectors

export const selectListProductState = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.productList,
);

export const selectProductsType = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.listProductsType,
);

export const selectedItemTradeMark = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.TrademarkSelected,
);
export const selectedItemProductType = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.ProductTypeSelected,
);
export const selectedItemPrice = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.PriceSelected,
);
export const selectedItemLines = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.LineSelected,
);
export const selectedItemStatus = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.ProductStateSelected,
);
export const selectCatPrice = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.catPrice,
);
export const selectProductInvestigationList = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.productInvestigationList,
);
export const selectProductInvestigationApiStatus = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state.productInvestigationApiStatus,
);

export const selectListLines = createSelector(selectListFamilyLine, (state) => {
  let list: Array<DropListOption>;
  list = getArrayForDropDownList(
    state.listFamilyLine,
    'IdCatTipoProducto',
    'Tipo',
    'IdCatSubtipoProducto',
    'Subtipo',
  );
  list = _map(list, (o: DropListOption) => {
    return {
      ...o,
      label: o.label.split(' · N/A')[0],
    };
  });
  list.unshift({value: DEFAULT_UUID, label: 'Todas las líneas'});
  return list;
});
export const selectCatTrademark = createSelector(selectListTradeMark, (trademarks) => {
  let list: Array<DropListOption> = [];
  if (!isEmpty(trademarks?.listTrademark)) {
    list = getArrayForDropDownList(trademarks?.listTrademark, 'IdMarca', 'Nombre');
  }
  list.unshift({value: DEFAULT_UUID, label: 'Todas las Marcas'});
  return list;
});

export const selectProductsQueryInfo = createSelector(
  selectListProductState,
  ({queryInfo}): QueryInfo => queryInfo,
);
export const selectTypeSearch = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.selectedTypeOfSearch,
);
export const selectSearchTerm = createSelector(
  selectListProductState,
  (state: ListProductsForm) => state.searchTerm,
);
export const selectRunSearchTerm = createSelector(
  selectListProductState,
  (state) => state.runSearchTerm,
);
export const selectQueryInfo = createSelector(
  selectProductsQueryInfo,
  selectedItemTradeMark,
  selectedItemLines,
  selectedItemProductType,
  selectedItemStatus,
  selectRunSearchTerm,
  selectTypeSearch,
  (
    productsQueryInfo,
    itemTradeMark,
    itemLines,
    itemProductType,
    itemStatus,
    runSearchTerm,
    typeSearch,
  ) => {
    const queryInfo = {...productsQueryInfo};
    // Se agregan los filtros del drop list
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];
    if (itemTradeMark.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdMarca',
          ValorFiltro: itemTradeMark.value.toString(),
        },
      ];
    }
    if (itemLines.value !== DEFAULT_UUID) {
      const itemValues = itemLines.value.toString().split('|');
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdCatTipoProducto',
          ValorFiltro: itemValues[0].toString(),
        },
        {
          NombreFiltro: 'IdCatSubtipoProducto',
          ValorFiltro: itemValues[1].toString(),
        },
      ];
    }
    if (itemProductType.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Controlado',
          ValorFiltro: itemProductType.value.toString(),
        },
      ];
    }
    if (itemStatus.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdCatDisponibilidad',
          ValorFiltro: itemStatus.value.toString(),
        },
      ];
    }

    if (runSearchTerm !== '') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: typeSearch?.label
            ? patchTypeOfSearch(typeSearch.label === 'Marca' ? 'NombreMarca' : typeSearch.label)
            : '',
          ValorFiltro: runSearchTerm,
        },
      ];
    }

    return queryInfo;
  },
);
export const selectListProduct = createSelector(
  selectListProductState,
  (state) => state.listProduct.Results,
);
export const selectProductsTotal = createSelector(
  selectListProductState,
  (state) => state.listProduct.TotalResults,
);
export const selectProductsDesiredPage = createSelector(
  selectListProductState,
  (state) => state.queryInfo.desiredPage,
);
export const selectProductsStatus = createSelector(
  selectListProductState,
  (state) => state.productsStatus,
);
export const selectTypeList = createSelector(selectListProductState, (state) => state.typeList);
export const selectTypesOfSearch = createSelector(
  selectListProductState,
  (state) => state.optionTypesSearch,
);
export const selectOptionsOfProducts = createSelector(selectListProductState, (state) =>
  _map(
    state.optionsOfProducts,
    (o): DropListOption => {
      return {value: o.Id, label: o.Etiqueta};
    },
  ),
);
export const selectOptionOfProduct = createSelector(
  selectListProductState,
  (state) => state.optionOfProductSelected,
);
export const selectOptionsOfProductsStatus = createSelector(
  selectListProductState,
  (state) => state.optionsOfProductsStatus,
);
export const selectSuggestionQueryInfo = createSelector(
  selectedItemTradeMark,
  selectedItemLines,
  selectedItemProductType,
  selectSearchTerm,
  selectTypeSearch,
  (itemBrand, itemLines, itemProductType, searchTerm, typeSearch): ParametroBuscadorSugerencias => {
    const searchSuggestionParameters: ParametroBuscadorSugerencias = {} as ParametroBuscadorSugerencias;

    searchSuggestionParameters.POCO = typeSearch.label === 'Marca' ? 'vMarca' : 'vProducto';
    searchSuggestionParameters.NombreLlavePrimaria =
      typeSearch.label === 'Marca' ? 'IdMarca' : 'IdProducto';
    searchSuggestionParameters.info = {
      Filters: [],
      SortField: typeSearch.label === 'Marca' ? 'Nombre' : 'Descripcion',
      SortDirection: 'asc',
      pageSize: 100000,
      desiredPage: 1,
    };
    if (itemBrand.value !== DEFAULT_UUID) {
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'IdMarca',
          ValorFiltro: itemBrand.value.toString(),
        },
      ];
    }
    if (itemLines.value !== DEFAULT_UUID) {
      const itemValues = itemLines.value.toString().split('|');
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'IdCatTipoProducto',
          ValorFiltro: itemValues[0].toString(),
        },
        {
          NombreFiltro: 'IdCatSubtipoProducto',
          ValorFiltro: itemValues[1].toString(),
        },
      ];
    }
    if (itemProductType.value !== DEFAULT_UUID) {
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'Controlado',
          ValorFiltro: itemProductType.value.toString(),
        },
      ];
    }
    searchSuggestionParameters.NombreAtributo = typeSearch?.label
      ? patchTypeOfSearch(typeSearch.label)
      : '';
    searchSuggestionParameters.ParametroBusqueda = searchTerm;
    return searchSuggestionParameters;
  },
);

export const selectFetchMoreProductsInfo = createSelector(
  [selectListProduct, selectProductsTotal, selectProductsStatus, selectProductsDesiredPage],
  (
    productsList: Array<IProduct>,
    totalResults: number,
    apiStatus: number,
    desiredPage: number,
  ): IFetchMoreItemsInfo => {
    return {
      itemList: productsList,
      itemsTotalLength: totalResults,
      listRequestStatus: apiStatus,
      desiredPage,
      pageSize: PAGING_LIMIT,
      totalPages: totalResults >= PAGING_LIMIT ? Math.ceil(totalResults / PAGING_LIMIT) : 0,
    };
  },
);

const patchTypeOfSearch = (type: string): string => {
  return typesPatch[deburr(type)] || typesPatch.Default;
};

enum typesPatch {
  NombreMarca = 'NombreMarca',
  Descripcion = 'Descripcion',
  Marca = 'Nombre',
  Catalogo = 'Catalogo',
  CAS = 'CAS',
  Default = 'Descripcion',
}
// DOCS Selector de detalle del producto
export const selectDetailsProductState = createSelector(
  selectAttendInvestigationDetails,
  (state: IAttendInvestigationDetails) => state?.productDetails,
);
export const selectedTypeProductsFamily = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productTypeFamilySelected,
);
export const selectIsAddProduct = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.isAddProduct,
);
export const selectValidationConfigurationStandardAndReactiveBiologic = createSelector(
  selectedTypeProductsFamily,
  (state): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicOrigin
    );
  },
);
export const selectValidationConfigurationStandardAndReactiveChemist = createSelector(
  selectedTypeProductsFamily,
  (state): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNotional ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistcMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistOrigin
    );
  },
);
export const selectValidationConfigurationPublications = createSelector(
  selectedTypeProductsFamily,
  (state): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.publications;
  },
);
export const selectValidationConfigurationLabware = createSelector(
  selectedTypeProductsFamily,
  (state): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.labware;
  },
);
export const selectValidationConfigurationMedicalDevices = createSelector(
  selectedTypeProductsFamily,
  (state) => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.medicalDevices;
  },
);
export const selectValidationConfigurationTraining = createSelector(
  selectedTypeProductsFamily,
  (state) => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.training;
  },
);

export const handleValidationsConfigurationTypes = createSelector(
  [
    selectValidationConfigurationStandardAndReactiveBiologic,
    selectValidationConfigurationStandardAndReactiveChemist,
    selectValidationConfigurationPublications,
    selectValidationConfigurationLabware,
    selectValidationConfigurationTraining,
    selectValidationConfigurationMedicalDevices,
  ],
  (
    standardAndReactiveBiologic,
    standardAndReactiveChemist,
    publications,
    labware,
    training,
    medicalDevices,
  ) => {
    return {
      standardAndReactiveBiologic,
      standardAndReactiveChemist,
      publications,
      labware,
      training,
      medicalDevices,
    };
  },
);
export const selectProductData = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productDetails.Producto,
);
export const selectedAvailability = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): DropListOption => state.availabilitySelected,
);

export const selectProductDetails = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productDetails,
);
export const selectStandarBiologic = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.ProductoEstandar,
);
export const selectReactiveBiologic = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.ProductoReactivo,
);
export const selectPublications = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.ProductoPublicacion,
);
export const selectTraining = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.ProductoCapacitacion,
);
export const selectMedicalDevices = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.ProductoDispositivoMedico,
);

export const selectValidationStandardAndReactiveBiologic = createSelector(
  [selectStandarBiologic, selectReactiveBiologic],
  (productStandar: ProductoEstandar, productReactive: ProductoReactivo) => {
    return (
      (!isEmpty(productStandar?.IdCatUso) &&
        !isEmpty(productStandar) &&
        !isEmpty(productStandar?.IdCatTipoPresentacion)) ||
      (!isEmpty(productReactive?.IdCatUso) &&
        !isEmpty(productReactive) &&
        !isEmpty(productReactive?.IdCatTipoPresentacion))
    );
  },
);
export const selectValidationStandardAndReactiveChemist = createSelector(
  [selectStandarBiologic, selectReactiveBiologic, selectDetailsProductState],
  (
    productStandar: ProductoEstandar,
    productReactive: ProductoReactivo,
    productDetails: ProductsDetails,
  ) => {
    if (isEmpty(productStandar) && isEmpty(productReactive)) {
      return false;
    }
    const validationsStandardAndReactive = (obj: ProductoEstandar | ProductoReactivo): boolean => {
      return (
        validateFieldsRequiredString(obj?.IdCatUso) &&
        validateFieldsRequiredString(obj?.IdCatTipoPresentacion) &&
        validateFieldsRequiredString(obj?.CAS, 1) &&
        validateFieldIsNotContainOnlySpacesAndLength(obj?.Sinonimos) &&
        validateFieldIsNotContainOnlySpacesAndLength(obj?.FormulaQuimica) &&
        productDetails.validateCas
      );
    };
    if (!isEmpty(productStandar) && productStandar.Activo) {
      return validationsStandardAndReactive(productStandar);
    } else {
      return validationsStandardAndReactive(productReactive);
    }
  },
);
export const selectePublicationsFormatSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.publicationsFormatSelected,
);
export const selectIsDigitalPublication = createSelector(
  selectValidationConfigurationPublications,
  selectePublicationsFormatSelected,
  (isPublication: boolean, publicationsFormatSelected: DropListOption): boolean => {
    return isPublication && publicationsFormatSelected?.label.toLowerCase() !== 'farmacopea';
  },
);
export const selectValidationPublications = createSelector(
  selectPublications,
  selectIsDigitalPublication,
  selectProductData,
  (
    productPublications: ProductoPublicacion,
    selectIsDigitalPublication: boolean,
    product: Producto,
  ) => {
    const validateTariffFraction = selectIsDigitalPublication
      ? validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionArancelaria, 10) &&
        validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionImportacion, 10)
      : validateFieldsRequiredString(product.FraccionArancelaria, 10) &&
        validateFieldsRequiredString(product.FraccionImportacion, 10);
    return (
      !isEmpty(productPublications) &&
      validateFieldsRequiredString(productPublications?.IdCatFormatoPublicacion) &&
      validateFieldsRequiredString(productPublications?.Autor) &&
      validateFieldIsNotContainOnlySpacesAndLength(productPublications?.Editorial) &&
      validateFieldIsNotContainOnlySpacesAndLength(productPublications?.Edicion) &&
      validateTariffFraction
    );
  },
);
export const selectValidationTrainings = createSelector(
  selectProductData,
  selectTraining,
  (product, training) => {
    let listPrice = false;
    if (training) {
      if (training.PrecioPorPersona) {
        listPrice = validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor);
      } else {
        listPrice =
          validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
          validateFieldsRequiredNumber(training.NumeroDePersonasPorGrupo, 1);
      }
    }
    return (
      validateFieldsRequiredString(product?.Descripcion) &&
      validateFieldsRequiredString(training?.DescripcionDetallada) &&
      validateFieldIsNotContainOnlySpacesAndLength(product?.Nota) &&
      listPrice &&
      product.IdCatDisponibilidad !== DEFAULT_UUID &&
      product.IdCatDisponibilidad !== null &&
      !isEmpty(product.FechaCaducidadVigenciaCuraduria) &&
      training?.IdCatMedioDifusion !== DEFAULT_UUID &&
      training?.IdCatMedioDifusion !== null &&
      validateFieldsRequiredNumber(training?.DuracionEvento, 0)
    );
  },
);
export const handleChangesValidator = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): boolean => {
    const tab = state.tabSelected;
    switch (tab.id) {
      case '1':
        return (
          !isEqual(JSON.stringify(state.backUp), JSON.stringify(state.productDetails)) ||
          !isEqual(
            JSON.stringify(state?.backUpData?.supplementaryProducts),
            JSON.stringify(state?.supplementaryProducts),
          ) ||
          !isEqual(
            JSON.stringify(state?.backUpData?.supplementaryProductsToDelete),
            JSON.stringify(state?.supplementaryProductsToDelete),
          ) ||
          state.technicalCommercialInvestigationFiles.ArchivoEstructuraMolecular !== null
        );
    }
  },
);

// DOCS selectores de tecnico comercial
export const selectListAvailabilityForDropDown = createSelector(
  selectCatalogs,
  selectValidationConfigurationTraining,
  (state: CatalogsState, isTraining: boolean): Array<DropListOption> => {
    const availabilities = _map(
      state.catAvailability.listAvailability,
      (o: CatDisponibilidad): DropListOption => ({
        value: o.IdCatDisponibilidad,
        label: o.Disponibilidad,
        labelKey: o.Clave,
      }),
    );
    if (isTraining) {
      return filter(availabilities, (o: DropListOption) => o.labelKey !== backOrderString);
    }
    return availabilities;
  },
);
export const selectListProducts = createSelector(
  selectListAvailabilityForDropDown,
  (availability) => {
    const list = _map(
      availability,
      (o: DropListOption): DropListOption =>
        o.labelKey === AVAILABILITY_TYPES.discontinued
          ? ({
              ...o,
              labelColors: ['#c2c3c9'],
            } as DropListOption)
          : o.labelKey === AVAILABILITY_TYPES.notmarketable
          ? ({
              ...o,
              labelColors: ['#e29d2a'],
            } as DropListOption)
          : o.labelKey === AVAILABILITY_TYPES.backorder
          ? ({
              ...o,
              labelColors: ['#a45aeb'],
            } as DropListOption)
          : o.labelKey === AVAILABILITY_TYPES.available
          ? ({
              ...o,
              labelColors: ['#4ba92b'],
            } as DropListOption)
          : ({} as DropListOption),
    );
    list.unshift({
      value: DEFAULT_UUID,
      label: 'Todos los Productos ',
      labelColors: ['#4ba92b', '#a45aeb', '#e29d2a', '#c2c3c9'],
    });
    return list;
  },
);
export const selectAvailabilityIsBackOrder = createSelector(
  [selectListAvailabilityForDropDown, selectedAvailability],
  (list: DropListOption[], availability: DropListOption): boolean =>
    availability?.labelKey === backOrderString,
);

export const selectValidationProduct = createSelector(
  [
    selectProductData,
    selectValidationConfigurationPublications,
    selectValidationConfigurationStandardAndReactiveBiologic,
    selectValidationConfigurationStandardAndReactiveChemist,
    selectValidationConfigurationTraining,
    selectDetailsProductState,
    selectAvailabilityIsBackOrder,
  ],
  (
    product: Producto,
    publicationsSelected: boolean,
    standardAndReactiveBiologic: boolean,
    standardAndReactiveChemist: boolean,
    training: boolean,
    state: ProductsDetails,
    availabilityIsOrder: boolean,
  ) => {
    const validationAvailabilityBackOrder = availabilityIsOrder
      ? validateFieldsRequiredString(product.FechaDisponibilidadBackOrder)
      : true;
    const validationsPublication = (): boolean => {
      return (
        validateFieldsRequiredString(product.IdMarcaFamilia) &&
        validateFieldsRequiredString(product.Catalogo, 2) &&
        validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
        validateFieldsRequiredString(product.Descripcion) &&
        validateFieldsRequiredString(product.Presentacion, 1) &&
        validateFieldsRequiredString(product.IdCatUnidad) &&
        validateFieldsRequiredString(product.IdCatDisponibilidad) &&
        validateFieldsRequiredString(product.FechaCaducidadVigenciaCuraduria) &&
        validationAvailabilityBackOrder &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Nota)
      );
    };
    const validationsStandardAndReactive = (): boolean => {
      return (
        validateFieldsRequiredString(product.IdMarcaFamilia) &&
        validateFieldsRequiredString(product.Catalogo, 2) &&
        validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
        validateFieldsRequiredString(product.Descripcion) &&
        validateFieldsRequiredString(product.Presentacion, 1) &&
        validateFieldsRequiredString(product.IdCatUnidad) &&
        validateFieldsRequiredString(product.IdCatDisponibilidad) &&
        validateFieldsRequiredString(product.FechaCaducidadVigenciaCuraduria) &&
        validationAvailabilityBackOrder &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Peligrosidad) &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Nota) &&
        (state.billingRestrictionSelected?.label === 'Límite de Piezas'
          ? product.NumeroDePiezas > 0
          : true)
      );
    };
    const validationsTraining = (): boolean => {
      return (
        validateFieldsRequiredString(state.productDetails.Descripcion) &&
        validateFieldsRequiredString(
          state.productDetails?.ProductoCapacitacion?.DescripcionDetallada,
        ) &&
        validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
        validateFieldsRequiredString(product.FechaCaducidadVigenciaCuraduria) &&
        validationAvailabilityBackOrder &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Nota) &&
        product.IdCatDisponibilidad !== DEFAULT_UUID
      );
    };
    const validationsDefault = (): boolean => {
      return (
        validateFieldsRequiredString(product.IdMarcaFamilia) &&
        validateFieldsRequiredString(product.Catalogo, 2) &&
        validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
        validateFieldsRequiredString(product.FechaCaducidadVigenciaCuraduria) &&
        validateFieldsRequiredString(product.Descripcion) &&
        validateFieldsRequiredString(product.Presentacion, 1) &&
        validateFieldsRequiredString(product.IdCatUnidad) &&
        validateFieldsRequiredString(product.IdCatDisponibilidad) &&
        validationAvailabilityBackOrder &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Nota) &&
        (state.billingRestrictionSelected?.label === 'Límite de Piezas'
          ? product.NumeroDePiezas > 0
          : true)
      );
    };

    return publicationsSelected
      ? validationsPublication()
      : standardAndReactiveBiologic || standardAndReactiveChemist
      ? validationsStandardAndReactive()
      : training
      ? validationsTraining()
      : validationsDefault();
  },
);
export const handleChangesValidationTechnicalCommercialInvestigation = createSelector(
  handleValidationsConfigurationTypes,
  selectValidationProduct,
  selectValidationStandardAndReactiveBiologic,
  selectValidationStandardAndReactiveChemist,
  selectValidationPublications,
  selectValidationTrainings,
  (
    validationsTypes,
    validationProduct: boolean,
    validationStandardAndReactiveBiologic: boolean,
    validationStandardAndReactiveChemist: boolean,
    validationPublications: boolean,
    validationTraining: boolean,
  ): boolean => {
    return validationsTypes.standardAndReactiveBiologic
      ? validationProduct && validationStandardAndReactiveBiologic
      : validationsTypes.standardAndReactiveChemist
      ? validationProduct && validationStandardAndReactiveChemist
      : validationsTypes.labware
      ? validationProduct
      : validationsTypes.publications
      ? validationProduct && validationPublications
      : validationsTypes.medicalDevices
      ? validationProduct
      : validationsTypes.training
      ? validationTraining
      : false;
  },
);
export const saveButtonValidator = createSelector(
  selectDetailsProductState,
  handleChangesValidationTechnicalCommercialInvestigation,
  handleChangesValidator,
  (productDetails, minimRequired, hasChanges) => {
    switch (productDetails.tabSelected.id) {
      case '1':
        if (productDetails.productDetails.IdProducto === DEFAULT_UUID) {
          return minimRequired;
        } else {
          return minimRequired && hasChanges;
        }
      default:
        return hasChanges;
    }
  },
);
export const selectProduct = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state?.productDetails,
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
      validateFieldIsNotContainOnlySpacesAndLength(state.supplement.Editorial) &&
      validateFieldIsNotContainOnlySpacesAndLength(state.supplement.Edicion) &&
      validateFieldsRequiredString(state.supplement.Descripcion) &&
      validateFieldsRequiredString(product.Descripcion) &&
      state.supplement.Descripcion !== product.Descripcion
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
      (o) => o !== null && o.Activo,
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
      (o) => o !== null && !o.Activo,
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
  (state: ProductsDetails) =>
    _map(
      state.productsTypeFamily,
      (o: VMarcaFamilia) =>
        ({
          value: o.IdMarcaFamilia,
          label: `${o.Tipo ? `${o.Tipo}` : ''}${o.Subtipo !== 'N/A' ? ` · ${o.Subtipo}` : ''}${
            o.Control !== 'N/A' ? ` · ${o.Control}` : ''
          }`,
          labelKey: `${o?.ClaveTipo ? `${o?.ClaveTipo}` : ''}${
            o?.ClaveSubtipo !== 'n/a' ? `${o?.ClaveSubtipo}` : ''
          }${o?.ClaveControl !== 'n/a' ? `${o?.ClaveControl}` : ''}`,
        } as DropListOption),
    ),
);
export const selectProductTypeFamily = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productsTypeFamily,
);
export const selectProductTypeFamilySelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productTypeFamilySelected,
);
export const selectedUnit = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.unitSelected,
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
export const selectSupplement = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.supplement,
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
  (state: ProductsDetails) => state.technicalCommercialInvestigationFiles,
);
export const selectStructureMolecular = createSelector(
  selectFilesTechnicalCommercialInvestigation,
  (state: IProductTechnicalCommercialInvestigation) => state.ArchivoEstructuraMolecular,
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
    const radios = _map(
      state.listCatMedioDeDifusion,
      (o: CatMedioDifusion): DropListOption => {
        return {
          label: o.MedioDifusion,
          value: o.IdCatMedioDifusion,
        };
      },
    );
    return radios;
  },
);

export const selectBroadCastMediaSelected = createSelector(
  [selectBroadCastMediaRadios, selectProductTrainingData],
  (broadCastMedia: DropListOption[], training: ProductoCapacitacion): string =>
    find(broadCastMedia, (o: DropListOption) => o.value === training?.IdCatMedioDifusion)?.label ??
    'N/D',
);
export const selectNameValidationConfiguration = createSelector(
  selectedTypeProductsFamily,
  (state): string => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNotional ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistOrigin
      ? 'ProductoEstandar'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNormal ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNational ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistcMundial ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistOrigin ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNormal ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNational ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicMundial ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicOrigin
      ? 'ProductoReactivo'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.publications
      ? 'ProductoPublicacion'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.labware
      ? 'ProductoLabware'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.medicalDevices
      ? 'ProductoDispositivoMedico'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.training
      ? 'ProductoCapacitacion'
      : null;
    /*state?.labelKey === ENUM_PRODUCT_FAMILY.Medications*/
  },
);
export const selectPurity = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration, state) => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.Pureza
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.Pureza
      : validationConfiguration === 'ProductoLabware'
      ? state?.ProductoLabware?.Pureza
      : null;
  },
);
export const selectSynonyms = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration, state) => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.Sinonimos
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.Sinonimos
      : null;
  },
);
export const selectMolecularForm = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration, state) => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.FormulaQuimica
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.FormulaQuimica
      : null;
  },
);
export const broadCastMediaRadioLabel = createSelector(
  selectBroadCastMediaRadios,
  selectTraining,
  (radios, training) => {
    const selected = find(radios, (o) => o.value === training?.IdCatMedioDifusion);
    return selected?.label;
  },
);
export const selectDetailsTabsGroupQueryInfo = createSelector(
  selectProviderSelected,
  (provider: IProvider): ResumeGroupQueryInfo => ({
    Filters: [
      {
        NombreFiltro: 'IdProveedor',
        ValorFiltro: provider.IdProveedor,
      },
    ],
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Nueva'},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Por reatender'},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'En Espera De Respuesta'},
    ],
  }),
);
export const selectProviderProductsListQueryInfo = createSelector(
  [selectTabOptionSelected, selectProviderSelected],
  (tab: ITabOption, provider: IProvider): ResumeGroupQueryInfo => {
    const filters: ResumeGroupQueryInfo = {
      Filters: [
        {
          NombreFiltro: 'IdProveedor',
          ValorFiltro: provider.IdProveedor,
        },
      ],
      SortField: 'FechaRegistro',
      SortDirection: 'asc',
    };
    if (tab.id === '2') {
      filters.Filters.push({
        NombreFiltro: 'PorInvestigar',
        ValorFiltro: '',
      });
    }
    if (tab.id === '3') {
      filters.Filters.push({
        NombreFiltro: 'EstadoInvestigacion',
        ValorFiltro: AttendInvestigationProductsStatus.Enesperaderespuesta,
      });
    }
    return filters;
  },
);
export const selectDetailsProductIsOpen = createSelector(
  selectProductInvestigationList,
  (list: IProductInvestigation[]): boolean =>
    !!find(list, (o: IProductInvestigation) => o.detailsOpen),
);
export const selectProductInvestigationListFiltered = createSelector(
  selectFilterSelected,
  selectTabOptionSelected,
  selectProductInvestigationList,
  (
    filterData: DropListOption,
    tab: ITabOption,
    list: Array<IProductInvestigation>,
  ): Array<IProductInvestigation> => {
    if (tab.id === '2') {
      list = filter(
        list,
        (l: IProductInvestigation) =>
          l.ClaveEstadoInvestigacion !== AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta,
      );
    } else if (tab.id === '3') {
      list = filter(
        list,
        (l: IProductInvestigation) =>
          l.ClaveEstadoInvestigacion === AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta,
      );
    }
    return filter(list, (o: IProductInvestigation) => {
      if (filterData.value === '2') {
        return o.EstadoInvestigacion === AttendInvestigationProductsStatus.Nueva;
      }
      if (filterData.value === '3') {
        return o.EstadoInvestigacion === AttendInvestigationProductsStatus.Porreatender;
      }
      return true;
    });
  },
);
export const showCatProducts = createSelector(
  selectProductInvestigationListFiltered,
  (state): boolean => !!find(state, (o: IProductInvestigation) => o.selected),
);
// Selectores para detalle del producto a investigar
export const selectedProductInvestigation = createSelector(
  selectProductInvestigationList,
  (list: Array<IProductInvestigation>): IProductInvestigation =>
    find(list, (o: IProductInvestigation) => o.selected),
);
export const selectGmItemAttention = createSelector(
  selectedProductInvestigation,
  (item: IProductInvestigation): ICotPartidaInvetigacionAtencionComentariosObj =>
    item?.gmItemAttention,
);
export const selectGMProviderResponse = createSelector(
  selectedProductInvestigation,
  (product: IProductInvestigation) => product?.gmProviderResponse,
);
export const selectCotPartidaInvestigacionProducto = createSelector(
  selectGMProviderResponse,
  (gmProviderResponse): CotPartidaInvestigacionProducto =>
    gmProviderResponse?.cotPartidaInvestigacionProducto,
);
export const selectItemAttentionProduct = createSelector(
  selectGmItemAttention,
  (item: ICotPartidaInvetigacionAtencionComentariosObj): IProduct => item?.Producto,
);
export const selectCotPartidaCotizacionInvestigacion = createSelector(
  selectGmItemAttention,
  (gmItem: ICotPartidaInvetigacionAtencionComentariosObj) =>
    gmItem?.cotPartidaCotizacionInvestigacionAtencion,
);
export const selectCotPartidaCotizacionInvestigacionComentario = createSelector(
  selectGmItemAttention,
  (gmItem: ICotPartidaInvetigacionAtencionComentariosObj): IMessageHistory[] => {
    const comments = filter(
      gmItem?.cotPartidaCotizacionInvestigacionComentario,
      (o: CotPartidaCotizacionInvestigacionComentario) =>
        o.IdCotPartidaCotizacionInvestigacionComentario !== DEFAULT_UUID,
    );
    return _map(
      comments,
      (comment: CotPartidaCotizacionInvestigacionComentario): IMessageHistory => {
        return {
          contentMessage: comment.Comentario,
          date: comment.FechaRegistro,
          headerText: comment.ComentarioEVI ? 'Evi' : 'Gestor de contenido',
          idMessage: comment.IdCotPartidaCotizacionInvestigacionComentario,
          messagePositionLeft: comment.ComentarioEVI,
          messagePositionRight: comment.ComentarioInvestigador,
        };
      },
    );
  },
);
export const selectedProductInvestigationNewComment = createSelector(
  selectGmItemAttention,
  (gmItem: ICotPartidaInvetigacionAtencionComentariosObj): string => {
    const comments = gmItem?.cotPartidaCotizacionInvestigacionComentario;
    const commentObj: CotPartidaCotizacionInvestigacionComentario = find(
      comments,
      (o: CotPartidaCotizacionInvestigacionComentario) =>
        o.IdCotPartidaCotizacionInvestigacionComentario === DEFAULT_UUID,
    );
    return commentObj?.Comentario;
  },
);
export const sendResponseValidator = createSelector(
  selectedProductInvestigation,
  selectGmItemAttention,
  selectedProductInvestigationNewComment,
  (
    selectedProduct: IProductInvestigation,
    gmItemAttention: ICotPartidaInvetigacionAtencionComentariosObj,
    newComment: string,
  ): boolean => {
    if (
      selectedProduct?.EstadoInvestigacion !== AttendInvestigationProductsStatus.Enesperaderespuesta
    ) {
      const radioIsChecked =
        gmItemAttention?.cotPartidaCotizacionInvestigacionAtencion?.Sugerencias ||
        gmItemAttention?.cotPartidaCotizacionInvestigacionAtencion?.ProductoDisponible;
      return (
        gmItemAttention?.cotPartidaCotizacionInvestigacionAtencion?.IdProducto !== null &&
        radioIsChecked &&
        !isEmpty(newComment)
      );
    } else {
      return false;
    }
  },
);
export const sendProviderResponseValidator = createSelector(
  selectGMProviderResponse,
  (gmProviderResponse: IProviderResponse): boolean => {
    const radio =
      gmProviderResponse?.cotPartidaInvestigacionProducto?.Encontrado ||
      gmProviderResponse?.cotPartidaInvestigacionProducto?.NoEncontrado;
    return (
      gmProviderResponse?.file !== null &&
      radio &&
      validateFieldsRequiredString(gmProviderResponse?.cotPartidaInvestigacionProducto?.Notas)
    );
  },
);
export const selectProductsChecked = createSelector(
  selectProductInvestigationList,
  (list: IProductInvestigation[]) => filter(list, (o: IProductInvestigation) => o.isChecked),
);
export const isAllAwaitingResponse = createSelector(
  selectProductInvestigationListFiltered,
  (list: IProductInvestigation[]): boolean => {
    let AllAwaitingResponse = true;
    forEach(list, (p: IProductInvestigation) => {
      if (
        p.ClaveEstadoInvestigacion !== AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta
      ) {
        AllAwaitingResponse = false;
      }
    });
    return AllAwaitingResponse;
  },
);

export const selectIsPhysicalProduct = createSelector(
  selectValidationConfigurationTraining,
  selectIsDigitalPublication,
  (isTraining: boolean, isDigitalPublication: boolean): boolean => {
    return !isTraining && !isDigitalPublication;
  },
);
export const selectedDiffusionModel = createSelector(
  [selectProductDetails, selectBroadCastMediaRadios],
  (state: IVProductoDetalle, options: DropListOption[]) => {
    const option = state.ProductoCapacitacion?.IdCatMedioDifusion;
    return options.find((it) => it?.value === option) as DropListOption;
  },
);
export const selectCAS = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration: string, state: IVProductoDetalle): string => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.CAS
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.CAS
      : null;
  },
);
export const selectedAvailabilityBackOrder = createSelector(
  selectDetailsProductState,
  (productDetails: ProductsDetails): Date => productDetails.fechaDisponibilidadBackOrderSelected,
);

export const selectProviderCurrency = createSelector(
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
export const enableOnlineInvestigattionButton = createSelector(
  selectedProductInvestigation,
  (product: IProductInvestigation): boolean =>
    product &&
    product?.ClaveEstadoInvestigacion !== AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta,
);
export const selectProviderIsMexican = createSelector(
  selectProductInvestigationList,
  (list: IProductInvestigation[]): boolean => {
    return list?.[0]?.EsMexicano;
  },
);
export const selectEvidenceFile = createSelector(
  selectGMProviderResponse,
  (providerResponse: IProviderResponse): File => providerResponse?.file,
);
