/* Core Imports */
import {createSelector} from '@ngrx/store';
import {
  deburr,
  filter,
  find,
  first,
  flow,
  forEach,
  isEmpty,
  lowerCase,
  map as _map,
  omit,
  orderBy,
  reduce,
  sumBy,
  uniqBy,
} from 'lodash-es';
import {
  AVAILABILITY_TYPES,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  INVESTIGATION_STATUS,
  IVA_FREIGHT_ITEM,
  PUBLICATION,
} from '@appUtil/common.protocols';
/* Models Imports */
import {
  ENUM_STATUS_INVESTIGATION_ITEM,
  IContactQuotation,
  ICotPartidaInvetigacionAtencionComentariosObj,
  ICotPartidasInvetigacionCotizacion,
  IGeneralDataQuotation,
  IGMCotCotizacionDetalle,
  IGMCotPartidasDetalle,
  IInvestigationProductData,
  IQuotation,
  IVPartidaCotizacion,
  QuotationClientInfo,
  QuotationDetailsState,
  QuotationItemCombined,
  QuotationSearchFilters,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ICard} from '@appModels/card/card';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';

import {
  DropListOption,
  DropListOptionCustom,
  IDropListMulti,
} from '@appModels/drop-list/drop-list-option';
/* Selectors Imports */
import {selectQuotationDetailsComponent} from '@appSelectors/quotation/quotation.selectors';
import {
  IProduct,
  IRelate,
  IVProductoDetalle,
  ProductSearchResult,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';

/* Tools Imports */
import {
  Archivo,
  CatEstadoCotizacion,
  CatTipoCotizacion,
  ConfiguracionProductosFletesService,
  ContactoDetalleObj,
  GMProveedorPorProducto,
  ParametroBuscadorSugerencias,
  QueryInfo,
  VDatosFacturacionCliente,
  VDireccion,
} from 'api-catalogos';
import {FiltersOnlyActive, queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import * as selectorCatalogs from '@appSelectors/catalogs/catalogs.selectors';
import {
  dropListMoneda,
  getListBrands,
  getListCatTypeProduct,
  selectCatalogs,
  selectCatEstadoCotizacion,
  selectCatTipoCotizacion,
} from '@appSelectors/catalogs/catalogs.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  buildColorStateQuotation,
  buildTextStateQuotation,
  CatQuotationState,
  patchTypeOfSearch,
  ProductsSubtypes,
  ProductsTypes,
  PurchaseRestrictions,
  quotationItemTypes,
  QuotationItemTypes,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotCotizacionFleteExpress,
  CotCotizacionFleteUltimaMilla,
  CotPartidaCotizacionInvestigacionComentario,
  ReatenderPartidaInvestigacion,
  VCliente,
  VCotCotizacion,
} from 'api-logistica';
import {
  ICheckOutQuotation,
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {IMessageHistory} from '@appModels/shared-components/message-history';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {selectNewClientName} from '@appSelectors/settings/settings.selectors';
import {selectQuotationState} from '@appSelectors/pendings/pendings.selectors';
import {QuotationState} from '@appModels/store/quotation/quotation.models';
import {getArrayForDropDownList} from '@appUtil/util';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
} from '@appModels/table/internal-sales-item';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {Empresa} from '../../../../../../projects/api-finanzas/src/lib/models';
import VFleteVFletePorCotizacionParams = ConfiguracionProductosFletesService.VFleteVFletePorCotizacionParams;
import {currentLocaleDateUTCFormat} from '@appUtil/dates';

const productsTypes = ProductsTypes;
const availabilityTypes = AVAILABILITY_TYPES;
const productsSubtypes = ProductsSubtypes;

export const selectQuotationDetails = createSelector(
  selectQuotationState,
  (state: QuotationState): QuotationDetailsState => state?.quotationDetails,
);
export const selectedClient = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ClientsListItemForQuotation => state.selectedClient,
);
export const selectedClientId = createSelector(
  selectedClient,
  (client: ClientsListItemForQuotation): string => client?.IdCliente,
);
export const selectQuotationsListQueryInfo = createSelector(
  selectedClientId,
  (clientId: string): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.push(
      {NombreFiltro: 'IdCliente', ValorFiltro: clientId},
      {NombreFiltro: 'DashboardCotizador', ValorFiltro: true},
    );
    queryInfo.SortDirection = 'desc';
    queryInfo.SortField = 'FechaRegistro';
    return queryInfo;
  },
);
export const selectQuotationsList = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<IQuotation> => state.quotationsList,
);
export const totalNewQuotations = createSelector(
  selectQuotationsList,
  (state: IQuotation[]): number => filter(state, (q) => q.EstadoCotizacion === 'Nueva').length,
);
export const totalSavedQuotations = createSelector(
  selectQuotationsList,
  (state: IQuotation[]): number => filter(state, (q) => q.EstadoCotizacion === 'Guardada').length,
);
export const totalSentQuotations = createSelector(
  selectQuotationsList,
  (state: IQuotation[]): number => filter(state, (q) => q.EstadoCotizacion === 'Enviada').length,
);
export const selectQuotationsListTotalResults = createSelector(
  selectQuotationsList,
  (quotationsList: Array<IQuotation>): number => quotationsList?.length,
);
export const selectQuotationsListForCards = createSelector(
  selectQuotationsList,
  selectCatEstadoCotizacion,
  (quotationsList: Array<IQuotation>, quotationStatus: CatEstadoCotizacion[]): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(quotationsList, (o: IQuotation, index: number) => {
      const {EstadoCotizacion}: CatEstadoCotizacion = find(
        quotationStatus,
        (i: CatEstadoCotizacion) => i?.IdCatEstadoCotizacion === o?.IdCatEstadoCotizacion,
      );
      options.push({
        active: o?.isSelected,
        value: o?.IdCotCotizacion,
        labels: [
          {
            label: `#${index + 1} · ${o?.Folio}`,
            className: CLASS_NAMES.title,
          },
          {
            label: `${o?.TotalProductos + ' Producto' + (o?.TotalProductos !== 1 ? 's' : '')}`,
            className: CLASS_NAMES.countProducts,
          },
          {
            label: buildTextStateQuotation(o, EstadoCotizacion),
            className: CLASS_NAMES.status,
            color: buildColorStateQuotation(o, EstadoCotizacion),
          },
        ],
      });
    });
    return options;
  },
);

// DOCS: Filtro de busqueda la los clientes cuando es un nuevo cliente

export const selectSearchTermClient = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): string => state.searchTermClient,
);
export const selectQueryInfoClientList = createSelector(
  [selectQuotationDetails, selectSearchTermClient],
  (state: QuotationDetailsState, searchTerm: string): QueryInfo => {
    const queryInfo: QueryInfo = {
      Filters: [],
      SortDirection: 'asc',
      SortField: 'Nombre',
    };
    if (searchTerm) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Nombre',
          ValorFiltro: searchTerm,
        },
      ];
    }
    return queryInfo;
  },
);
export const selectClientList = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<IVClient> => state.clientsList?.Results,
);

/* DOCS: Filtros de búsqueda de las partidas*/
export const selectQuotationSearchFilters = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): QuotationSearchFilters => state.quotationItemsSearchFilters,
);
export const selectProductsQueryInfo = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): QueryInfo => state.productsQueryInfo,
);
export const selectTypesOfSearchOptions = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): Array<DropListOption> => state.searchTypesOptions,
);
/* DOCS: Obtiene la opción seleccionada del SearchComponent al buscar un producto */
export const selectSearchTypeSelectedOption = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): DropListOption => state.searchTypeSelectedOption,
);
export const selectCatBrand = createSelector(
  getListBrands,
  (state: Array<DropListOptionCustom>): Array<DropListOption> => {
    const list = _map(state, (item) => ({
      label: item.nombre,
      value: item.id,
    }));
    list.unshift({value: DEFAULT_UUID, label: 'Todas las Marcas'});
    return list;
  },
);
/* DOCS: Obtiene la marca seleccionada del Drop al buscar un producto */
export const selectedBrandFilter = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): DropListOption => state.selectedBrandFilter,
);
export const selectCatLines = createSelector(
  selectorCatalogs.getListCatLinesProducts,
  (state: Array<DropListOptionCustom>): Array<DropListOption> => {
    const list = _map(state, (item) => ({
      label: item.nombre,
      value: item.id,
    }));
    list.unshift({value: DEFAULT_UUID, label: 'Todas las Lineas'});
    return list;
  },
);
/* DOCS: Obtiene la linea seleccionada del Drop al buscar un producto */
export const selectedLineFilter = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): DropListOption => state.selectedLineFilter,
);
export const selectCatProductType = createSelector(
  getListCatTypeProduct,
  (state: Array<DropListOption>): Array<DropListOption> => {
    const list = _map(state, (item) => ({
      label: item.label,
      value: item.value,
    }));
    list.unshift({value: DEFAULT_UUID, label: 'Todos los Tipos'});
    return list;
  },
);
/* DOCS: Obtiene el tipo de producto seleccionado del Drop al buscar un producto */
export const selectedProductTypeFilter = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): DropListOption => state.selectedProductTypeFilter,
);
export const selectRunSearchTerm = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): string => state.runSearchTerm,
);
export const selectSearchTerm = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): string => state.searchTerm,
);
export const selectProductsSearchResults = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<ProductSearchResult> => state.productsSearchResults,
);
export const selectProductsSearchResultsStatus = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): number => state.productsSearchResultsStatus,
);
export const selectItemSelected = createSelector(
  selectProductsSearchResults,
  (listQuotes: Array<ProductSearchResult>): Array<VCotCotizacion> => {
    const selected = find(listQuotes, (o: ProductSearchResult) => o.isInViewQuotesLinked);
    return selected?.CotizacionesVinculadas;
  },
);

