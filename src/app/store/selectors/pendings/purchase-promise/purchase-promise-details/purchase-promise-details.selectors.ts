import {createSelector} from '@ngrx/store';

// Models
import {IPurchasePromiseState} from '@appModels/store/pendings/purchase-promise/purchase-promise.model';
import {
  IClientRestrictions,
  IPurchasePromiseClient,
  IPurchasePromiseDetailsState,
  IPurchasePromiseOrder,
  IPurchasePromiseOrders,
  IPurchasePromiseQuotation,
  IPurchasePromiseQuotations,
  IQuoteItem,
  IQuoteSummaryItem,
  PromisePurchase,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Utils
import {
  concat,
  deburr,
  every,
  filter,
  find,
  flow,
  forEach,
  groupBy,
  includes,
  isEmpty,
  map as _map,
  size,
  some,
  sumBy,
} from 'lodash-es';
import {
  API_REQUEST_STATUS_LOADING,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  IVA_FREIGHT_ITEM,
  SRC_IMG_TYPE_AVAILABILITY,
  SRC_IMG_TYPE_ITEM,
} from '@appUtil/common.protocols';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {ContactoDetalleObj, ParametroBuscadorSugerencias, QueryInfo} from 'api-catalogos';
import {
  GMCotFleteUltimaMilla,
  GMPartidaPromesaDeCompra,
  GMPretramitarPromesaDeCompra,
} from 'api-logistica';
import {IClientContact} from '@appModels/shared/shared.models';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as moment from 'moment';
import {selectCatalogsState} from '@appCore/core.state';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {IFreightItem, InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildInternalSalesItem,
  buildInternalSalesItemResume,
} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {
  buildClientContact,
  getTotalFreights,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {calculateEstimatedDeliveryDate, dateWithoutHoursUTCDate} from '@appUtil/dates';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {buildImageNameSave} from '@appUtil/strings';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {selectPurchasePromise} from '@appSelectors/pendings/pendings.selectors';

export const selectPurchasePromiseDetails = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState): IPurchasePromiseDetailsState => state?.purchasePromiseDetails,
);

export const selectedClient = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IPurchasePromiseClient => {
    return state?.selectedClient;
  },
);
export const selectOcBurgerOptions = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): Array<DropListOption> => state.ocBurgerOptions,
);
export const selectClientTotals = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.clientTotals,
);
export const selectDateBurgerOptions = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): Array<DropListOption> => state.dateBurgerOptions,
);
export const selectedOcBurgerOption = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): DropListOption => state.selectedOcBurgerOption,
);
export const selectedDateBurgerOption = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): DropListOption => state.selectedDateBurgerOption,
);
export const selectedSearchOption = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): DropListOption => state.selectedPurchaseSearchOption,
);
export const selectOcSearchTerm = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): string => state.ocSearchTerm,
);
export const selectPurchaseSearchOptions = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): Array<DropListOption> => state.purchaseSearchOptions,
);
export const selectedPurchaseSearchOption = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): DropListOption => state?.selectedPurchaseSearchOption,
);
export const selectPurchaseSearchTerm = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): string => state?.purchaseSearchTerm,
);
export const selectPurchaseOrders = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IPurchasePromiseOrders => state.purchaseOrders,
);
export const selectPurchaseOrderList = createSelector(
  selectPurchaseOrders,
  (state) => state.Results,
);
export const selectPurchaseOrderTotals = createSelector(selectPurchaseOrders, (state) =>
  state.TotalResults ? state.TotalResults : 0,
);
export const selectedPurchaseOrder = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IPurchasePromiseOrder => state.selectedPurchaseOrder,
);
export const selectContactData = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): ContactoDetalleObj => state?.contact,
);
export const selectedOrder = createSelector(
  selectedPurchaseOrder,
  (state: IPurchasePromiseOrder): any => state?.selectedOrder,
);
export const selectSeeResumeActive = createSelector(
  selectedPurchaseOrder,
  (state: IPurchasePromiseOrder): boolean => state?.seeResumeActive,
);
export const selectQueryInfo = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.queryInfo,
);
export const selectProductsQueryInfo = createSelector(
  selectPurchasePromiseDetails,
  ({productsQueryInfo}): QueryInfo => productsQueryInfo,
);
export const selectQuotations = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.quotations,
);

