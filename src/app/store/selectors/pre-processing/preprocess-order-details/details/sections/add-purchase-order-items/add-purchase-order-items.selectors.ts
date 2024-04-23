import {createSelector} from '@ngrx/store';
import {ICard} from '@appModels/card/card';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {every, filter, find, forEach, isEmpty, map as _map} from 'lodash-es';

import * as apiCatalogs from 'api-catalogos';
import {ParametroBuscadorSugerencias} from 'api-catalogos';

import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {
  IAddPurchaseOrderItems,
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  selectClient,
  selectCurrencyLabel,
  selectItemsOrder,
  selectPreProcessOrder,
} from '@appSelectors/pre-processing/preprocess-order-details/preprocess-order-details.selectors';
import {IPreprocessOrderDetails} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {getIdTypeQuoted} from '@appSelectors/catalogs/catalogs.selectors';
import {GMCotFletes} from 'api-logistica';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildInternalSalesItemAddQuotation,
  buildItemFreight,
} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {OF_CONTRACT} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';

export const selectPurchaseOrderItem = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails) => state.addItemsSection,
);
export const selectSearchTypes = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): DropListOption[] => state.searchTypes,
);
export const selectSearchTypeSelected = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): DropListOption => state.searchTypeSelected,
);
export const selectQuoteList = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): IQuoted[] => state.quoteList,
);
export const selectQuotesCardList = createSelector(
  selectQuoteList,
  selectCurrencyLabel,
  (state: IQuoted[], currencyLabel: string): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(state, (o, index: number) => {
      options.push({
        active: o.isSelected,
        value: o.IdCotCotizacion,
        labels: [
          {
            label: `#${index + 1} · ${o.Folio}`,
            className: CLASS_NAMES.title,
          },
          {
            label: 'Valor Total en Promesa',
            className: CLASS_NAMES.totalAmount,
          },
          {
            label: `${new CurrencyFormat().transform(o.TotalPromesa, 'USD')} ${currencyLabel}`,
            className: CLASS_NAMES.totalAmount,
          },
          {
            label: `${o.TotalProductos} ${o.TotalProductos === 1 ? 'Partida' : 'Partidas'}`,
            className: CLASS_NAMES.countProducts,
          },
        ],
      });
    });
    return options;
  },
);
export const selectQuoteSelect = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): IQuoted => state.quotedSelected,
);
export const selectItemSSave = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): IQuoteItem[] => state.itemListBackUp,
);
export const selectItemsList = createSelector(
  [selectPurchaseOrderItem, selectItemsOrder],
  (
    itemsQuoteSelected: IAddPurchaseOrderItems,
    itemsOrderSelected: IPpPartidaPedidoDetallePretamitar[],
  ): IQuoteItem[] => {
    return filter(itemsQuoteSelected?.itemList, (item: IQuoteItem) => {
      // DOCS: SI el producto ya fue agregado a la orden de compra, lo sacará de la lista
      return !find(
        itemsOrderSelected,
        (itemOrder: IPpPartidaPedidoDetallePretamitar) =>
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion &&
          itemOrder?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.IdCotPartidaCotizacion ===
            item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion,
      );
    });
  },
);
export const selectProductsQueryInfo = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems) => state.productsQueryInfo,
);
export const selectItems = createSelector(
  [selectItemsList, selectItemSSave],
  (list, listBackup): Array<IQuoteItem> => {
    const lista: Array<IQuoteItem> = [];
    list.forEach((item) => {
      const listAux = filter(
        listBackup,
        (o) => o.IdCotPartidaCotizacion === item.IdCotPartidaCotizacion,
      );
      if (listAux.length > 0) {
        lista.push({...item, isSelected: true});
      } else {
        lista.push(item);
      }
    });
    return lista;
  },
);
export const selectSearchTerm = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): string => state.searchTerm,
);
export const selectOptionsOfProductsSearch = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems) =>
    _map(
      state.optionsOfProducts,
      (o): DropListOption => {
        return {value: o.Id, label: o.Etiqueta};
      },
    ),
);
export const selectCatalogQueryInfo = createSelector(
  [selectProductsQueryInfo, selectSearchTerm, selectSearchTypeSelected],
  (productsQueryInfo: apiCatalogs.QueryInfo, runSearchTerm: string, typeSearch: DropListOption) => {
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
  [selectClient, selectSearchTypeSelected, selectSearchTerm],
  (
    client: CustomerList,
    filterType: DropListOption,
    termSearch: string,
  ): ParametroBuscadorSugerencias => {
    const option = {1: 'Catalogo', 2: 'Descripcion', 3: 'CAS'};
    let type = '';
    if (termSearch && !isEmpty(filterType)) {
      type = option[filterType.value];
    }
    return {
      POCO: 'vPartidaCotizacion',
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
            NombreFiltro: 'Activo',
            ValorFiltro: true,
          },
          {
            NombreFiltro: 'EstadoCotizacion',
            ValorFiltro: 'Enviada',
          },
        ],
        SortField: type,
        SortDirection: 'desc',
      },
    };
  },
);

