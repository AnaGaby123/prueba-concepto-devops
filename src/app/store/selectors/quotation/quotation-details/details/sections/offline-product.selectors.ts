/*core imports */
import {createSelector} from '@ngrx/store';
import {find} from 'lodash-es';

/*model imports */
import {IDetails} from '@appModels/store/quotation/quotation-details/details/details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/*selector imports */
import {getCatUnitList} from '@appSelectors/catalogs/catalogs.selectors';
import {selectDetails} from '@appSelectors/quotation/quotation-details/details/details.selectors';

/*tools imports */
import {API_REQUEST_STATUS_SUCCEEDED, DEFAULT_UUID} from '@appUtil/common.protocols';
import {QueryInfo, VMarcaFamilia} from 'api-catalogos';
import {CotPartidaCotizacionInvestigacion, GMPartidaInvestigacionCotizador} from 'api-logistica';
import {QuotationDetailsState} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {Product} from '@appModels/store/quotation/quotation-details/details/sections/offline-product.models';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {selectQuotationDetails} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import {validateFieldsRequiredNumber, validateFieldsRequiredString} from '@appUtil/util';

export const selectOfflineProductSection = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): Product => state.offlineProductSection,
);

export const selectOfflineProductData = createSelector(
  selectOfflineProductSection,
  (state: Product): GMPartidaInvestigacionCotizador => state.data,
);

export const selectResearchQuotationItem = createSelector(
  selectOfflineProductData,
  (state: GMPartidaInvestigacionCotizador): CotPartidaCotizacionInvestigacion =>
    state.cotPartidaCotizacionInvestigacion,
);

export const selectPieces = createSelector(
  selectResearchQuotationItem,
  (state: CotPartidaCotizacionInvestigacion): number => state.Piezas,
);

export const selectTypeFamilyDropListOption = createSelector(
  selectOfflineProductSection,
  (state: Product): Array<DropListOption> => state.typesFamiliesOptionsDropList,
);
export const selectTypeFamilySelected = createSelector(
  selectOfflineProductSection,
  (state: Product): DropListOption => state.typeFamilySelected,
);
export const selectCatUnitSelected = createSelector(
  selectOfflineProductSection,
  (state: Product): DropListOption => state.typeUnitSelected,
);

export const selectBrandSelected = createSelector(
  selectOfflineProductSection,
  (state: Product): DropListOption => state.brandSelected,
);
export const selectIdBrand = createSelector(
  selectOfflineProductSection,
  (state: Product): string => state.brandSelected.value,
);
export const selectQueryInfoTypesFamily = createSelector(
  [selectOfflineProductSection, selectIdBrand],
  (state: Product, idBrand: string): QueryInfo => {
    let queryInfo: QueryInfo = {
      Filters: [
        {NombreFiltro: 'IdMarca', ValorFiltro: idBrand},
        {NombreFiltro: 'Activo', ValorFiltro: true},
        {NombreFiltro: 'TieneProveedorPrincipal', ValorFiltro: true},
      ],
      SortDirection: 'asc',
      SortField: 'NombreFamilia',
    };
    return queryInfo;
  },
);
export const selectQueryInfoCatInvestigation = createSelector(
  selectOfflineProductSection,
  (state: Product): QueryInfo => {
    let queryInfo: QueryInfo = {
      Filters: [
        {
          NombreFiltro: 'EstadoInvestigacion',
          ValorFiltro: 'Nueva',
        },
      ],
    };

    return queryInfo;
  },
);
export const selectQueryInfoProductExisting = createSelector(
  [selectOfflineProductData, selectTypeFamilySelected],
  (state: GMPartidaInvestigacionCotizador, typeFamilySelected: DropListOption): QueryInfo => {
    let queryInfo: QueryInfo = {
      Filters: [
        {NombreFiltro: 'IdMarcaFamilia', ValorFiltro: typeFamilySelected.value},
        {NombreFiltro: 'Catalogo', ValorFiltro: state.cotPartidaCotizacionInvestigacion.Catalogo},
        {
          NombreFiltro: 'Descripcion',
          ValorFiltro: state.cotPartidaCotizacionInvestigacion.Descripcion,
        },
      ],
    };
    return queryInfo;
  },
);
export const selectTypeFamilyApi = createSelector(
  selectOfflineProductSection,
  (state: Product): Array<VMarcaFamilia> => state.typesFamiliesOptionsApi?.Results,
);
export const selectNameProviderOfYTypeFamilySelected = createSelector(
  [selectTypeFamilyApi, selectTypeFamilySelected],
  (state: Array<VMarcaFamilia>, typeFamilySelected: DropListOption): VMarcaFamilia =>
    find(state, (o: VMarcaFamilia) => o.IdMarcaFamilia === typeFamilySelected.value),
);
export const selectProductExisting = createSelector(
  selectOfflineProductSection,
  (state: Product): ProductSearchResult => state.productExisting,
);

export const selectIsOfflineProduct = createSelector(
  selectIdBrand,
  (state: string): boolean => state === DEFAULT_UUID,
);

export const selectActiveAdd = createSelector(
  selectOfflineProductSection,
  (state: Product): boolean => {
    if (state.brandSelected.value === DEFAULT_UUID) {
      return !!state.data.cotPartidaCotizacionInvestigacion.Descripcion;
    } else {
      return (
        !!state.data.cotPartidaCotizacionInvestigacion.IdMarcaFamiliaProveedor &&
        !!state.data.cotPartidaCotizacionInvestigacion.IdCatUnidad &&
        validateFieldsRequiredString(state.data.cotPartidaCotizacionInvestigacion.Catalogo) &&
        validateFieldsRequiredString(state.data.cotPartidaCotizacionInvestigacion.Cantidad, 1) &&
        validateFieldsRequiredNumber(state.data.cotPartidaCotizacionInvestigacion.Piezas) &&
        validateFieldsRequiredString(state.data.cotPartidaCotizacionInvestigacion.Descripcion) &&
        validateFieldsRequiredString(
          state.data.cotPartidaCotizacionInvestigacionComentario.Comentario,
        )
      );
    }
  },
);

export const selectedUnite = createSelector(
  [selectOfflineProductData, getCatUnitList],
  (quotation: GMPartidaInvestigacionCotizador, unidad: Array<DropListOption>): DropListOption =>
    find(
      unidad,
      (o: DropListOption) => quotation?.cotPartidaCotizacionInvestigacion.IdCatUnidad === o?.value,
    ),
);
export const selectOfflineProductStatus = createSelector(
  selectDetails,
  (state: IDetails): boolean =>
    state.offlineProduct.offlineProductStatus === API_REQUEST_STATUS_SUCCEEDED,
);