export const selectQuotationsResults = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.quotations.Results,
);
export const selectQuotationsForCards = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): Array<ICard> => {
    return !isEmpty(state.quotations.Results)
      ? _map(state.quotations.Results, (o: IPurchasePromiseQuotation) => ({
          value: o.IdCotCotizacion,
          active: o.isSelected,
          labels: [
            {
              label: `#${o.Index + 1} · ${o.Folio}`,
              className: CLASS_NAMES.title,
            },
            {
              label: `Valor Total ${new CurrencyFormat().transform(
                o.TotalPromesa,
                o.ClaveMoneda,
              )} ${o.ClaveMoneda}`,
              className: CLASS_NAMES.totalAmount,
            },
            {
              label: `${o.TotalProductos} ${o.TotalProductos === 1 ? 'Producto' : 'Productos'}`,
              className: CLASS_NAMES.countProducts,
            },
            // {
            //   //TODO: Cambiar por una condición (de momento no hay bandera)
            //   label: 'Recotizada',
            //   className: CLASS_NAMES.status,
            //   color: COLOR_STATUS.REQUOTED,
            // },
          ],
        }))
      : [];
  },
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectParamsPurchaseOrder = createSelector(
  selectedClient,
  selectQueryInfo,
  selectedOcBurgerOption,
  selectedDateBurgerOption,
  selectOcSearchTerm,
  (
    customer,
    queryInfo,
    ocBurgerOption: DropListOption,
    dataBurgerOption: DropListOption,
    searchTerm,
  ) => {
    const params = new FiltersOnlyActive();
    params.pageSize = queryInfo.pageSize;
    params.desiredPage = queryInfo.desiredPage;
    params.SortField = 'FechaRegistro';
    params.SortDirection = dataBurgerOption.value === '1' ? 'Desc' : 'Asc';
    if (!isEmpty(customer)) {
      params.Filters.push(
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: customer.DescripcionLlave,
        },
        {
          NombreFiltro: 'IdPPPedido',
          ValorFiltro: null,
        },
      );
    }
    if (ocBurgerOption.value !== '1') {
      params.Filters.push({
        NombreFiltro: 'OC',
        ValorFiltro: ocBurgerOption.value === '2',
      });
    }
    if (searchTerm) {
      params.Filters.push({
        NombreFiltro: 'OrdenDeCompra',
        ValorFiltro: searchTerm,
      });
    }
    if (queryInfo.reloadStates !== null || queryInfo.reloadStates !== undefined) {
      params.reloadStates = queryInfo.reloadStates;
    }
    if (ocBurgerOption.reloadStates !== null || ocBurgerOption.reloadStates !== undefined) {
      params.reloadStates = queryInfo.reloadStates;
    }
    if (dataBurgerOption.reloadStates !== null || dataBurgerOption.reloadStates !== undefined) {
      params.reloadStates = queryInfo.reloadStates;
    }
    return params;
  },
);
export const selectApiStatusOrders = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.apiStatusRequest,
);
export const selectApiStatusOrder = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.apiStatusRequest === API_REQUEST_STATUS_LOADING,
);
export const selectPurchaseSelected = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IPurchasePromiseOrder => state?.selectedPurchaseOrder,
);
export const selectIdCatCurrency = createSelector(
  selectPurchaseSelected,
  (state: IPurchasePromiseOrder) => state.IdCatMoneda,
);
export const selectBase64 = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state?.fileBase64,
);
export const selectOpenViewFile = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state?.openViewFile,
);
export const selectItemSearch = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.productToSearch,
);
export const selectQuotationListQueryInfo = createSelector(
  [selectedClient, selectItemSearch],
  (state: IPurchasePromiseClient, product: DropListOption): QueryInfo => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: state.DescripcionLlave,
    });
    if (!isEmpty(product)) {
      params.Filters.push({
        NombreFiltro: 'IdProducto',
        ValorFiltro: product.value,
      });
    }
    params.SortField = 'Nombre';
    params.SortDirection = 'asc';

    return params;
  },
);
export const selectViewFileLoading = createSelector(
  selectPurchasePromiseDetails,
  (state) => state.viewFileIsLoading,
);
export const selectRunSearchTearm = createSelector(
  selectPurchasePromiseDetails,
  (state) => state.runSearchTerm,
);
export const selectCatalogQueryInfo = createSelector(
  selectProductsQueryInfo,
  selectPurchaseSearchTerm,
  selectedSearchOption,
  (productsQueryInfo, runSearchTerm, typeSearch) => {
    const queryInfo = {...productsQueryInfo};
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];
    return queryInfo;
  },
);

export const selectSuggestionInQuotationQueryInfo = createSelector(
  [selectedSearchOption, selectPurchaseSearchTerm, selectedClient],
  (
    filterType: DropListOption,
    termSearch: string,
    client: IPurchasePromiseClient,
  ): ParametroBuscadorSugerencias => {
    const option = {1: 'Catalogo', 2: 'Descripcion', 3: 'CAS'};

    let type = '';
    if (termSearch && !isEmpty(filterType)) {
      type = option[filterType.value];
    }

    return {
      POCO: 'vPartidaCotizacion',
      NombreLlavePrimaria: 'IdProducto',
      NombreAtributo: filterType?.label ? patchTypeOfSearch(filterType.label) : '',
      ParametroBusqueda: termSearch,
      info: {
        Filters: [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: client?.IdCliente,
          },
          {
            NombreFiltro: 'Activo',
            ValorFiltro: true,
          },
          {
            NombreFiltro: 'EstadoCotizacion',
            ValorFiltro: 'Enviada',
          },
        ],
        SortField: type,
        SortDirection: 'asc',
      },
    };
  },
);

export const selectSuggestionInContractQueryInfo = createSelector(
  [selectedSearchOption, selectPurchaseSearchTerm, selectedClient],
  (
    filterType: DropListOption,
    termSearch: string,
    client: IPurchasePromiseClient,
  ): ParametroBuscadorSugerencias => {
    // const option = {1: 'CAS', 2: 'Catalogo', 3: 'DescripcionProducto'};
    const option = {1: 'Catalogo', 2: 'DescripcionProducto', 3: 'CAS'};
    let type = '';
    if (termSearch && !isEmpty(filterType)) {
      type = option[filterType.value];
    }
    return {
      POCO: 'vConfiguracionAplicadaCliente',
      NombreLlavePrimaria: 'IdProducto',
      NombreAtributo: type,
      ParametroBusqueda: termSearch,
      info: {
        Filters: [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: client?.IdCliente,
          },
          {
            NombreFiltro: 'EnContrato',
            ValorFiltro: true,
          },
        ],
        SortField: type,
        SortDirection: 'asc',
      },
    };
  },
);
export const selectOptionsProductSearch = createSelector(selectPurchasePromiseDetails, (state) =>
  _map(
    state.optionsOfProducts,
    (o): DropListOption => {
      return {value: o.Id, label: o.Etiqueta};
    },
  ),
);
export const selectLoadingOptionsSearch = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) =>
    state.optionsOfProductsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectQuoteSelected = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IPurchasePromiseQuotation => {
    return find(state.quotations.Results, (item) => item.isSelected);
  },
);
export const selectQuoteCurrencyById = (id: string) =>
  createSelector(selectPurchasePromiseDetails, (state: IPurchasePromiseDetailsState): string => {
    return flow(
      () =>
        find(
          state.quotations.Results,
          (item: IPurchasePromiseQuotation) => item.IdCotCotizacion === id,
        ),
      (quote) => (!isEmpty(quote) ? quote.ClaveMoneda : 'N/D'),
    )();
  });