export const selectProductSearchResultSelected = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): ProductSearchResult => {
    return find(state, (product: ProductSearchResult): boolean => product.isSelected);
  },
);

export const selectProductSearchResultDetailsSelected = createSelector(
  selectProductSearchResultSelected,
  (state: ProductSearchResult): IVProductoDetalle => {
    return state?.vProductDetails;
  },
);

export const selectIsTypeChemical = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Subtipo === productsSubtypes.chemical,
    );
  },
);

export const selectIsTypeBiological = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Subtipo === productsSubtypes.biological,
    );
  },
);
export const selectIsTypePublications = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Tipo === productsTypes.publications,
    );
  },
);
export const selectIsTypeMedicalDevice = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Tipo === productsTypes.medicalDevice,
    );
  },
);
export const selectIsTypeLabware = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Tipo === productsTypes.labware,
    );
  },
);
export const selectIsTypeTraining = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.Tipo === productsTypes.trainings,
    );
  },
);
export const selectIsBackOrder = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: ProductSearchResult): boolean =>
        product.isSelected && product.DisponibilidadClave === availabilityTypes.backorder,
    );
  },
);
export const selectIsNotMarketable = createSelector(
  selectProductsSearchResults,
  (state: Array<ProductSearchResult>): boolean => {
    return !!find(
      state,
      (product: IProduct): boolean =>
        product.isSelected === true &&
        product.DisponibilidadClave === availabilityTypes.notmarketable,
    );
  },
);

export const selectModalIsOpenResendQuotation = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): boolean => state.modalIsOpenResendQuotation,
);
export const selectLinkedQuote = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): IRelate => state.linkedQuotes,
);
export const selectOptionSelected = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): ITabOption => state.optionSelected,
);
export const selectOptionsOfProductsStatus = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): number => state.productSuggestionResultsStatus,
);

export const selectOptionOfProduct = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): DropListOption => state.optionOfProductSelected,
);
export const selectOptionsOfProducts = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): Array<DropListOption> =>
    _map(
      state.productSuggestionResults,
      (o): DropListOption => {
        return {value: o.Id, label: o.Etiqueta};
      },
    ),
);
export const selectOptions = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): Array<ITabOption> => state.options,
);
export const currentPage = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters) => state.productsQueryInfo.desiredPage,
);
export const selectTotal = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): number => state.total,
);
export const selectBase64PDF = createSelector(
  selectQuotationSearchFilters,
  (state: QuotationSearchFilters): string => state.base64File,
);
export const selectResumeSection = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ICheckOutQuotation => state.resumeSection,
);
export const selectResumeSectionSearchTerm = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): string => state.searchTerm,
);
export const selectModalIsOpenSendQuotation = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): boolean => state.modalIsOpenSendQuotation,
);
export const selectProductSearchResultsQueryInfo = createSelector(
  [
    selectProductsQueryInfo,
    selectedBrandFilter,
    selectedLineFilter,
    selectedProductTypeFilter,
    selectSearchTerm,
    selectSearchTypeSelectedOption,
  ],
  (
    productsQueryInfo: QueryInfo,
    itemBrand: DropListOption,
    itemLines: DropListOption,
    itemProductType: DropListOption,
    searchTerm: string,
    selectedSearchType: DropListOption,
  ) => {
    const queryInfo = {...productsQueryInfo, pageSize: 12};
    // DOCS: Solo activos
    // DOCS: Agregamos el filtro por termino de búsqueda

    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
      {
        NombreFiltro: patchTypeOfSearch(selectedSearchType.label),
        ValorFiltro: searchTerm.trim(),
      },
    ];

    // DOCS: Agregamos filtros de droplist
    if (itemBrand.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdMarca',
          ValorFiltro: itemBrand.value,
        },
      ];
    }
    if (itemLines.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdCatLinea',
          ValorFiltro: itemLines.value,
        },
      ];
    }
    if (itemProductType.value !== DEFAULT_UUID) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdCatTipoProducto',
          ValorFiltro: itemProductType.value,
        },
      ];
    }
    queryInfo.SortField = patchTypeOfSearch(selectedSearchType.label);
    return queryInfo;
  },
);

export const selectSuggestionQueryInfo = createSelector(
  [
    selectSearchTypeSelectedOption,
    selectedBrandFilter,
    selectedLineFilter,
    selectedProductTypeFilter,
    selectRunSearchTerm,
  ],
  (
    selectedSearchType: DropListOption,
    selectedBrand: DropListOption,
    selectedLine: DropListOption,
    selectedProductType: DropListOption,
    searchTerm: string,
  ): ParametroBuscadorSugerencias => {
    const searchSuggestionParameters: ParametroBuscadorSugerencias = {
      POCO: selectedSearchType.label === 'Marca' ? 'vMarca' : 'vProducto',
      NombreLlavePrimaria: selectedSearchType.label === 'Marca' ? 'IdMarca' : 'IdProducto',
      info: {
        Filters: [],
        SortField: selectedSearchType.label === 'Marca' ? 'Nombre' : 'Descripcion',
        SortDirection: 'desc',
      },
      NombreAtributo:
        selectedSearchType.label === 'Marca'
          ? 'Nombre'
          : patchTypeOfSearch(selectedSearchType.label),
      ParametroBusqueda: searchTerm,
    } as ParametroBuscadorSugerencias;

    if (selectedBrand.value !== DEFAULT_UUID) {
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'IdMarca',
          ValorFiltro: selectedBrand.value.toString(),
        },
      ];
    }
    if (selectedLine.value !== DEFAULT_UUID) {
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'IdCatLinea',
          ValorFiltro: selectedLine.value.toString(),
        },
      ];
    }
    if (selectedProductType.value !== DEFAULT_UUID) {
      searchSuggestionParameters.info.Filters = [
        ...searchSuggestionParameters.info.Filters,
        {
          NombreFiltro: 'IdCatTipoProducto',
          ValorFiltro: selectedProductType.value.toString(),
        },
      ];
    }

    return searchSuggestionParameters;
  },
);
export const selectedQuotation = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): IQuotation => {
    return state.selectedQuotation;
  },
);
export const selectedQuotationStatus = createSelector(
  selectQuotationDetails,
  selectCatEstadoCotizacion,
  (
    state: QuotationDetailsState,
    listStatusQuotation: CatEstadoCotizacion[],
  ): CatEstadoCotizacion => {
    return find(
      listStatusQuotation,
      (o: CatEstadoCotizacion) =>
        o.IdCatEstadoCotizacion === state?.selectedQuotation?.IdCatEstadoCotizacion,
    );
  },
);
export const selectedQuotationDetails = createSelector(
  selectedQuotation,
  (state: IQuotation): IGMCotCotizacionDetalle => state?.selectedQuotationDetails,
);
export const selectClientInfo = createSelector(
  selectedQuotation,
  (state: IQuotation): QuotationClientInfo => state?.clientInfo,
);
export const selectClientInfoBillingData = createSelector(
  selectClientInfo,
  (state: QuotationClientInfo): VDatosFacturacionCliente => state?.billingData,
);
export const selectAddressQueryInfo = createSelector(
  selectedQuotation,
  (state: IQuotation): QueryInfo => {
    let queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: state?.IdCliente,
      },
      {
        NombreFiltro: 'ClaveTipoDireccion',
        ValorFiltro: 'entrega',
      },
    );
    queryInfo = {
      ...queryInfo,
      SortField: 'DireccionCompleta',
      SortDirection: 'asc',
    };
    return queryInfo;
  },
);
export const selectAddressDelivery = createSelector(
  selectClientInfo,
  (state: QuotationClientInfo): Array<DropListOption> =>
    _map(
      state?.address,
      (o: VDireccion): DropListOption => ({
        value: o?.IdDireccion,
        label: `${o?.Calle} No.${o?.NumeroExterior ? o?.NumeroExterior : 'S/N'} ${o?.Colonia} C.P ${
          o?.CodigoPostal
        } ${o?.Municipio} ${o?.Estado}`,
      }),
    ),
);
export const selectedAddressDeliveryDropList = createSelector(
  selectAddressDelivery,
  selectedQuotation,
  (deliveryAddress: Array<DropListOption>, selectedQuotation: IQuotation): DropListOption =>
    find(deliveryAddress, (o: DropListOption) => o?.value === selectedQuotation?.IdDireccion),
);
export const selectedAddressDelivery = createSelector(
  selectClientInfo,
  selectedQuotation,
  (clientInfo: QuotationClientInfo, selectedQuotation: IQuotation): VDireccion =>
    find(clientInfo?.address, (o: VDireccion) => o?.IdDireccion === selectedQuotation?.IdDireccion),
);
export const selectClientData = createSelector(
  selectClientInfo,
  (clientInfo: QuotationClientInfo): VCliente => clientInfo?.client,
);
export const selectShippingCostApply = createSelector(
  selectClientData,
  (client: VCliente): boolean => client?.NoAplicaGastoDeEnvio,
);
export const selectClientSendGuide = createSelector(
  selectedAddressDelivery,
  (state: VDireccion): boolean => state?.PagaGuiaEnvio,
);
export const selectIsInternalMessaging = createSelector(
  selectedAddressDelivery,
  (state: VDireccion): boolean => state?.EsMensajeriaInterna,
);
export const selectQuotationFreightSteps = createSelector(
  selectedQuotation,
  (state: IQuotation): BarActivityOption[] => {
    return state?.freightSteps;
  },
);
export const selectedQuotationItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): Array<IGMCotPartidasDetalle> =>
    state?.CotPartidasCotizacion ?? [],
);
export const selectFolioInvestigation = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): string => state?.FolioReferencia,
);
export const selectvEmpresas = createSelector(
  selectCatalogs,
  (state): Array<Empresa> => state.empresas.listEmpresas,
);
export const selectEnterpriseSelected = createSelector(
  selectvEmpresas,
  selectedQuotationDetails,
  (state: Array<Empresa>, quotationData: IGMCotCotizacionDetalle) =>
    find(state, (o: Empresa) => o.IdEmpresa === quotationData?.CotCotizacion?.IdEmpresa),
);
export const selectHasQuotationItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): boolean => state?.CotPartidasCotizacion?.length > 0,
);
export const selectProductsInQuotation = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): Array<string> =>
    _map(
      state?.CotPartidasCotizacion,
      (o: IGMCotPartidasDetalle) => o?.CotProductoOferta?.IdProducto,
    ),
);

