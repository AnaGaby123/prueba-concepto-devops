// DOCS Se comento porque se eliminara la seccion de reemplazar partida

/*const initialReplaceItem: IReplacePurchaseOrderItem = {
  ...initialIReplacePurchaseOrderItem(),
};
export const replaceItemReducer = createReducer(
  initialReplaceItem,
  on(replaceItemActions.FETCH_LIST_QUOTED_ITEMS_SUCCESS, (state, {list}) => ({
    ...state,
    listOfItem: list,
    quoteList: _.map(state.quoteList, (item) => {
      const listItems = _.filter(list, (o) => {
        return o.IdCotCotizacion === item.IdCotCotizacion;
      });
      return {...item, listItems, isSelected: false};
    }),
  })),
  on(replaceItemActions.FETCH_QUOTED_ITEMS_SUCCESS, (state, {items}) => ({
    ...state,
    quoteList: _.map(state.quoteList, (item) => {
      if (item.IdCotCotizacion === items[0].IdCotCotizacion) {
        return {...item, items, needsToReloadItems: false};
      }
      return item;
    }),
    listOfItem: items,
  })),
  on(replaceItemActions.SET_QUOTES_CLIENT_SUCCESS, (state, {quoteList}) => ({
    ...state,
    quoteList,
  })),
  on(replaceItemActions.SET_ITEM_LIST_CATALOG, (state, {items}) => ({
    ...state,
    listOfItem: items,
  })),
  on(replaceItemActions.SET_QUOTED_SELECTED, (state, {item}) => ({
    ...state,
    quotedSelected: item,
  })),
  on(replaceItemActions.SET_SELECT_ITEM, (state, {item, value}) => ({
    ...state,
    listOfItem: _.map(state.listOfItem, (order) => {
      if (order.IdCotPartidaCotizacion) {
        if (order.IdCotPartidaCotizacion === item.IdCotPartidaCotizacion) {
          return {...order, isSelected: value};
        } else {
          return {...order, isSelected: !value};
        }
      } else {
        if (order.IdProducto === item.IdProducto) {
          return {...order, isSelected: value};
        } else {
          return {...order, isSelected: !value};
        }
      }
    }),
  })),
  on(replaceItemActions.UPDATE_QUOTE_SELECTED, (state, {idQuoted}) => ({
    ...state,
    quotedSelected:
      _.findIndex(state.quoteList, (o) => o.IdCotCotizacion === idQuoted) > -1
        ? state.quoteList[_.findIndex(state.quoteList, (o) => o.IdCotCotizacion === idQuoted)]
        : ({} as IQuoted),
    quoteList: _.map(state.quoteList, (order) => {
      if (order.IdCotCotizacion === idQuoted) {
        return {...order, isSelected: true};
      }
      return {...order, isSelected: false};
    }),
  })),
  on(replaceItemActions.SET_RUN_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    runSearchTerm: searchTerm,
    optionOfProductSelected: {} as DropListOption,
    productsQueryInfo: {
      ...state.productsQueryInfo,
      desiredPage: 1,
    },
  })),
  on(replaceItemActions.SET_QUOTES_CLIENT_OF_SEARCH, (state, {product}) => ({
    ...state,
    productToSearch: product,
    searchTerm: product.label,
  })),
  on(replaceItemActions.SET_TYPE_FILTER_SEARCH, (state, {filterType}) => ({
    ...state,
    searchTypeSelected: filterType,
  })),
  on(replaceItemActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS, (state, {product}) => ({
    ...state,
    optionsOfProducts: product,
    optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(replaceItemActions.GET_OPTIONS_OF_PRODUCTS, (state, {searchTerm}) => ({
    ...state,
    optionsOfProductsStatus: API_REQUEST_STATUS_LOADING,
    searchTerm,
  })),
);

 */