export const selectedPurchasePromise = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): GMPretramitarPromesaDeCompra & QuoteItemExtension => {
    const selectedPurchaseOrder: IPurchasePromiseOrder = state.selectedPurchaseOrder;
    const selectedPurchasePromise: GMPretramitarPromesaDeCompra &
      QuoteItemExtension = state.purchaseOrderList.find(
      (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) =>
        it.IdPcPromesaDeCompra === selectedPurchaseOrder.IdPcPromesaDeCompra,
    );
    return selectedPurchasePromise;
  },
);

export const purchasesOrderList = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): GMPretramitarPromesaDeCompra & QuoteItemExtension[] => {
    return state.purchaseOrderList;
  },
);

export const countFreightFull = createSelector(selectedPurchasePromise, (list): number => {
  return (
    list?.PartidasPromesaDeCompra?.filter((it: any) => it?.quote?.EsFleteDesglosado)?.length || 0
  );
});
export const countFreightNotFull = createSelector(selectedPurchasePromise, (list): number => {
  return (
    list?.PartidasPromesaDeCompra?.filter((it: any) => !it?.quote?.EsFleteDesglosado)?.length || 0
  );
});

export const isFreightFull = createSelector(
  [countFreightFull, countFreightNotFull],
  (fletesDesglosados: number, fletesNoDesglosados: number): boolean => {
    return fletesDesglosados > fletesNoDesglosados;
  },
);
export const selectorSummaryList = createSelector(
  [selectPurchasePromiseDetails, selectedPurchasePromise],
  (
    state: IPurchasePromiseDetailsState,
    selectedPurchasePromise: GMPretramitarPromesaDeCompra,
  ): IQuoteItem[] => {
    const existIQuoteItem = (item: IQuoteItem): boolean => {
      return !!selectedPurchasePromise?.PartidasPromesaDeCompra.find(
        (it: GMPartidaPromesaDeCompra) => {
          return it.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion === item.IdCotPartidaCotizacion;
        },
      );
    };
    return state.itemList.filter((it: IQuoteItem) => !existIQuoteItem(it));
  },
);

export const hasActiveSummaryList = createSelector(selectorSummaryList, (state) => {
  return state.filter((it) => it.isSelected);
});
export const selectSummaryListBackUp = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.summaryListBackUp,
);
export const selectApiStatusItemList = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState) => state.statusApiItemList,
);
export const selectApiStatusSummaryList = createSelector(selectPurchasePromiseDetails, (state) => {
  return state.statusApiSummaryList;
});
export const selectSummaryList = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): IQuoteSummaryItem[] => state.summaryList.Results,
);
const patchTypeOfSearch = (type: string): string => {
  const options = {
    Concepto: 'Descripcion',
    Cat: 'Catalogo',
    Cas: 'CAS',
  };
  return options[deburr(type)];
};
export const selectItemSelected = createSelector(
  [selectorSummaryList, selectSummaryList, selectSeeResumeActive],
  (itemList: IQuoteItem[], summaryList: IQuoteSummaryItem[], resumeActive: boolean) => {
    let item;
    if (resumeActive) {
      item = filter(summaryList, (o: IQuoteSummaryItem) => {
        if (o.isInViewQuotesLinked) {
          return o.quotesLinked;
        }
      });
    } else {
      item = filter(itemList, (o: IQuoteItem) => {
        if (o.isInViewQuotesLinked) {
          return o.quotesLinked;
        }
      });
    }

    return item[0];
  },
);

export const resumePurchasePromise = createSelector(
  [selectPurchasePromiseDetails, selectedPurchasePromise],
  (
    state: IPurchasePromiseDetailsState,
    selectedPurchasePromise: GMPretramitarPromesaDeCompra,
  ): GMPartidaPromesaDeCompra[] => {
    const {PartidasPromesaDeCompra: promiseList} = selectedPurchasePromise || {};
    return promiseList || [];
  },
);

const selectValidateIncidenceEntries = createSelector(
  resumePurchasePromise,
  (items: Array<GMPartidaPromesaDeCompra>) =>
    filter(items, (o: GMPartidaPromesaDeCompra) => o.PcPartidaPromesaDeCompra.Verificada === false)
      .length ===
    filter(
      items,
      (o: GMPartidaPromesaDeCompra) =>
        o.PcPartidaPromesaDeCompra.Verificada === false &&
        o.PcIncidenciaPartidaPromesaDeCompra &&
        o.PcIncidenciaPartidaPromesaDeCompra.Comentarios &&
        (o.PcIncidenciaPartidaPromesaDeCompra.Catalogo ||
          o.PcIncidenciaPartidaPromesaDeCompra.Descripcion ||
          o.PcIncidenciaPartidaPromesaDeCompra.Presentacion ||
          o.PcIncidenciaPartidaPromesaDeCompra.Marca ||
          o.PcIncidenciaPartidaPromesaDeCompra.TEE ||
          o.PcIncidenciaPartidaPromesaDeCompra.Moneda ||
          o.PcIncidenciaPartidaPromesaDeCompra.Precio ||
          o?.PcIncidenciaPartidaPromesaDeCompra?.FechaRealizacionEnCapacitacion ||
          o?.PcIncidenciaPartidaPromesaDeCompra.IVA),
    ).length,
);

export const selectPurchaseOrderHasObservations = createSelector(
  selectedPurchaseOrder,
  (purchaseOrder: IPurchasePromiseOrder): boolean => purchaseOrder.TieneObservaciones,
);