export const selectQueryExpressFreight = createSelector(
  [selectProductsInQuotation, selectedQuotation],
  (productsQuotation: Array<string>, selectedQuotation: IQuotation): GMProveedorPorProducto => ({
    IdCatRutaEntrega: selectedQuotation?.clientInfo?.addressSelected?.IdCatRutaEntrega,
    IdCotCotizacion: selectedQuotation?.IdCotCotizacion,
    IdsProductos: productsQuotation,
  }),
);

export const selectQueryFreight = createSelector(
  selectedQuotation,
  (selectedQuotation: IQuotation): VFleteVFletePorCotizacionParams => {
    const body = new FiltersOnlyActive();
    body.Filters.push({
      NombreFiltro: 'IdCotCotizacion',
      ValorFiltro: selectedQuotation?.IdCotCotizacion,
    });
    return {
      info: body,
      idCotCotizacion: selectedQuotation?.IdCotCotizacion,
    };
  },
);
export const selectTotalFreight = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle) => {
    const totalfreightExpress = first(state?.cotCotizacionFleteExpress)?.PrecioTotal || 0;
    const totalQuotationFreight = sumBy(state?.cotCotizacionFletesUltimaMilla, 'PrecioTotal') || 0;
    const subtotalfreightExpress = first(state?.cotCotizacionFleteExpress)?.Precio || 0;
    const subtotalQuotationFreight =
      sumBy(state?.cotCotizacionFletesUltimaMilla, 'PrecioVentaConvertido') || 0;
    const IVAfreightExpress = first(state?.cotCotizacionFleteExpress)?.PrecioIVA || 0;
    const totalIVAQuotationFreight = sumBy(state?.cotCotizacionFletesUltimaMilla, 'PrecioIVA') || 0;
    return {
      subtotal: subtotalQuotationFreight + subtotalfreightExpress,
      iva: totalIVAQuotationFreight + IVAfreightExpress,
      total: totalQuotationFreight + totalfreightExpress,
    };
  },
);
export const selectOptionsTypeDelivery = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<DropListOption> =>
    state.quotationItemsSearchFilters.typeDelivery,
);

export const selectedOptionTypeDelivery = createSelector(
  selectedQuotationDetails,
  selectOptionsTypeDelivery,
  (state: IGMCotCotizacionDetalle, typesDelivery: Array<DropListOption>): DropListOption =>
    state?.CotCotizacion?.EntregaUnica ? typesDelivery[1] : typesDelivery[0],
);

export const hasDifferentFEE = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): boolean =>
    uniqBy(
      filter(
        state.CotPartidasCotizacion,
        (o: IGMCotPartidasDetalle) =>
          o.VPartidaCotizacion?.ClaveTipoPartidaCotizacion !==
          quotationItemTypes[QuotationItemTypes.Saving],
      ),
      'CotPartidaCotizacion.TiempoEstimadoEntregaOriginal',
    )?.length > 1,
);
// DOCS: Indica si el flete que tiene la cotización esta desglosado (es una partida)
export const selectIsProratedFreight = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): boolean => state?.CotCotizacion?.FleteDesglosado,
);
// DOCS: Indica si la cotización tiene al menos un flete de cualquier tipo
export const selectHasFreightSelected = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): boolean =>
    state?.cotCotizacionFletesUltimaMilla?.length > 0 ||
    state?.cotCotizacionFleteExpress?.length > 0,
);

export const freightExpressSelectedCatalog = createSelector(
  selectedQuotation,
  (state: IQuotation): IFreightExpress =>
    find(state.freights.listFreightsExpress.list, (o: IFreightExpress) => o.isSelected),
);
export const freightSelectedCatalog = createSelector(
  selectedQuotation,
  (state: IQuotation): IFlete =>
    find(state.freights.lastMileFreights.list, (o: IFlete) => o.isSelected),
);

export const SelectSaveFreightValidator = createSelector(
  [
    freightExpressSelectedCatalog,
    freightSelectedCatalog,
    selectIsInternalMessaging,
    selectClientSendGuide,
    selectShippingCostApply,
  ],
  (
    freightExpressSelectedCatalog: IFreightExpress,
    freightSelectedCatalog: IFlete,
    IsInternalMessaging: boolean,
    clientSendGuide: boolean,
    shippingCostApply: boolean,
  ): boolean =>
    !IsInternalMessaging && !clientSendGuide && !shippingCostApply
      ? !isEmpty(freightSelectedCatalog)
      : true,
);

export const selectedInvestigationItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): Array<ICotPartidasInvetigacionCotizacion> =>
    state?.CotPartidasInvetigacionCotizacion ?? [],
);
export const selectedFreightExpressItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): Array<CotCotizacionFleteExpress> =>
    state?.cotCotizacionFleteExpress ?? [],
);
export const selectedFreightItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): Array<CotCotizacionFleteUltimaMilla> =>
    state?.cotCotizacionFletesUltimaMilla ?? [],
);
export const selectedFreightItemsTotalInQuotation = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): number => {
    const subtotalFreight = sumBy(
      state?.cotCotizacionFletesUltimaMilla,
      (o: CotCotizacionFleteUltimaMilla) => o?.PrecioVentaConvertido,
    );
    return subtotalFreight;
  },
);
export const selectedFreightExpressItemsTotalInQuotation = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): number => {
    const subtotalFreight = sumBy(
      state?.cotCotizacionFleteExpress,
      (o: CotCotizacionFleteExpress) => o?.Precio,
    );
    return subtotalFreight;
  },
);
export const selectedTotalItems = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle) => {
    const totalSavedItems: number = state?.CotPartidasCotizacion?.length ?? 0;
    const totalInvestigationItems: number = state?.CotPartidasInvetigacionCotizacion?.length ?? 0;
    return totalSavedItems + totalInvestigationItems;
  },
);
/*export const selectUpdateSelectedQuotationQueryInfo = createSelector(
  [selectedClientId, selectedQuotation],
  (clientId: string, selectedQuotation: IQuotation): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.push(
      {NombreFiltro: 'IdCliente', ValorFiltro: clientId},
      {
        NombreFiltro: 'IdCotCotizacion',
        ValorFiltro: selectedQuotation?.IdCotCotizacion,
      },
    );
    return queryInfo;
  },
);*/