export const selectSuggestionInContractQueryInfo = createSelector(
  [selectClient, selectSearchTypeSelected, selectSearchTerm],
  (
    client: CustomerList,
    filterType: DropListOption,
    termSearch: string,
  ): ParametroBuscadorSugerencias => {
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
export const selectLoadingOptionsSearch = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): boolean =>
    state.optionsOfProductsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectActiveBtnAdd = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): boolean => state.itemListBackUp.length > 0,
);
export const selectItemSearch = createSelector(
  selectPurchaseOrderItem,
  (state: IAddPurchaseOrderItems): DropListOption => state.productToSearch,
);
/*TODO: Revisar cuando se devuelva la funcionalidad de cotizaciones vinculadas*/
/*export const selectItemSelected = createSelector(selectItemsList, (listQuotes: IQuoteItem[]) => {
  const item = filter(listQuotes, (o: IQuoteItem) => {
    if (o.isInViewQuotesLinked) {
      return o.quotesLinked;
    }
  });
  return item[0];
});*/
export const selectAddItemApiStatus = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): number => state.addItemsSection.apiStatus,
);

export const selectQueryInfoQuotesClientSelected = createSelector(
  selectClient,
  selectItemSearch,
  getIdTypeQuoted('enviada'),
  selectPurchaseOrderItem,
  (client: CustomerList, product: DropListOption, idTypeQuoted: string): FiltersOnlyActive => {
    let query: FiltersOnlyActive = {
      Filters: [
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true,
        },
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: client?.IdCliente,
        },
      ],
      GroupColumn: '',
      SortField: 'Nombre',
      SortDirection: 'asc',
    };

    if (!isEmpty(product)) {
      //DOCS: SELECCION DE UNA PRODUCTO SUGUERIDO DE LA BUSQUEDA
      query = {
        ...query,
        Filters: [
          ...query.Filters,
          {
            NombreFiltro: 'IdProducto',
            ValorFiltro: product.value,
          },
        ],
      };
    }
    return query;
  },
);

export const selectQueryItemsQuoteSelected = createSelector(
  selectQuoteSelect,
  selectItemSearch,
  (quote: IQuoted, product: DropListOption): FiltersOnlyActive => {
    let query: FiltersOnlyActive = {
      Filters: [
        {
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: quote?.IdCotCotizacion, //DOCS: PUEDE SER NULO CUANDO SE ESCOGE UN PRODUCTO DE LAS SUGUERENIAS DE BUSQUEDA
        },
        {
          NombreFiltro: 'Originales',
          ValorFiltro: '',
        },
      ],
    };

    if (!isEmpty(product)) {
      //DOCS: SELECCION DE UNA PRODUCTO SUGUERIDO DE LA BUSQUEDA
      query = {
        ...query,
        Filters: [
          ...query.Filters,
          {
            NombreFiltro: 'IdProducto',
            ValorFiltro: product.value,
          },
        ],
      };
    }
    return query;
  },
);
export const selectExpressFreightQuoteSelected = createSelector(
  selectQuoteSelect,
  (state: IQuoted): GMCotFletes => state?.freightsQuote,
);

export const selectHeaderInternalSalesItem = createSelector(
  selectItemsList,
  selectQuoteSelect,
  selectExpressFreightQuoteSelected,
  (
    itemsQuoteSelected: IQuoteItem[],
    quoteSelected: IQuoted,
    freights: GMCotFletes,
  ): InternalSalesItem => {
    const allChecked =
      every(itemsQuoteSelected, ['isSelected', true]) && itemsQuoteSelected?.length > 0;
    const item = {} as IQuoteItem;
    const showNotes = !isEmpty(
      filter(
        itemsQuoteSelected,
        (o: IQuoteItem) => o?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return buildInternalSalesItemAddQuotation(showNotes, item, quoteSelected, freights, {
      isHeader: true,
      allChecked,
    });
  },
);
export const selectInternalSalesItemAddQuotation = createSelector(
  selectItemsList,
  selectQuoteSelect,
  selectExpressFreightQuoteSelected,
  selectCurrencyLabel,
  (
    itemsQuoteSelected: IQuoteItem[],
    quoteSelected: IQuoted,
    freights: GMCotFletes,
    currency: string,
  ): InternalSalesItem[] => {
    if (itemsQuoteSelected?.length > 0) {
      let items = itemsQuoteSelected;
      const itemsInternal: InternalSalesItem[] = [];
      const containsItemsContract = isEmpty(
        find(itemsQuoteSelected, (item: IQuoteItem) => item?.label === OF_CONTRACT),
      );
      if (
        (freights?.FleteExpress !== null || freights?.FletesUltimaMilla?.length > 0) &&
        containsItemsContract
      ) {
        items = buildItemFreight(itemsQuoteSelected, quoteSelected, freights);
      }
      const showNotes = !isEmpty(
        filter(items, (o: IQuoteItem) => o?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios),
      );
      const showColumnFreight = !isEmpty(
        find(
          items,
          (o: IQuoteItem) =>
            o.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioFleteNoDesglosado > 0,
        ),
      );
      forEach(items, (o: IQuoteItem, index: number) => {
        itemsInternal.push(
          buildInternalSalesItemAddQuotation(showNotes, o, quoteSelected, freights, {
            currency,
            index,
            showColumnFreight,
          }),
        );
      });
      return itemsInternal;
    }

    return [];
  },
);