export const selectPurchaseOrderObservations = createSelector(
  selectedPurchaseOrder,
  (purchaseOrder: IPurchasePromiseOrder): string => purchaseOrder.Observaciones,
);

export const validatorForCloseSaleButton = createSelector(
  [
    resumePurchasePromise,
    selectValidateIncidenceEntries,
    selectedPurchaseOrder,
    selectPurchaseOrderHasObservations,
    selectPurchaseOrderObservations,
    selectContactData,
  ],
  (
    items: Array<GMPartidaPromesaDeCompra>,
    validateIncidence: boolean,
    order: IPurchasePromiseOrder,
    hasObservations: boolean,
    observations: string,
    contactData: ContactoDetalleObj,
  ): boolean => {
    const osbervationsValidation = hasObservations ? !isEmpty(observations) : true;
    const addendumAply: boolean = contactData?.vCliente?.AddendaDeLineaDeOrden;
    if (addendumAply) {
      const validAdeenda = isEmpty(
        filter(items, (gmp: GMPartidaPromesaDeCompra) => {
          const orderLine: string = gmp?.PpPartidaPedidoAddendaSanofi?.LineaDeOrden || '';
          const idCatUnit: string = gmp?.PpPartidaPedidoAddendaSanofi?.IdCatUnidad || '';
          const v1 = validateFieldIsNotContainOnlySpacesAndLength(orderLine, 1);
          const v2 = validateFieldIsNotContainOnlySpacesAndLength(idCatUnit, 1);
          return !v1 || !v2;
        }),
      );

      return (
        !!(
          !isEmpty(order) &&
          !isEmpty(items) &&
          isEmpty(
            filter(
              items,
              (o: GMPartidaPromesaDeCompra) => o.PcPartidaPromesaDeCompra.Verificada === null,
            ),
          ) &&
          validAdeenda &&
          validateIncidence
        ) && osbervationsValidation
      );
    } else {
      return (
        !!(
          !isEmpty(order) &&
          !isEmpty(items) &&
          isEmpty(
            filter(
              items,
              (o: GMPartidaPromesaDeCompra) => o.PcPartidaPromesaDeCompra.Verificada === null,
            ),
          ) &&
          validateIncidence
        ) && osbervationsValidation
      );
    }
  },
);
export const selectContactClientData = createSelector(
  [selectedClient, selectContactData, selectPurchaseSelected],
  (
    client: IPurchasePromiseClient,
    contact: ContactoDetalleObj,
    order: IPurchasePromiseOrder,
  ): IClientContact => buildClientContact(client, contact, order),
);

// DOCS: La partida seleccionada para mostrarse en el modal
export const selectedIquoteItemDetails = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): GMPartidaPromesaDeCompra & QuoteItemExtension => {
    return state?.selectedIquoteItemDetails;
  },
);

export const selectUnavailableDatesCalendarDay = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): Array<CalendarDay> => {
    return _map(state.datesUnavailable, (o: string) => ({
      day: moment(o, 'YYYY-MM-DD').toDate(),
      enable: false,
    }));
  },
);

export const selectNonWorkingDays = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): string[] => {
    return state.datesUnavailable;
  },
);

export const selectFEERangeStart = createSelector(
  [selectedIquoteItemDetails, selectNonWorkingDays],
  (itemDetails: GMPartidaPromesaDeCompra & QuoteItemExtension, nonWorkingDays: string[]): Date => {
    const deliveryDaysNumber = itemDetails?.quote?.TiempoEstimadoEntrega;
    const currentDate = dateWithoutHoursUTCDate();
    const timeSlack = 5;
    return calculateEstimatedDeliveryDate(
      currentDate,
      deliveryDaysNumber + timeSlack,
      nonWorkingDays,
    );
  },
);
export const selectFEERangeEnd = createSelector(
  (): Date => {
    const endDate = dateWithoutHoursUTCDate();
    endDate.setFullYear(endDate.getFullYear() + 2);
    return endDate;
  },
);
export const selectFEE = createSelector(
  [selectedIquoteItemDetails, selectNonWorkingDays],
  (itemDetails: GMPartidaPromesaDeCompra & QuoteItemExtension, nonWorkingDays: string[]): Date => {
    const deliveryDaysNumber = itemDetails?.quote?.TiempoEstimadoEntrega;
    const currentDate: Date = dateWithoutHoursUTCDate();
    return calculateEstimatedDeliveryDate(currentDate, deliveryDaysNumber, nonWorkingDays);
  },
);

export const selectPurchaseSelectedDate = createSelector(
  [selectedIquoteItemDetails, selectFEERangeStart],
  (itemDetails: GMPartidaPromesaDeCompra & QuoteItemExtension, startFEE: Date) => {
    return itemDetails?.quote?.FechaEstimadaEntrega
      ? new Date(itemDetails?.quote?.FechaEstimadaEntrega)
      : null;
  },
);
export const selectAddendaDeLineaDeOrden = createSelector(
  selectContactData,
  (state: ContactoDetalleObj): boolean => state?.vCliente?.AddendaDeLineaDeOrden,
);

export const selectListUnidadForDropdown = createSelector(
  selectCatalogsState,
  (state: CatalogsState): DropListOption[] => {
    return _map(state.unidadPqf.listUnidad, (o: DropListOptionPqf) => ({
      label: o.label,
      value: o.id,
    }));
  },
);
export const selectListUnidad = createSelector(
  selectCatalogsState,
  (state: CatalogsState): Array<DropListOption> => state?.unidad?.listUnidad,
);
export const selectListUnidadValue = createSelector(
  [selectListUnidadForDropdown, selectedIquoteItemDetails],
  (
    state: DropListOption[],
    details: GMPartidaPromesaDeCompra & QuoteItemExtension,
  ): DropListOption => {
    const data = find(
      state,
      (it: DropListOption) => it?.value === details?.PpPartidaPedidoAddendaSanofi?.IdCatUnidad,
    );
    return {
      label: data?.label,
      value: data?.value,
    };
  },
);