export const selectFreightSelected = createSelector(
  selectedQuotation,
  (state: IQuotation): IFlete => state.freightSelected,
);
export const selectFreightExpressQuotationSelected = createSelector(
  selectedQuotation,
  (state: IQuotation): IFreightExpress => state.freightExpressSelected,
);

export const selectQuotationItemsCombinedFiltered = createSelector(
  [
    selectedQuotationDetails,
    selectResumeSectionSearchTerm,
    selectedFreightItems,
    selectedFreightExpressItems,
    selectTotalFreight,
    selectIsProratedFreight,
    selectFreightExpressQuotationSelected,
    selectedQuotation,
    selectedQuotationStatus,
  ],
  (
    quotationDetails: IGMCotCotizacionDetalle,
    searchTerm: string,
    freightQuotationItems: Array<CotCotizacionFleteUltimaMilla>,
    selectedFreightExpressItems: Array<CotCotizacionFleteExpress>,
    proratedFreightTotal: any,
    isProratedFreight: boolean,
    freightExpressSelectedInList: IFreightExpress,
    selectedQuotation: IQuotation,
    statusQuotation: CatEstadoCotizacion,
  ) => {
    // DOCS Se obtiene el flete express seleccionado en caso de existir
    const freightExpressSelected: CotCotizacionFleteExpress =
      first(selectedFreightExpressItems) ?? null;

    // DOCS Se filtran las partidas de las que estan agregadas tienen el idProveedor principal del flete express
    //  no se contemplan las partidas de tipo capacitacion y publicaciones en formato online y usb, así como  partidas
    //  de tipo ahorro guardadas o sin guardar.
    const filteredItems = filter(
      quotationDetails?.CotPartidasCotizacion,
      (o: QuotationItemCombined) => {
        return (
          (o?.product
            ? o?.product?.Tipo !== ENUM_PRODUCT_FAMILY.training
            : o?.VPartidaCotizacion?.Tipo !== ENUM_PRODUCT_FAMILY.training) &&
          (o?.product?.Tipo === ENUM_PRODUCT_FAMILY.publications ||
          o?.VPartidaCotizacion?.Tipo === ENUM_PRODUCT_FAMILY.publications
            ? o?.product
              ? o?.product?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.online && o?.product
              : o?.VPartidaCotizacion?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.online &&
                o?.VPartidaCotizacion?.FormatoPublicacion
            : true) &&
          (o?.product?.Tipo === ENUM_PRODUCT_FAMILY.publications ||
          o?.VPartidaCotizacion?.Tipo === ENUM_PRODUCT_FAMILY.publications
            ? o?.product
              ? o?.product?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.usb && o?.product
              : o?.VPartidaCotizacion?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.usb &&
                o?.VPartidaCotizacion?.FormatoPublicacion
            : true) &&
          o?.VPartidaCotizacion?.ClaveTipoPartidaCotizacion !==
            quotationItemTypes[QuotationItemTypes.Saving] &&
          o.VPartidaCotizacion !== null
        );
      },
    );

    // DOCS Calcula cuantas partidas de las que estan agregadas tienen el idProveedor principal del flete express, aplicando
    //  el filtrado anterior
    const totalQuotationToProratedFreightExpress =
      freightExpressSelected?.PrecioTotal /
        filter(
          filteredItems,
          (o: QuotationItemCombined) =>
            o?.CotProductoOferta?.IdProveedor === freightExpressSelectedInList?.IdProveedor,
        )?.length || 0;

    // DOCS Hace la suma de los fletes ultima milla y los divide entre todas las partidas de tipo original
    const totalQuotationToProratedFreight =
      sumBy(freightQuotationItems, 'PrecioTotal') / filteredItems?.length || 0;
    const quotationItems = flow([
      () => quotationDetails?.CotPartidasCotizacion,
      (combinedItems: Array<QuotationItemCombined>) =>
        // DOCS Filtro para el buscador que se encuentra en la parte superior
        filter(
          combinedItems,
          (o: QuotationItemCombined) =>
            /*DOCS: Busca por la descripción ya sea en la VPartidaCotizacion o en el vProducto*/
            deburr(o?.VPartidaCotizacion?.Descripcion?.toLowerCase()).indexOf(
              deburr(lowerCase(searchTerm.toLowerCase())),
            ) !== -1 ||
            deburr(o.product?.Descripcion?.toLowerCase()).indexOf(
              deburr(lowerCase(searchTerm.toLowerCase())),
            ) !== -1,
        ),
      (filteredItems: Array<QuotationItemCombined>) =>
        orderBy(filteredItems, ['Descripcion', 'Orden', 'NumeroDePiezas']),
      (orderedItems: Array<QuotationItemCombined>) => {
        let countIndex = 0;
        return _map(
          orderedItems,
          (product: QuotationItemCombined): QuotationItemCombined => {
            let index = -1;
            /* DOCS: Valida si la partida es de tipo Original o si no existe, es decir aún no esta guardada en la cotización*/
            if (
              product?.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                quotationItemTypes[QuotationItemTypes.Original] ||
              (!product?.VPartidaCotizacion && product?.VPartidaCotizacion !== null)
            ) {
              countIndex += 1;
              index = countIndex;
            }
            const totalFreightPerItem =
              !isProratedFreight &&
              (product?.product
                ? product?.product?.Tipo !== ENUM_PRODUCT_FAMILY.training
                : product?.VPartidaCotizacion?.Tipo !== ENUM_PRODUCT_FAMILY.training) &&
              (product?.product?.Tipo === ENUM_PRODUCT_FAMILY.publications ||
              product?.VPartidaCotizacion?.Tipo === ENUM_PRODUCT_FAMILY.publications
                ? product?.product
                  ? product?.product?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.online &&
                    product?.product
                  : product?.VPartidaCotizacion?.FormatoPublicacion?.toLowerCase() !==
                      PUBLICATION.online && product?.VPartidaCotizacion?.FormatoPublicacion
                : true) &&
              (product?.product?.Tipo === ENUM_PRODUCT_FAMILY.publications ||
              product?.VPartidaCotizacion?.Tipo === ENUM_PRODUCT_FAMILY.publications
                ? product?.product
                  ? product?.product?.FormatoPublicacion?.toLowerCase() !== PUBLICATION.usb &&
                    product?.product
                  : product?.VPartidaCotizacion?.FormatoPublicacion?.toLowerCase() !==
                      PUBLICATION.usb && product?.VPartidaCotizacion?.FormatoPublicacion
                : true) &&
              product?.VPartidaCotizacion?.ClaveTipoPartidaCotizacion !==
                quotationItemTypes[QuotationItemTypes.Saving] &&
              product.VPartidaCotizacion !== null
                ? product?.CotProductoOferta?.IdProveedor === freightExpressSelected?.IdProveedor
                  ? totalQuotationToProratedFreightExpress + totalQuotationToProratedFreight
                  : totalQuotationToProratedFreight
                : 0;
            const subTotalItem =
              statusQuotation.EstadoCotizacion !== CatQuotationState.Enviada
                ? product?.CotProductoOferta?.PrecioCotizadoSubtotal + totalFreightPerItem
                : product?.CotProductoOferta?.PrecioCotizadoSubtotal;
            const ivaItem = product?.CotProductoOferta?.GravaIVA
              ? subTotalItem * IVA_FREIGHT_ITEM
              : 0;
            return {
              ...product,
              Index: index,
              proratedFreightTotal: totalFreightPerItem,
              CotProductoOferta: {
                ...product?.CotProductoOferta,
                freightTotal: totalFreightPerItem,
                subtotalPrice: subTotalItem,
                ivaTotal: ivaItem,
                totalPrice: subTotalItem + ivaItem,
              },
            };
          },
        );
      },
    ])();
    // DOCS Partida de flete
    if (isProratedFreight && (freightExpressSelected || freightQuotationItems.length)) {
      const freightItem: QuotationItemCombined = {
        freightItem: {
          index:
            quotationItems
              .slice()
              .reverse()
              .find((o) => o.Index !== -1)?.Index + 1 || 0,
          subtotal: proratedFreightTotal.subtotal,
          iva: proratedFreightTotal.iva,
          total: proratedFreightTotal.total,
          descriptionFreight: freightExpressSelected ? FREIGHT_EXPRESS : FREIGHTS_LAST_MILE,
        } as IFreightItem,
      };
      quotationItems.push(freightItem);
    }
    return quotationItems;
  },
);

