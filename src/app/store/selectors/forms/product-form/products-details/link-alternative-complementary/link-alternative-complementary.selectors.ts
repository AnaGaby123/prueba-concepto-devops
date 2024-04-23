import {createSelector} from '@ngrx/store';
import {selectProductDetails} from '@appSelectors/forms/product-form/products-details/product-details-form.selectors';
import {
  ILinkedProducts,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {ParametroBuscadorSugerencias, Producto, QueryInfo, VProductoDetalle} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {filter, map as _map} from 'lodash-es';
import {selectDetailsProductState} from '@appSelectors/forms/product-form/product-form.selectors';

export const selectLinkedProducts = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.linkedProducts,
);
export const selectTabOptions = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.tabOptions,
);
export const selectTabSelected = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.tabSelected,
);
export const selectSearchTerm = createSelector(selectLinkedProducts, (state: ILinkedProducts) =>
  state.searchTerm.trim(),
);
export const selectOptionTypesSearch = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.optionTypesSearch,
);
export const selectedTypeOfSearch = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.selectedTypeOfSearch,
);
export const selectAlternativeProducts = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoAlternativo,
);
export const selectComplementaryProducts = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoComplementario,
);
export const selectSuggestStatus = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.optionsOfProductsStatus,
);
export const selectSuggestionQueryInfo = createSelector(
  selectedTypeOfSearch,
  selectSearchTerm,
  (typeOfSearch: DropListOption, searchTerm: string): ParametroBuscadorSugerencias => {
    const searchSuggestionParameters: ParametroBuscadorSugerencias = {} as ParametroBuscadorSugerencias;
    searchSuggestionParameters.POCO = 'vProducto';
    searchSuggestionParameters.NombreLlavePrimaria = 'IdProducto';
    searchSuggestionParameters.NombreAtributo =
      typeOfSearch.value === '1' ? 'Catalogo' : typeOfSearch.value === '2' ? 'Descripcion' : 'CAS';
    searchSuggestionParameters.ParametroBusqueda = searchTerm;
    searchSuggestionParameters.info = {
      Filters: [],
      SortField: typeOfSearch.value === '1' ? 'Catalogo' : typeOfSearch.value === '2' ? 'Descripcion' : 'CAS',
      SortDirection: 'asc',
      pageSize: 10,
      desiredPage: 1,
    };
    return searchSuggestionParameters;
  },
);
export const selectOptionsOfProducts = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts): Array<DropListOption> =>
    _map(
      state.optionsOfProducts,
      (o): DropListOption => {
        return {value: o.Id, label: o.Etiqueta};
      },
    ),
);
export const selectedSearchOption = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.optionOfProductSelected,
);
export const selectQueryInfo = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.queryInfo,
);
export const selectProductsList = createSelector(selectLinkedProducts, (state: ILinkedProducts) => {
  const items = filter(state.productsList, (o: Producto) => o.Activo);
  return _map(
    items,
    (o: Producto): Producto => {
      return {
        ...o,
        Activo: false,
      };
    },
  );
});
export const selectJoinProductList = createSelector(
  selectTabSelected,
  selectProductsList,
  selectAlternativeProducts,
  selectComplementaryProducts,
  (tabSelected, productsList, alternatives, complementary) => {
    if (tabSelected.id === '1') {
      return [...alternatives, ...productsList];
    } else {
      return [...complementary, ...productsList];
    }
  },
);
export const selectVProductoAlternativo = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoAlternativo,
);
export const selectvProductoComplementario = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoComplementario,
);
export const selectAlternativesLength = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoAlternativo.length,
);
export const selectComplementariesLenght = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => state.vProductoComplementario.length,
);
export const selectNeedsToReloadLinkes = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.needsToReloadLinkeds,
);
export const selectTotalResults = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.totalProductResults,
);
export const selectProductsListStatus = createSelector(
  selectLinkedProducts,
  (state: ILinkedProducts) => state.productsListStatus,
);
export const selectCurrentPage = createSelector(
  selectQueryInfo,
  (state: QueryInfo) => state.desiredPage,
);