export const fleteAlreadySelected = createSelector(
  [selectQuoteSelected, selectedPurchasePromise],
  (
    quote: IPurchasePromiseQuotation,
    purchaseOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension,
  ): boolean => {
    if (quote) {
      const alreadyExistFleteExpress = !!purchaseOrderList?.IdsCotCotizacionFleteExpress?.filter(
        (it) => it !== null && it !== undefined,
      )?.includes(quote?.FleteExpress?.IdCotCotizacionFleteExpress);
      const alreadyExistSomeFleteUltimaMilla = (
        arreglo1: string[],
        arreglo2: string[],
      ): boolean => {
        return arreglo1?.some((elemento: string) => !!arreglo2?.includes(elemento));
      };
      const fletM = alreadyExistSomeFleteUltimaMilla(
        purchaseOrderList?.IdsCotCotizacionFleteUltimaMilla,
        quote?.FletesUltimaMilla?.map(
          (it: GMCotFleteUltimaMilla): string => it?.IdCotCotizacionFleteUltimaMilla,
        ),
      );
      return alreadyExistFleteExpress || !!fletM;
    }
    return false;
  },
);

export const listFleteExpress = createSelector(
  purchasesOrderList,
  (purchasesOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension[]): string[] => {
    let IdsCotCotizacionFleteExpress: string[] = [];
    purchasesOrderList?.map((it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
      IdsCotCotizacionFleteExpress = IdsCotCotizacionFleteExpress.concat(
        it?.IdsCotCotizacionFleteExpress,
      );
    });
    return IdsCotCotizacionFleteExpress;
  },
);

export const listFletesUtimaMilla = createSelector(
  purchasesOrderList,
  (purchasesOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension[]): string[] => {
    let IdsCotCotizacionFleteUltimaMilla: string[] = [];
    purchasesOrderList?.map((it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
      IdsCotCotizacionFleteUltimaMilla = IdsCotCotizacionFleteUltimaMilla.concat(
        it?.IdsCotCotizacionFleteUltimaMilla,
      );
    });
    return IdsCotCotizacionFleteUltimaMilla;
  },
);

export const selectFleteEspressDetails = createSelector(
  [selectQuotations, listFleteExpress, listFletesUtimaMilla],
  (
    quotations: IPurchasePromiseQuotations,
    listExpressFreight: string[],
    listLastMileFreight: string[],
  ): IPurchasePromiseQuotation[] => {
    const existFreight = (IdCotCotizacionFleteExpress: string): boolean => {
      return !!find(
        listExpressFreight,
        (id: string): boolean => id === IdCotCotizacionFleteExpress,
      );
    };

    const existLastMileFreight = (array1: string[], array2: string[]): boolean => {
      return some(array1, (item: string) => !!includes(array2, item));
    };

    return filter(quotations?.Results, (result: IPurchasePromiseQuotation) => {
      return (
        existFreight(result?.FleteExpress?.IdCotCotizacionFleteExpress) ||
        existLastMileFreight(
          _map(
            result?.FletesUltimaMilla,
            (freight: GMCotFleteUltimaMilla): string => freight?.IdCotCotizacionFleteUltimaMilla,
          ),
          listLastMileFreight,
        )
      );
    });
  },
);

// DOCS: Se utiliza para verificar si la clave moneda de
//  las partidas seleccionadas sean igual a la clave moneda de las partidas
//  del listado de resumen
export const selectCheckCurrencyFromResume = createSelector(
  [
    selectPurchasePromiseDetails,
    resumePurchasePromise,
    selectFleteEspressDetails,
    selectedPurchaseOrder,
    selectQuoteSelected,
  ],
  (
    details: IPurchasePromiseDetailsState,
    resumeItems: GMPartidaPromesaDeCompra & QuoteItemExtension[],
    fletes: IPurchasePromiseQuotation[],
    selectedOrder: IPurchasePromiseOrder,
    selectedQuotation: IPurchasePromiseQuotation,
  ): boolean => {
    return (
      selectedOrder?.ClaveMoneda === selectedQuotation?.ClaveMoneda ||
      selectedOrder?.ClaveMoneda === details?.itemList[0]?.ClaveMoneda
    );
  },
);

// DOCS: Toma la primer partida agregada al resumen, se utiliza para obtener su atributo ClaveMoneda
export const selectFirstItemInResume = createSelector(
  resumePurchasePromise,
  (state: GMPartidaPromesaDeCompra[]): GMPartidaPromesaDeCompra & QuoteItemExtension => state?.[0],
);

export const isActiveAddToResume = createSelector(
  [hasActiveSummaryList, selectQuoteSelected, fleteAlreadySelected],
  (
    summarylist: IQuoteItem[],
    selectQuote: IPurchasePromiseQuotation,
    fleteAlreadySelected: boolean,
  ): boolean => {
    return (
      summarylist?.length > 0 ||
      (!(selectQuote?.isSelectedFlete && fleteAlreadySelected) && selectQuote?.isSelectedFlete)
    );
  },
);