export const selectStateQuotation = createSelector(
  selectedQuotationStatus,
  (state: CatEstadoCotizacion): string => state?.EstadoCotizacion,
);
export const selectInvestigationQuotation = createSelector(
  selectedQuotation,
  (state: IQuotation): boolean => state?.CotizacionDeInvestigacion,
);
export const selectISendWithnvestigationQuotation = createSelector(
  selectedQuotation,
  (state: IQuotation): boolean => state?.EnviadaConInvestigacion,
);
export const selectFolioQuotation = createSelector(
  selectedQuotation,
  (state: IQuotation): string => state?.Folio,
);

export const selectTotalQuoted = createSelector(
  selectQuotationItemsCombinedFiltered,
  selectedQuotationDetails,
  (
    state: Array<QuotationItemCombined>,
    quotationDetails: IGMCotCotizacionDetalle,
  ): ShoppingCartTotalsModel => {
    let totalPriceQuotation = 0;
    let totalTax = 0;
    let subTotal = 0;
    const totalFreights =
      (sumBy(quotationDetails?.cotCotizacionFletesUltimaMilla, 'PrecioTotal') ?? 0) +
      (sumBy(quotationDetails?.cotCotizacionFleteExpress, 'PrecioTotal') ?? 0);
    const subtotalFreights =
      (sumBy(quotationDetails?.cotCotizacionFletesUltimaMilla, 'PrecioVentaConvertido') ?? 0) +
      (sumBy(quotationDetails?.cotCotizacionFleteExpress, 'Precio') ?? 0);
    const ivaFreight =
      (sumBy(quotationDetails?.cotCotizacionFletesUltimaMilla, 'PrecioIVA') ?? 0) +
      (sumBy(quotationDetails?.cotCotizacionFleteExpress, 'PrecioIVA') ?? 0);
    // DOCS Para loa sumatoria solo se van a contemplar las partidas de tipo original
    const filterOriginalItem = filter(
      state,
      (o: QuotationItemCombined) =>
        o?.VPartidaCotizacion?.ClaveTipoPartidaCotizacion !==
          quotationItemTypes[QuotationItemTypes.Saving] && o.VPartidaCotizacion !== null,
    );
    //DOCS: SUMA LAS PROPIEDADES DE LAS PARTIDAS ORIGINALES
    _map(filterOriginalItem, (partida) => {
      totalPriceQuotation += Number(partida?.CotProductoOferta?.totalPrice ?? 0);
      totalTax += Number(partida?.CotProductoOferta?.ivaTotal ?? 0);
      subTotal += Number(partida?.CotProductoOferta?.subtotalPrice ?? 0);
    });
    return {
      totalPriceQuotation: quotationDetails?.CotCotizacion?.FleteDesglosado
        ? totalPriceQuotation + totalFreights
        : totalPriceQuotation,
      totalTax: totalTax + ivaFreight,
      subTotal: quotationDetails?.CotCotizacion?.FleteDesglosado
        ? subTotal + subtotalFreights
        : subTotal,
      freights: totalFreights,
    };
  },
);

export const selectedQuotationClientInfoDeliveryRoute = createSelector(
  selectedAddressDelivery,
  (state: VDireccion): string => state?.IdCatRutaEntrega,
);
export const selectedQuotationClientInfoMapped = createSelector(
  selectedQuotation,
  selectedQuotationDetails,
  (state: IQuotation, selectedQuotation: IGMCotCotizacionDetalle): IGeneralDataQuotation => {
    if (state?.clientInfo) {
      const {
        client,
        contact,
        billingData,
        paymentConditions,
        user,
        addressSelected,
      } = state?.clientInfo;
      return {
        clientName: client?.Nombre ?? 'N/D',
        incomeLevel: client?.NivelIngreso ?? 'N/D',
        category: client?.Categoria,
        route:
          addressSelected && addressSelected?.DescripcionRutaEntrega
            ? addressSelected?.DescripcionRutaEntrega
            : 'N/D',
        whoBills: selectedQuotation?.CotCotizacion?.IdEmpresaPublicaciones
          ? selectedQuotation?.AliasEmpresaQueFacturaPublicaciones
          : selectedQuotation?.CotCotizacion?.IdEmpresa
          ? selectedQuotation?.AliasEmpresaQueFacturaCotizacion
          : 'N/D',
        paymentConditions:
          paymentConditions && paymentConditions.CondicionesDePago
            ? paymentConditions.CondicionesDePago
            : 'N/D',
        assignedUser: client && client.ESAC ? client.ESAC : 'N/D',
        sendGuide: addressSelected?.PagaGuiaEnvio ? 'Sí' : 'No' ?? 'N/D',
        acceptPartial: addressSelected?.AceptaParciales ? 'Sí' : 'No' ?? 'N/D',
        folio: state.Folio,
        sector: client?.Sector || 'N/D',
        industry: client?.Industria || 'N/D',
      };
    }
    return {} as IGeneralDataQuotation;
  },
);

export const selectGeneralData = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): QuotationClientInfo => state.generalData,
);
export const selectTotalPieces = createSelector(
  selectQuotationItemsCombinedFiltered,
  (state: QuotationItemCombined[]): number =>
    reduce(
      state,
      (total, item: QuotationItemCombined) => {
        return item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
          quotationItemTypes[QuotationItemTypes.Saving] ||
          item?.VPartidaCotizacion === null ||
          item.freightItem
          ? total
          : total + item.CotProductoOferta?.NumeroDePiezas;
      },
      0,
    ),
);

export const selectTotalItemsInQuotation = createSelector(
  selectQuotationItemsCombinedFiltered,
  (state: QuotationItemCombined): number =>
    reduce(
      state,
      (total, item: QuotationItemCombined) => {
        return item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
          quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
          ? total
          : total + 1;
      },
      0,
    ),
);
export const selectOptionSwitch = createSelector(
  selectCatTipoCotizacion,
  (state: Array<CatTipoCotizacion>): Array<DropListOption> =>
    getArrayForDropDownList(
      state,
      'IdCatTipoCotizacion',
      'TipoCotizacion',
      null,
      null,
      null,
      'Clave',
    ),
);

export const selectedOptionSwitchList = createSelector(
  [selectedQuotationDetails, selectOptionSwitch],
  (state: IGMCotCotizacionDetalle, typeQuotation: Array<DropListOption>): DropListOption =>
    find(typeQuotation, (type) => type.value === state?.CotCotizacion?.IdCatTipoCotizacion),
);
export const freightValidationSaveQuotation = createSelector(
  [
    selectIsInternalMessaging,
    selectClientSendGuide,
    selectFreightSelected,
    selectShippingCostApply,
  ],
  (
    IsInternalMessaging: boolean,
    clientSendGuide: boolean,
    freightSelected: IFlete,
    sShippingCostApply,
  ): boolean => {
    if (IsInternalMessaging || clientSendGuide || sShippingCostApply) {
      return true;
    }
    return !isEmpty(freightSelected);
  },
);
export const selectValidationTypeQuotation = createSelector(
  [selectedOptionSwitchList, selectedInvestigationItems],
  (
    selectedTypeQuotation: DropListOption,
    itemsInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  ): boolean => {
    const investigationItems = filter(
      itemsInvestigation,
      (o: ICotPartidasInvetigacionCotizacion) =>
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion !== INVESTIGATION_STATUS.finished &&
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion !== INVESTIGATION_STATUS.canceled &&
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion !== INVESTIGATION_STATUS.attended,
    );
    if (selectedTypeQuotation?.label !== 'Parcial') {
      return investigationItems?.length === 0;
    }
    return true;
  },
);

export const selectValidationInvestigationAttended = createSelector(
  selectedInvestigationItems,
  (
    itemsInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  ): Array<ICotPartidasInvetigacionCotizacion> => {
    return filter(
      itemsInvestigation,
      (o: ICotPartidasInvetigacionCotizacion) =>
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion === INVESTIGATION_STATUS.attended,
    );
  },
);
export const selectValidationInvestigationFinished = createSelector(
  selectedInvestigationItems,
  (
    itemsInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  ): Array<ICotPartidasInvetigacionCotizacion> => {
    return filter(
      itemsInvestigation,
      (o: ICotPartidasInvetigacionCotizacion) =>
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion === INVESTIGATION_STATUS.finished,
    );
  },
);
export const selectValidationInvestigation = createSelector(
  selectedInvestigationItems,
  (
    itemsInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  ): Array<ICotPartidasInvetigacionCotizacion> => {
    return filter(
      itemsInvestigation,
      (o: ICotPartidasInvetigacionCotizacion) =>
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion === INVESTIGATION_STATUS.finished ||
        o.ProductoInvestigacionObj.ClaveEstadoInvestigacion === INVESTIGATION_STATUS.attended,
    );
  },
);

