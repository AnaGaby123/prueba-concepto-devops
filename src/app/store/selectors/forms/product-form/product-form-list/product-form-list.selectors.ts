import {createSelector} from '@ngrx/store';
import {deburr, isEmpty, map as _map} from 'lodash-es';
import {selectProductForms} from '@appSelectors/forms/forms.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {getArrayForDropDownList} from '@appUtil/util';
import {AVAILABILITY_TYPES, DEFAULT_UUID, PAGING_LIMIT} from '@appUtil/common.protocols';
import {ParametroBuscadorSugerencias, QueryInfo} from 'api-catalogos';
import {
  selectListAvailabilityForDropDown,
  selectListFamilyLine,
  selectListTradeMark,
} from '@appSelectors/catalogs/catalogs.selectors';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';

export const selectListProductState = createSelector(
  selectProductForms,
  (state) => state.listProducts,
);

export const selectProductsType = createSelector(
  selectListProductState,
  (state) => state.listProductsType,
);

export const selectedItemTradeMark = createSelector(
  selectListProductState,
  (state) => state.TrademarkSelected,
);
export const selectedItemProductType = createSelector(
  selectListProductState,
  (state) => state.ProductTypeSelected,
);
export const selectedItemPrice = createSelector(
  selectListProductState,
  (state) => state.PriceSelected,
);
export const selectedItemLines = createSelector(
  selectListProductState,
  (state) => state.LineSelected,
);
export const selectedItemStatus = createSelector(
  selectListProductState,
  (state) => state.ProductStateSelected,
);
export const selectCatPrice = createSelector(selectListProductState, (state) => state.catPrice);
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

export const selectListProducts = createSelector(
  selectListAvailabilityForDropDown,
  (availability) => {
    const list = _map(availability, (o: DropListOption) =>
      o.labelKey.toLowerCase() === AVAILABILITY_TYPES.discontinued
        ? ({
            ...o,
            labelColors: ['#c2c3c9'],
          } as DropListOption)
        : o.labelKey.toLowerCase() === AVAILABILITY_TYPES.notmarketable
        ? ({
            ...o,
            labelColors: ['#e29d2a'],
          } as DropListOption)
        : o.labelKey.toLowerCase() === AVAILABILITY_TYPES.backorder
        ? ({
            ...o,
            labelColors: ['#a45aeb'],
          } as DropListOption)
        : o.labelKey.toLowerCase() === AVAILABILITY_TYPES.available
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

export const selectProductsQueryInfo = createSelector(
  selectListProductState,
  ({queryInfo}): QueryInfo => queryInfo,
);
export const selectTypeSearch = createSelector(
  selectListProductState,
  (state) => state.selectedTypeOfSearch,
);
export const selectSearchTerm = createSelector(selectListProductState, (state) => state.searchTerm);
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
    const queryInfo = {
      ...productsQueryInfo,
      pageSize: productsQueryInfo.desiredPage === 1 ? 48 : productsQueryInfo.pageSize,
    };
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
      pageSize: 10,
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
  const options = {
    NombreMarca: 'NombreMarca',
    Descripcion: 'Descripcion',
    Marca: 'Nombre',
    Catalogo: 'Catalogo',
    CAS: 'CAS',
    Default: 'Descripcion',
  };

  return options[deburr(type)] || options.Default;
};