export const selectInternalSalesItem = createSelector(
  [
    selectorSummaryList,
    selectQuoteSelected,
    fleteAlreadySelected,
    selectedClient,
    selectedPurchaseOrder,
  ],
  (
    itemList: IQuoteItem[],
    quote: IPurchasePromiseQuotation,
    fleteAlreadySelected: boolean,
    client: IPurchasePromiseClient,
    order: IPurchasePromiseOrder,
  ): InternalSalesItem[] => {
    let items = itemList;
    if (
      quote?.FleteDesglosado &&
      !!(quote?.FleteExpress?.IdCotCotizacionFleteExpress || quote?.FletesUltimaMilla?.length > 0)
    ) {
      const freightItem: IFreightItem = {
        descriptionFreight: quote?.FleteExpress?.IdCotCotizacionFleteExpress
          ? FREIGHT_EXPRESS
          : FREIGHTS_LAST_MILE,
        subtotal: getTotalFreights(quote?.FletesUltimaMilla, quote?.FleteExpress, {subtotal: true}),
        iva: getTotalFreights(quote?.FletesUltimaMilla, quote?.FleteExpress, {iva: true}),
        total: getTotalFreights(quote?.FletesUltimaMilla, quote?.FleteExpress),
      };
      // DOCS: Mientras no haya sido agregado el flete al resumen, se agrega como registro de partida
      if (!fleteAlreadySelected) {
        const freightList: IQuoteItem[] = [
          {
            FleteDesglosado: quote?.FleteDesglosado,
            isSelected: quote?.isSelectedFlete || null,
            freightItem,
          },
        ];
        items = concat(itemList, freightList);
      }
    }

    return _map(
      items,
      (item: IQuoteItem, index: number): InternalSalesItem => {
        return buildInternalSalesItem(quote?.FleteDesglosado, item, quote, client, order, {
          index: index,
        });
      },
    );
  },
);

export const selectFreightItems = createSelector(
  selectInternalSalesItem,
  (state: InternalSalesItem[]): InternalSalesItem[] =>
    filter(state, (item) => !!item?.data?.freightItem),
);

export const selectContainsProFreight = createSelector(
  resumePurchasePromise,
  (resumeItems): boolean => {
    const found = find(
      resumeItems,
      (item: GMPartidaPromesaDeCompra & QuoteItemExtension) =>
        item?.quote?.PrecioFleteNoDesglosado > 0,
      // item?.quotation?.FleteExpress !== null || item?.quotation?.FletesUltimaMilla?.length > 0
      //   ? !item?.quotation?.FleteDesglosado === true
      //   : null,
    );

    return found !== undefined;
  },
);
export const selectInternalItemsResume = createSelector(
  [
    resumePurchasePromise,
    selectPurchaseSelected,
    selectFleteEspressDetails,
    selectContainsProFreight,
    selectedClient,
  ],
  (
    items: GMPartidaPromesaDeCompra[],
    purchaseSelected: IPurchasePromiseOrder,
    expressFreightDetails: IPurchasePromiseQuotation[],
    containsProFreight: boolean,
    client: IPurchasePromiseClient,
  ): InternalSalesItem[] => {
    let items2: PromisePurchase[] = [...items];
    if (expressFreightDetails?.length) {
      // DOCS: CONSTRUYE LOS ITEMS PARA FLETES COMO PARTIDAS Y LOS AGREGA AL LISTADO DE PARTIDAS EXISTENTES
      const freightItems: QuoteItemExtension[] = _map(
        expressFreightDetails,
        (freight: IPurchasePromiseQuotation): QuoteItemExtension => {
          const freightItem = {
            freight: freight,
            descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
              ? FREIGHT_EXPRESS
              : FREIGHTS_LAST_MILE,
            subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
              subtotal: true,
            }),
            iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
            total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
            currency: freight?.ClaveMoneda,
          };
          return {freightItem};
        },
      );
      items2 = [...items2, ...freightItems];
    }

    const showNotes = !isEmpty(filter(items2, (o) => o?.quote?.Comentarios));
    return _map(
      items2,
      (item: IQuoteItem, index: number): InternalSalesItem => {
        return buildInternalSalesItemResume(showNotes, item, client, purchaseSelected, {
          index: index,
          containsProFreight,
        });
      },
    ) as [];
  },
);

export const selectItemsInResume = createSelector(
  [resumePurchasePromise, selectPurchaseSelected, selectFleteEspressDetails],
  (
    items: GMPartidaPromesaDeCompra[],
    purchaseSelected: IPurchasePromiseOrder,
    expressFreightDetails: IPurchasePromiseQuotation[],
  ): GMPartidaPromesaDeCompra & QuoteItemExtension[] => {
    let items2: PromisePurchase[] = [...items];
    if (expressFreightDetails?.length) {
      // DOCS: CONSTRUYE LOS ITEMS PARA FLETES COMO PARTIDAS Y LOS AGREGA AL LISTADO DE PARTIDAS EXISTENTES
      const freightItems = _map(
        expressFreightDetails,
        (freight: IPurchasePromiseQuotation): QuoteItemExtension => {
          const freightItem = {
            freight: freight,
            descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
              ? FREIGHT_EXPRESS
              : FREIGHTS_LAST_MILE,
            subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
              subtotal: true,
            }),
            iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
            total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
            currency: freight?.ClaveMoneda,
          };
          return {freightItem};
        },
      );
      items2 = [...items2, ...freightItems];
    }
    return items2;
  },
);

export const selectInternalSalesItemLength = createSelector(
  [selectInternalSalesItem, selectSeeResumeActive, selectItemsInResume],
  (
    items: InternalSalesItem[],
    isSeeResumeActive: boolean,
    itemsResume: GMPartidaPromesaDeCompra & QuoteItemExtension[],
  ): number => (isSeeResumeActive ? itemsResume?.length : items?.length),
);

export const selectAreAllItemsChecked = createSelector(
  [selectPurchasePromiseDetails, selectQuoteSelected],
  (details: IPurchasePromiseDetailsState, quote: IPurchasePromiseQuotation): boolean => {
    const itemsChecked = details?.itemList?.length && every(details.itemList, ['isSelected', true]);
    // DOCS: VALIDA SI LA PARTIDA DE FLETE EXPRESS O ULTIMA MILLA EXISTE Y ESTÁ SELECCIONADA.
    if (quote?.isSelectedFlete !== undefined) {
      return itemsChecked && quote?.isSelectedFlete;
    }
    return itemsChecked;
  },
);

