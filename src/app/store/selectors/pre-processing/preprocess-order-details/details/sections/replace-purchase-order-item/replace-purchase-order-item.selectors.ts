// DOCS Se comento porque se eliminara la seccion de reemplazar partida

/*
export const selectReplaceItem = createSelector(selectDetails, (state) => state.replaceItems);
export const selectFilterSelected = createSelector(
  selectReplaceItem,
  (state) => state.searchTypeSelected,
);
export const selectListOfItem = createSelector(selectReplaceItem, (state) => state.listOfItem);
export const selectProductToSearch = createSelector(
  selectReplaceItem,
  (state) => state.productToSearch,
);
export const selectQuoteSelect = createSelector(selectReplaceItem, (state) => state.quotedSelected);
export const selectQuoteList = createSelector(selectReplaceItem, (state) => state.quoteList);
export const selectRunSearchTerm = createSelector(
  selectPurchaseOrderItem,
  (state) => state.runSearchTerm,
);
export const selectOptionsCard = createSelector(
  selectQuoteList,
  (state): Array<ICard> => {
    const options: Array<ICard> = [];
    _.forEach(state, (o: IClientQuotesDetails, index: number) => {
      const dayI = moment(
        new DateFormatNumber().transform(o.FechaCaducidad, '-', 'year'),
        'YYYY-MM-DD',
      );
      const dayF = moment(new DateFormatNumber().transform(new Date(), '-', 'year'), 'YYYY-MM-DD');
      options.push({
        active: o.isSelected,
        value: o.IdCotCotizacion,
        labels: [
          {label: `#${index + 1} · ${o.Folio}`},
          {
            label: 'Valor Total en Promesa',
          },
          {
            label: `${new CurrencyFormat().transform(0, 'USD')} USD`,
          },
          {
            label: `${o.TotalProductos}  Producto` + (o.TotalProductos !== 1 ? 's' : ''),
          },
          {
            label: `Vigencia:  ${dayI.diff(dayF, 'days')} Días`,
          },
        ],
      });
    });
    return options;
  },
);
export const selectSearchTerm = createSelector(selectReplaceItem, (state) => state.searchTerm);
export const selectProductsQueryInfo = createSelector(
  selectPurchaseOrderItem,
  ({productsQueryInfo}): QueryInfo => productsQueryInfo,
);
export const selectQueryInfo = createSelector(
  [selectProductsQueryInfo, selectSearchTerm, selectFilterSelected],
  (productsQueryInfo: QueryInfo, runSearchTerm: string, typeSearch: DropListOption) => {
    const queryInfo = {...productsQueryInfo};
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];
    if (typeSearch?.label) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: patchTypeOfSearch(typeSearch.label),
          ValorFiltro: runSearchTerm,
        },
      ];
    }
    return queryInfo;
  },
);
export const selectSuggestionQueryInfo = createSelector(
  [selectFilterSelected, selectSearchTerm],
  (filterType: DropListOption, termSearch: string): ParametroBuscadorSugerencias => {
    const option = {1: 'CAS', 2: 'Catalogo', 3: 'Descripcion'};
    let type = '';
    if (termSearch && !_.isEmpty(filterType)) {
      type = option[filterType.value];
    }
    const filterOptions: ParametroBuscadorSugerencias = {} as ParametroBuscadorSugerencias;
    filterOptions.POCO = 'vProducto';
    filterOptions.NombreLlavePrimaria = 'IdProducto';
    filterOptions.NombreAtributo = type;
    filterOptions.ParametroBusqueda = termSearch;

    filterOptions.info = {
      Filters: [],
      SortField: type,
      SortDirection: 'desc',
      pageSize: 100000,
      desiredPage: 1,
    };
    filterOptions.NombreAtributo = filterType?.label ? patchTypeOfSearch(filterType.label) : '';
    filterOptions.ParametroBusqueda = termSearch;
    return filterOptions;
  },
);
export const selectLoadingOptionsSearch = createSelector(
  selectReplaceItem,
  (state) => state.optionsOfProductsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectItemSearch = createSelector(selectReplaceItem, (state) => state.productToSearch);
export const selectOptionsOfProductsSearch = createSelector(selectReplaceItem, (state) =>
  _.map(
    state.optionsOfProducts,
    (o): DropListOption => {
      return {value: o.Id, label: o.Etiqueta};
    },
  ),
);
export const activeBtnReplace = createSelector(
  selectListOfItem,
  (state) => _.findIndex(state, (o) => o.isSelected) >= 0,
);
export const selectItemToReplace = createSelector(selectListOfItem, (state) =>
  _.find(state, (item) => item.isSelected),
);
const patchTypeOfSearch = (type: string): string => {
  const options = {
    Descripcion: 'Descripcion',
    Cat: 'Catalogo',
    CAS: 'CAS',
  };
  return options[_.deburr(type)];
};
*/