export const selectValidationSpecial = createSelector(
  [
    selectedQuotationItems,
    selectedAddressDelivery,
    selectFreightExpressQuotationSelected,
    selectedQuotationDetails,
  ],
  (
    quotationItems: Array<IGMCotPartidasDetalle>,
    deliveryAddress: VDireccion,
    expressFregithSelected: IFreightExpress,
    selectedQuotationDetails: IGMCotCotizacionDetalle,
  ): boolean =>
    deliveryAddress &&
    expressFregithSelected &&
    (!deliveryAddress?.AceptaParciales || selectedQuotationDetails?.CotCotizacion?.EntregaUnica)
      ? uniqBy(quotationItems, 'CotProductoOferta.IdProveedor').length === 1
      : true,
);
export const activeSave = createSelector(
  [selectedQuotation, freightValidationSaveQuotation, selectValidationSpecial],
  (
    quotation: IQuotation,
    freightValidationSaveQuotation: boolean,
    validationSpecial: boolean,
  ): boolean =>
    quotation?.selectedQuotationDetails?.CotPartidasCotizacion?.length
      ? !!(freightValidationSaveQuotation && validationSpecial)
      : true,
);

export const activeSend = createSelector(
  [
    selectedQuotation,
    selectedQuotationItems,
    freightValidationSaveQuotation,
    selectValidationSpecial,
  ],
  (
    quotation: IQuotation,
    itemsQuotation: Array<IGMCotPartidasDetalle>,
    freightValidationSaveQuotation: boolean,
    validationSpecial: boolean,
  ): boolean =>
    (!!quotation?.selectedQuotationDetails?.CotCotizacion?.IdCatTipoCotizacion &&
      itemsQuotation?.length > 0 &&
      freightValidationSaveQuotation &&
      validationSpecial) ||
    (itemsQuotation?.length === 0 &&
      quotation?.selectedQuotationDetails?.CotPartidasInvetigacionCotizacion?.length >= 1),
);

export const needsToReloadContacts = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state.needsToReloadContacts,
);

export const selectContacts = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<ContactoDetalleObj> => state?.contacts,
);

export const selectShowMessageConfiguration = createSelector(
  selectedQuotation,
  (state): boolean =>
    !state?.productDataInvestigation?.ConfiguracionContratoCliente?.Configurado ||
    state?.productDataInvestigation?.product?.FechaCaducidadVigenciaCuraduria <
      currentLocaleDateUTCFormat(),
);

export const selectProductDataInvestigation = createSelector(
  selectedQuotation,
  (state: IQuotation): IInvestigationProductData => state?.productDataInvestigation,
);