// DOCS: DEVUELVE ITEM CONSTRUIDO PARA EL HEADER REUTILIZABLE app-header-internal-sales
export const selectItemForHeaderInternal = createSelector(
  [
    selectorSummaryList,
    selectQuoteSelected,
    resumePurchasePromise,
    selectAreAllItemsChecked,
    selectSeeResumeActive,
    selectedClient,
    selectedPurchaseOrder,
  ],
  (
    items: IQuoteItem[],
    quote: IPurchasePromiseQuotation,
    resumeItems: GMPartidaPromesaDeCompra[],
    allItemsChecked: boolean,
    isResumeActive: boolean,
    client: IPurchasePromiseClient,
    order: IPurchasePromiseOrder,
  ): InternalSalesItem => {
    if (isResumeActive) {
      const found = find(
        resumeItems,
        (item: GMPartidaPromesaDeCompra & QuoteItemExtension) =>
          item?.quote?.PrecioFleteNoDesglosado > 0,
        // item?.quotation?.FleteExpress !== null || item?.quotation?.FletesUltimaMilla?.length > 0
        //   ? !item?.quotation?.FleteDesglosado === true
        //   : null,
      );
      const showNotes = !isEmpty(
        filter(
          resumeItems,
          (o: GMPartidaPromesaDeCompra & QuoteItemExtension) => o?.quote?.Comentarios,
        ),
      );
      return buildInternalSalesItemResume(showNotes, resumeItems[0], client, order, {
        containsProFreight: found !== undefined,
      });
    } else {
      return buildInternalSalesItem(quote?.FleteDesglosado, items[0], quote, client, order, {
        allItemsChecked,
        isCheckHeader: true,
      });
    }
  },
);

export const selectTotals = createSelector(
  [
    selectorSummaryList,
    selectQuoteSelected,
    fleteAlreadySelected,
    selectSeeResumeActive,
    selectItemsInResume,
    selectFreightItems,
  ],
  (
    items: IQuoteItem[],
    quote: IPurchasePromiseQuotation,
    fleteAlreadySelected: boolean,
    selectSeeResumeActive: boolean,
    selectInternalItemsResume: GMPartidaPromesaDeCompra & QuoteItemExtension & any[],
    freightItems: InternalSalesItem[],
  ): ShoppingCartTotalsModel => {
    let subtotalItems = 0;
    let subtotalTemporal = 0;
    let ivaItems = 0;
    let totalItems = 0;
    let totalFreights = 0;
    let subtotalFreights = 0;
    let ivaFreights = 0;
    // // DOCS: Sumamos las partidas que no estan en resumen
    if (!selectSeeResumeActive) {
      subtotalItems = sumBy(items, 'PrecioCotizadoSubtotal');

      // DOCS: Combina y suma los totales de cotizaciones normales con los items de fletes
      const itemsWithFreight: Array<IQuoteItem | InternalSalesItem> = [...items, ...freightItems];
      itemsWithFreight.forEach((it: IQuoteItem & InternalSalesItem) => {
        if (!it.GravaIVA) {
          ivaItems += 0;
        } else {
          ivaItems += it?.PrecioIVA;
        }

        if (it?.data?.freightItem) {
          subtotalFreights += it?.data?.freightItem?.subtotal || 0; //DOCS: Obtener el Subtotal de los fletes ultima milla con el express
          ivaFreights += it?.data?.freightItem?.iva || 0; //DOCS: Obtener el IVA de los fletes ultima milla con el express
        }
      });
      totalItems = subtotalItems + ivaItems;
    }
    // DOCS: Sumamos las partidas del resumen
    if (selectSeeResumeActive) {
      subtotalFreights = 0;
      selectInternalItemsResume.forEach((it) => {
        if (it?.freightItem) {
          subtotalFreights += it?.freightItem?.subtotal || 0; //DOCS: Obtener el Subtotal de los fletes ultima milla con el express
          ivaFreights += it?.freightItem?.iva || 0; //DOCS: Obtener el IVA de los fletes ultima milla con el express
        } else {
          subtotalItems +=
            it?.quote?.NumeroDePiezas * it?.quote?.PrecioCotizadoUnitarioPactado +
            Number(it?.quote?.PrecioFleteNoDesglosado);
          subtotalTemporal =
            it?.quote?.NumeroDePiezas * it?.quote?.PrecioCotizadoUnitarioPactado +
            Number(it?.quote?.PrecioFleteNoDesglosado);
          if (!it?.quote?.GravaIVA) {
            ivaItems += 0;
          } else {
            ivaItems += subtotalTemporal * (it?.quote?.PorcentajeIVA ?? IVA_FREIGHT_ITEM);
          }
        }
      });
      totalFreights = subtotalFreights + ivaFreights;
      totalItems = subtotalItems + ivaItems;
    }

    // // DOCS: Sumamos el costo de los fletes cuando no están en resumen y que el flete no a sido agregado al resumen
    if (!selectSeeResumeActive && !fleteAlreadySelected && quote?.FleteDesglosado) {
      totalFreights = getTotalFreights(quote?.FletesUltimaMilla, quote?.FleteExpress);
    }

    return {
      subTotal: subtotalItems + subtotalFreights,
      totalTax: ivaItems + ivaFreights,
      totalPriceQuotation: totalItems + totalFreights,
    };
  },
);

export const selectItemsPurchasesOrdersResume = createSelector(
  purchasesOrderList,
  (
    state: GMPretramitarPromesaDeCompra[] & QuoteItemExtension[],
  ): GMPartidaPromesaDeCompra[] & QuoteItemExtension[] => {
    return _map(state, 'PartidasPromesaDeCompra');
  },
);

export const selectTotalBrands = createSelector(
  [selectorSummaryList, selectSeeResumeActive, selectItemsPurchasesOrdersResume],
  (
    items: IQuoteItem[],
    isResume: boolean,
    purchasesOrderList: GMPartidaPromesaDeCompra[] & QuoteItemExtension[],
  ): number => {
    if (isResume) {
      const items = [];
      forEach(purchasesOrderList, (item: GMPartidaPromesaDeCompra & QuoteItemExtension[]) => {
        forEach(item, (it: QuoteItemExtension) => {
          if (it && it?.quote) {
            items.push(it.quote);
          }
        });
      });
      return size(groupBy(items, 'NombreMarca'));
    }
    return size(groupBy(items, 'IdMarca'));
  },
);
export const validateItemPop = createSelector(
  [selectedIquoteItemDetails, selectAddendaDeLineaDeOrden],
  (
    selectedDetail: GMPartidaPromesaDeCompra & QuoteItemExtension,
    addendumApply: boolean,
  ): boolean => {
    const orderLine: string = selectedDetail?.PpPartidaPedidoAddendaSanofi?.LineaDeOrden || '';
    const idCatUnit: string = selectedDetail?.PpPartidaPedidoAddendaSanofi?.IdCatUnidad || '';
    const validOrderLine: boolean = validateFieldIsNotContainOnlySpacesAndLength(orderLine, 1);
    const validIdCatUnit: boolean = validateFieldIsNotContainOnlySpacesAndLength(idCatUnit, 1);
    const validationAddenda = addendumApply ? validOrderLine && validIdCatUnit : true;
    const validatePrograming = selectedDetail?.PcPartidaPromesaDeCompra?.Programada
      ? validateFieldsRequiredString(
          selectedDetail?.PcPartidaPromesaDeCompra?.FechaEstimadaEntrega || '',
        )
      : true;

    return validationAddenda && validatePrograming;
  },
);

export const selectValueTotalInPromise = createSelector(
  selectPurchasePromiseDetails,
  (state: IPurchasePromiseDetailsState): number => state?.valueTotalInPromise,
);

export const selectClientRestrictions = createSelector(
  selectedClient,
  (client: IPurchasePromiseClient): IClientRestrictions => {
    return {
      temporaryRestriction: client.RestriccionesTemporalesDatosFacturacion,
      monthlyRestriction: client.RestriccionMensualDatosFacturacion,
      isActiveTemporaryRestriction: client?.DatosFacturacionCliente?.RestriccionesTemporales,
    };
  },
);

export const selectDetailsItemPopTop = createSelector(
  selectedIquoteItemDetails,
  (state: GMPartidaPromesaDeCompra & QuoteItemExtension): SeeItemDetailsPopTop => {
    if (state) {
      const typeItem = state?.quote?.TipoPartidaCotizacion;
      return {
        srcImageTypePresentation: `assets/Images/products/${buildImageNameSave(
          state?.quote?.TipoPresentacion,
        )}.svg`,
        srcImageBrand: `assets/Images/logos/${state?.quote?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
        srcImageAvailability:
          SRC_IMG_TYPE_AVAILABILITY[state?.quote?.Disponibilidad?.split(' ')?.join('')] ||
          SRC_IMG_TYPE_AVAILABILITY.Disponible,
        srcImageTypeItem: SRC_IMG_TYPE_ITEM[typeItem] || SRC_IMG_TYPE_ITEM.Original,
        cat: state?.quote?.Catalogo,
        typePresentation: state?.quote?.TipoPresentacion,
        amountPresentation: state?.quote?.Presentacion,
        unitProduct: state?.quote?.Unidad,
        typeUse: state?.quote?.Uso,
        description: state?.quote?.Descripcion,
        type: state?.quote?.Tipo,
        subtype: state?.quote?.Subtipo,
        control: state?.quote?.Control,
        isControlled: state?.quote?.Controlado,
        nameProvider: state?.quote?.Proveedor?.Nombre,
        nameBrand: state?.quote?.NombreMarca,
        tee: state?.quote?.TiempoEstimadoEntrega,
        unitPrice: state?.quote?.PrecioCotizadoUnitarioPactado,
        currency: state?.quote?.ClaveMoneda,
        publication: {
          nameAuthor: state?.quote?.Autor,
          formatPublication: state?.quote?.FormatoPublicacion,
        },
        training: {
          typeMode: state?.quote?.MedioDifusion,
          timeEvent: state?.quote?.DuracionEvento,
          numberPerson: state?.quote?.NumeroDePersonasPorGrupo,
        },
      };
    }

    return {} as SeeItemDetailsPopTop;
  },
);

export const selectDetailsItemPopBottom = createSelector(
  selectedIquoteItemDetails,
  (state: GMPartidaPromesaDeCompra & QuoteItemExtension): SeeItemDetailsPopBottom => {
    if (state) {
      return {
        isControlled: state?.quote?.Controlado, // DOCS: Es controlado
        numberItem: state?.quote?.Numero, //DOCS: Numero de la partida
        amount: state?.quote?.NumeroDePiezas, // DOCS: Cantida de piezas
        dateValidation: state?.quote?.FechaCaducidadVigenciaCuraduria, //DOCS: Fecha vigencia curaduria
        dateExpiration: state?.quote?.FechaCaducidadLote, //DOCS: Fecha de Caducidad del lote
        nameBatch: state?.quote?.NombreLote, //DOCS: Nombre del lote
        edition: null, //TODO: COLOCAR PROPIEDAD CUANDO SE TENGA DE BACK
      };
    }
    return {} as SeeItemDetailsPopBottom;
  },
);