export const selectOptionsContact = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<DropListOption> =>
    _map(
      state.contacts,
      (o): DropListOption => ({
        value: o.IdContactoCliente,
        label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno}`,
      }),
    ),
);

export const selectOptionContactSelected = createSelector(
  [selectOptionsContact, selectedQuotation],
  (optionsContact: Array<DropListOption>, quotation: IQuotation): DropListOption =>
    flow([
      () => find(optionsContact, (o) => o.value === quotation.IdContactoCliente),
      (option) => {
        return option ? option : ({} as DropListOption);
      },
    ])(),
);

export const selectContactSelected = createSelector(
  [selectContacts, selectedQuotation],
  (optionsContact: Array<ContactoDetalleObj>, quotation: IQuotation): IContactQuotation =>
    flow([
      () => find(optionsContact, (o) => o.IdContactoCliente === quotation.IdContactoCliente),
      (contact): IContactQuotation => {
        return {
          contactName: contact
            ? `${contact.Nombres} ${contact.ApellidoPaterno} ${contact.ApellidoMaterno}`
            : 'ND',
          email: contact && contact.Email && contact.Email.Correo ? contact.Email.Correo : 'ND',
          phone1:
            contact && contact.Phone1 && contact.Phone1.Numero
              ? `${contact.Phone1.Numero}${
                  contact.Phone1.Extension ? ` · Ext. ${contact.Phone1.Extension}` : ''
                }`
              : 'ND',
          phone2:
            contact && contact.Phone2 && contact.Phone2.Numero
              ? `${contact.Phone2.Numero}${
                  contact.Phone2.Extension ? ` · Ext. ${contact.Phone2.Extension}` : ''
                }`
              : 'ND',
          mobile: contact && contact.Mobile && contact.Mobile.Numero ? contact.Mobile.Numero : 'ND',
          department: contact && contact.Departamento ? contact.Departamento : 'ND',
          position: contact && contact.Puesto ? contact.Puesto : 'ND',
          decisionLevel: contact && contact.NivelDecision ? contact.NivelDecision : 'ND',
          descriptionPosition: 'ND',
        };
      },
    ])(),
);

export const selectClientNameHeader = createSelector(
  [selectedClient, selectQuotationDetailsComponent],
  (data: ClientsListItemForQuotation, isDetails: boolean) => {
    if (isDetails) {
      return data?.Nombre;
    }
    return '';
  },
);

export const selectMailData = createSelector(
  selectedQuotation,
  (quotation: IQuotation): CorreoRecibidoClienteRequerimientoObj => {
    return quotation?.mailData;
  },
);

export const selectEmailForDialog = createSelector(
  selectMailData,
  (state: CorreoRecibidoClienteRequerimientoObj): IDropListMulti[] => {
    return [
      {
        value: state?.CorreoRecibido?.IdentificadorCorreo,
        labels: [{label: state?.CorreoRecibido?.CorreoEmisor, isShow: true}],
      },
    ];
  },
);

export const selectOptionsContactEmail = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Array<IDropListMulti> => state.contactsEmail,
);
export const selectFetchMoreProductosQueryInfo = createSelector(
  [selectProductsSearchResults, selectQuotationSearchFilters, selectProductsSearchResultsStatus],
  (
    state: Array<ProductSearchResult>,
    filters: QuotationSearchFilters,
    productsSearchResultsStatus: number,
  ): IFetchMoreItemsInfo => {
    return {
      itemList: state,
      itemsTotalLength: filters.total,
      listRequestStatus: productsSearchResultsStatus,
      desiredPage: filters.productsQueryInfo.desiredPage,
      pageSize: filters.productsQueryInfo.pageSize,
      totalPages:
        filters.total >= filters.productsQueryInfo.pageSize
          ? Math.ceil(filters.total / filters.productsQueryInfo.pageSize)
          : 0,
    };
  },
);
export const selectIsLinkNewContactOpen = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state.isLinkNewClientPopUpOpen,
);
export const selectIsLinkAddNewContactOpen = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state.isLinkAddNewClientPopUpOpen,
);
export const selectIsLinkAddNewContactSuccess = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state.isLinkAddNewClientPopUpSuccess,
);
export const selectClientListStatus = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): number => state.clientListStatus,
);
export const selectSelectedProductSearchList = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState) => state?.selectedProduct,
);
export const selectInvestigationProductPopUp = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ICotPartidasInvetigacionCotizacion =>
    state?.investigationProductPopUp,
);
export const selectInvestigationEvidenceFile = createSelector(
  selectInvestigationProductPopUp,
  (state: ICotPartidasInvetigacionCotizacion): Archivo => state?.evidenceFile,
);
export const selectInvestigationProductPopUpIsOpen = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state?.investigationProductPopUpIsOpen,
);
export const selectSelectedProductDetail = createSelector(
  selectedQuotation,
  (state): IGMCotPartidasDetalle => state?.selectedQuotationDetails?.selectedProduct,
);
export const selectIsOpenDetailsProductInvestigation = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state?.isOpenDetailsProductInvestigation,
);
export const selectAttendedInvestigationData = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ICotPartidaInvetigacionAtencionComentariosObj =>
    state?.attendedInvestigationData,
);
export const selectReattendedInvestigation = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ReatenderPartidaInvestigacion => state?.reattendedInvestigation,
);
export const selectActiveErrorAddress = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): boolean => state?.activeErrorAddress,
);
export const selectReattendedInvestigationQuery = createSelector(
  selectAttendedInvestigationData,
  selectReattendedInvestigation,
  (
    attendedInvestigationData: ICotPartidaInvetigacionAtencionComentariosObj,
    reattendedInvestigation: ReatenderPartidaInvestigacion,
  ): ReatenderPartidaInvestigacion => ({
    ...reattendedInvestigation,
    IdCotPartidaCotizacionInvestigacion:
      attendedInvestigationData?.cotPartidaCotizacionInvestigacion
        ?.IdCotPartidaCotizacionInvestigacion,
  }),
);
export const selectAttendedInvestigationHistoryChat = createSelector(
  selectAttendedInvestigationData,
  (state: ICotPartidaInvetigacionAtencionComentariosObj): Array<IMessageHistory> =>
    _map(
      state?.cotPartidaCotizacionInvestigacionComentario,
      (o: CotPartidaCotizacionInvestigacionComentario): IMessageHistory => ({
        contentMessage: o.Comentario,
        date: o.FechaRegistro,
        headerText: o.ComentarioEVI ? 'Evi' : 'Gestor de contenido',
        idMessage: o.IdCotPartidaCotizacionInvestigacionComentario,
        messagePositionLeft: o.ComentarioInvestigador,
        messagePositionRight: o.ComentarioEVI,
      }),
    ),
);
export const selectQuotationDetailsToSave = createSelector(
  selectedQuotation,
  selectedQuotationClientInfoDeliveryRoute,
  (state: IQuotation, deliveryRoute: string): IGMCotCotizacionDetalle => ({
    ...state?.selectedQuotationDetails,
    CotPartidasCotizacion: _map(
      state?.selectedQuotationDetails?.CotPartidasCotizacion,
      (o: IGMCotPartidasDetalle): IGMCotPartidasDetalle => ({
        ...omit(o, ['VPartidaCotizacion', 'product']),
        IdCatRutaEntrega: deliveryRoute,
      }),
    ),
  }),
);
export const selectQuotationCurrency = createSelector(
  selectedQuotationDetails,
  (state: IGMCotCotizacionDetalle): string => state?.ClaveMoneda,
);
export const selectQuotationCurrencyDropListOption = createSelector(
  selectedQuotationDetails,
  dropListMoneda,
  (state: IGMCotCotizacionDetalle, curencyList: DropListOption[]): DropListOption =>
    find(curencyList, (o: DropListOption) => o.value === state?.CotCotizacion?.IdCatMoneda),
);

export const selectInternalSalesItemProductSearchResults = createSelector(
  selectProductsSearchResults,
  selectQuotationCurrency,
  (state: ProductSearchResult[], currency: string): InternalSalesItem[] => {
    if (state?.length > 0) {
      return _map(
        state,
        (item: ProductSearchResult, index: number): InternalSalesItem => ({
          data: item,
          index: item.Index,
          activeGenericEmitter: true,
          isSelected: item?.isSelected,
          columnNumberItem: {
            number: item?.Index,
            isDisabled: !item.Configurado,
          },
          columnImgTypePresentationProduct: {
            src: item?.image,
          },
          columnConcept: {
            availabilityKey: item.DisponibilidadClave,
            cat: item.Catalogo,
            typePresentation: item.TipoPresentacion,
            presentation: item.Presentacion,
            unity: item.Unidad,
            description: item.Descripcion,
            type: item.Tipo,
            subType: item.Subtipo,
            control: item.Control,
            controlled: item.Controlado,
            dateValidation: item.FechaCaducidadVigenciaCuraduria,
            author: item.Autor,
            formatPublication: item.FormatoPublicacion,
            typeMode: item.MedioDifusion,
            isDisabled: !item.Configurado,
          },
          columnBrand: {
            src: item?.imageBrand,
            nameBrand: item?.NombreMarca,
            isDisabled: !item.Configurado,
          },
          columnDeliveryRestrictions: {
            showColumn: true,
            value:
              item?.RestriccionDeCompra === PurchaseRestrictions.limitOfPieces
                ? item?.RestriccionDeCompra + ' ' + item?.NumeroDePiezas + ' al Mes'
                : item?.RestriccionDeCompra,
          },
          columnTotalValue: {
            style: StylesColumnTotalValue.General,
            value: item?.PrecioDeVenta,
            currency: currency,
            isDisabled: !item.Configurado,
            priceGroup: item?.PrecioPorGrupo,
            pricePerson: item?.PrecioPorPersona,
            numberPeopleGroup: item?.NumeroDePersonasPorGrupo,
            timeDelivery: item?.TiempoEntrega,
            showTimeDelivery: !item.MedioDifusion || item.MedioDifusion === 'Pregrabada',
            type: item?.Tipo,
          },
          columnArrow: {
            isSelected: item?.isSelected,
          },
        }),
      );
    }

    return [];
  },
);

export const selectIsNewClient = createSelector(
  [selectedClient, selectNewClientName],
  (state: ClientsListItemForQuotation, newClientName: string): boolean =>
    state?.Nombre === newClientName,
);

//DOCS: Validación del pop de detalles de la partida
export const selectValidateBtnPoPDetailsItem = createSelector(
  selectSelectedProductDetail,
  (state: IGMCotPartidasDetalle) =>
    (state?.CotProductoOferta?.NumeroDePiezas > 0 &&
      !state.vProductoDetalle?.ProductoCapacitacion) ||
    (state?.vProductoDetalle?.ProductoCapacitacion &&
      state?.CotProductoOferta?.NumeroDePiezas > 0 &&
      state.fechasRealizacionCapacitacion?.length > 0),
);

export const selectInternalSalesInvestigationItem = createSelector(
  selectedQuotationDetails,
  selectedQuotationStatus,
  (state: IGMCotCotizacionDetalle, statusQuotation: CatEstadoCotizacion): InternalSalesItem[] => {
    return _map(
      state?.CotPartidasInvetigacionCotizacion,
      (item: ICotPartidasInvetigacionCotizacion, index: number): InternalSalesItem => {
        return {
          data: item,
          index,
          activeGenericEmitter:
            statusQuotation.EstadoCotizacion !== CatQuotationState.Enviada &&
            !state.CotCotizacion.EnviadaConInvestigacion &&
            !state.CotCotizacion.CotizacionDeInvestigacion,
          columnNumberItem: {
            number: item?.ProductoInvestigacionObj?.Index,
          },
          columnConcept: {
            stateInvestigation: item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion,
            cat: item.ProductoInvestigacionObj?.Catalogo,
            description: item?.ProductoInvestigacionObj?.Descripcion,
            type: item?.ProductoInvestigacionObj?.Tipo,
            subType: item?.ProductoInvestigacionObj?.SubTipo,
            control: item?.ProductoInvestigacionObj?.Control,
          },
          columnBrand: {
            src: item?.ProductoInvestigacionObj?.imageHover,
            nameBrand: item?.ProductoInvestigacionObj?.Marca,
          },
          columnNumberPieces: {
            value: item?.ProductoInvestigacionObj?.piezas ?? 0,
          },
          columnResearchResponse: {
            productNotFound:
              item?.CotPartidaInvestigacionProducto?.NoEncontrado &&
              item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
                ENUM_STATUS_INVESTIGATION_ITEM.FINALIZED,
            productFound:
              item?.CotPartidaInvestigacionProducto?.Encontrado &&
              item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
                ENUM_STATUS_INVESTIGATION_ITEM.FINALIZED,
            productAvailable:
              item.ProductoInvestigacionObj?.ProductoDisponible &&
              !item.CotPartidaInvestigacionProducto &&
              item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
                ENUM_STATUS_INVESTIGATION_ITEM.ATTENDED,
            productSuggested:
              item.ProductoInvestigacionObj?.ProductoSugerencia &&
              !item.CotPartidaInvestigacionProducto &&
              item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
                ENUM_STATUS_INVESTIGATION_ITEM.ATTENDED,
          },
          columnSeeMore: {
            showColumn:
              item.CotPartidaInvestigacionProducto &&
              item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
                ENUM_STATUS_INVESTIGATION_ITEM.FINALIZED &&
              item.CotPartidaInvestigacionProducto.Encontrado &&
              !state.CotCotizacion.EnviadaConInvestigacion &&
              !state.CotCotizacion.CotizacionDeInvestigacion,
          },
        };
      },
    );
  },
);

export const selectInternalSalesItem = createSelector(
  selectedQuotationDetails,
  selectQuotationItemsCombinedFiltered,
  selectIsProratedFreight,
  selectHasFreightSelected,
  selectFreightExpressQuotationSelected,
  selectedQuotationStatus,
  (
    selectedQuotation: IGMCotCotizacionDetalle,
    state: QuotationItemCombined[],
    isProratedFreight: boolean,
    hasFreightSelected: boolean,
    freightExpressSelectedInList: IFreightExpress,
    statusQuotation: CatEstadoCotizacion,
  ): InternalSalesItem[] => {
    //DOCS: SABER SI AL MENOS UN PRODUCTO TIENE RESTRICCIONES DE COMPRA PARA MOSTRAR LA COLUMNA
    const containsDeliveryRestrictions = !!find(state, (item: QuotationItemCombined) => {
      const generalDataObject: IVPartidaCotizacion | ProductSearchResult =
        item.VPartidaCotizacion || item.product;
      return (
        generalDataObject?.RestriccionDeCompra &&
        generalDataObject.RestriccionDeCompra !== PurchaseRestrictions.none
      );
    });
    return _map(
      state,
      (item: QuotationItemCombined, index: number): InternalSalesItem => {
        if (!item.freightItem) {
          const generalDataObject: IVPartidaCotizacion | ProductSearchResult =
            item.VPartidaCotizacion || item.product;

          const internalSalesItem: InternalSalesItem = {
            data: item,
            index,
            activeGenericEmitter:
              statusQuotation.EstadoCotizacion !== CatQuotationState.Enviada &&
              !selectedQuotation.CotCotizacion.EnviadaConInvestigacion &&
              !selectedQuotation.CotCotizacion.CotizacionDeInvestigacion,
            backgroundColorByTypeItem:
              item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
                ? QuotationItemTypes.Saving
                : QuotationItemTypes.Original,
            columnNumberItem: {
              number: item?.Index,
              showArrow:
                item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                  quotationItemTypes[QuotationItemTypes.Saving] ||
                item?.VPartidaCotizacion === null,
            },
            columnImgTypeItem: {
              value:
                item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                  quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
                  ? QuotationItemTypes.Saving
                  : QuotationItemTypes.Original,
            },
            columnConcept: {
              availabilityKey: generalDataObject.DisponibilidadClave,
              cat: generalDataObject.Catalogo,
              typePresentation: generalDataObject.TipoPresentacion,
              presentation: generalDataObject.Presentacion,
              unity: generalDataObject.Unidad,
              description: generalDataObject.Descripcion,
              type: generalDataObject.Tipo,
              subType: generalDataObject.Subtipo,
              control: generalDataObject.Control,
              controlled: generalDataObject.Controlado,
              dateValidation: generalDataObject.FechaCaducidadVigenciaCuraduria,
              author: generalDataObject.Autor,
              formatPublication: generalDataObject.FormatoPublicacion,
              typeMode: generalDataObject.MedioDifusion,
              datesSuggested: item?.fechasRealizacionCapacitacion,
              // DOCS: Muestra la leyenda de flete express prorrateado si tiene flete express, y no esta desglosado
              proratedExpress:
                !isProratedFreight &&
                item.CotProductoOferta.IdProveedor === freightExpressSelectedInList?.IdProveedor,
              addItemSaving:
                (generalDataObject?.Controlado &&
                  statusQuotation?.EstadoCotizacion !== CatQuotationState.Enviada &&
                  item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                    quotationItemTypes[QuotationItemTypes.Original]) ||
                (generalDataObject?.Controlado &&
                  statusQuotation?.EstadoCotizacion !== CatQuotationState.Enviada &&
                  item?.VPartidaCotizacion !== null &&
                  item?.VPartidaCotizacion?.ClaveTipoPartidaCotizacion !==
                    quotationItemTypes[QuotationItemTypes.Saving]),
              complementary: generalDataObject?.TotalComplementario,
              alternate: generalDataObject?.TotalAlternativo,
              supplements: generalDataObject?.TotalSuplementario,
            },
            // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
            columnNotes: !isEmpty(
              filter(state, (o: QuotationItemCombined) => o?.CotPartidaCotizacion?.Comentarios),
            )
              ? item?.CotPartidaCotizacion?.Comentarios
                ? {
                    systemNotes: null,
                    itemNotes: item?.CotPartidaCotizacion?.Comentarios,
                  }
                : {
                    systemNotes: null,
                    itemNotes: null,
                  }
              : null,
            columnBrand: {
              src: generalDataObject.imageHover,
              nameBrand: generalDataObject.NombreMarca,
            },
            columnDeliveryTime: {
              days: generalDataObject.TiempoEstimadoEntrega,
              isEdit: false,
              isFreight:
                item.CotProductoOferta.IdProveedor === freightExpressSelectedInList?.IdProveedor,
            },
            columnNumberPieces: {
              value: item.CotProductoOferta?.NumeroDePiezas,
              isEdit: false,
            },
            columnUnitPrice: {
              value: item.CotProductoOferta?.PrecioCotizadoUnitarioConvertido,
              currency: selectedQuotation.ClaveMoneda,
              isEdit: false,
              showComments: false,
              priceGroup: generalDataObject?.PrecioPorGrupo,
              pricePerson: generalDataObject?.PrecioPorPersona,
              numberPeopleGroup: generalDataObject?.NumeroDePersonasPorGrupo,
            },
            columnProFreight: {
              showColumn: !isProratedFreight && hasFreightSelected,
              value: item.proratedFreightTotal,
              currency: selectedQuotation.ClaveMoneda,
            },
            columnSubtotal: {
              value: item?.CotProductoOferta?.subtotalPrice,
              currency: selectedQuotation.ClaveMoneda,
            },
            columnIva: {
              value: item.CotProductoOferta?.ivaTotal,
              currency: selectedQuotation.ClaveMoneda,
            },
            columnDeliveryRestrictions: {
              showColumn: containsDeliveryRestrictions ?? false,
              value:
                generalDataObject?.RestriccionDeCompra === PurchaseRestrictions.limitOfPieces
                  ? generalDataObject?.RestriccionDeCompra +
                    ' ' +
                    (item?.VPartidaCotizacion?.RestriccionProductoNumeroDePiezas ||
                      item?.product?.NumeroDePiezas) +
                    ' al Mes'
                  : generalDataObject?.RestriccionDeCompra,
            },
            columnTotalValue: {
              value: item.CotProductoOferta?.totalPrice,
              style: StylesColumnTotalValue.General,
              currency: selectedQuotation.ClaveMoneda,
              listPrice: item.CotProductoOferta?.PrecioListaConvertido,
              priceGroup: generalDataObject?.PrecioPorGrupo,
              pricePerson: generalDataObject?.PrecioPorPersona,
              numberPeopleGroup: generalDataObject?.NumeroDePersonasPorGrupo,
              type: generalDataObject?.Tipo,
              pieces: item.CotProductoOferta?.NumeroDePiezas,
            },
            columnDelete: {
              showColumn:
                statusQuotation.EstadoCotizacion !== CatQuotationState.Enviada &&
                !selectedQuotation.CotCotizacion.EnviadaConInvestigacion &&
                !selectedQuotation.CotCotizacion.CotizacionDeInvestigacion,
              showArrow: true,
              typeItem:
                item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                  quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
                  ? QuotationItemTypes.Saving
                  : QuotationItemTypes.Original,
            },
          };
          if (statusQuotation.EstadoCotizacion === CatQuotationState.Enviada) {
            delete internalSalesItem.columnDelete;
          }
          return internalSalesItem;
        }
        const internal: InternalSalesItem = {
          data: item,
          index,
          activeGenericEmitterFreight: true,
          columnNumberItem: {
            number: item.freightItem.index,
          },
          columnImgTypeItem: {},
          columnConcept: {
            nameFreight: item.freightItem.descriptionFreight,
          },
          columnBrand: {},
          columnDeliveryTime: {},
          columnNumberPieces: {},
          columnUnitPrice: {},
          columnProFreight: {},
          columnSubtotal: {
            value: item?.freightItem?.subtotal,
            currency: selectedQuotation.ClaveMoneda,
          },
          columnIva: {
            value: item?.freightItem?.iva,
            currency: selectedQuotation.ClaveMoneda,
          },
          columnNotes: !isEmpty(
            filter(state, (o: QuotationItemCombined) => o?.CotPartidaCotizacion?.Comentarios),
          )
            ? item?.CotPartidaCotizacion?.Comentarios
              ? {
                  systemNotes: null,
                  itemNotes: item?.CotPartidaCotizacion?.Comentarios,
                }
              : {
                  systemNotes: null,
                  itemNotes: null,
                }
            : null,
          columnDeliveryRestrictions: {
            showColumn: containsDeliveryRestrictions ?? false,
          },
          columnTotalValue: {
            value: item.freightItem.total,
            style: StylesColumnTotalValue.General,
            currency: selectedQuotation.ClaveMoneda,
          },
          columnDelete: {
            showColumn:
              statusQuotation.EstadoCotizacion !== CatQuotationState.Enviada &&
              !selectedQuotation.CotCotizacion.EnviadaConInvestigacion &&
              !selectedQuotation.CotCotizacion.CotizacionDeInvestigacion,
            showArrow: false,
          },
        };

        if (statusQuotation.EstadoCotizacion === CatQuotationState.Enviada) {
          delete internal.columnDelete;
        }
        return internal;
      },
    );
  },
);
