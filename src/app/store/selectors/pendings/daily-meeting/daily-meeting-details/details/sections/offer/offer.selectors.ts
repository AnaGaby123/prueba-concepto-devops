/* Core Imports */
import {createSelector} from '@ngrx/store';
/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  DailyMeetingDetailsState,
  IItemQuotation,
  IQuotation,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';

/* Tools Imports */
import {DEFAULT_UUID, ITEM_QUOTATION_TYPE_ORIGINAL} from '@appUtil/common.protocols';
import {
  selectItemsQuotationSelected,
  selectQuotationSelected,
} from '@appSelectors/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.selectors';
import {IOfferState} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.model';
import {QueryInfo} from 'api-logistica';
import {selectDailyMeetingDetails} from '@appSelectors/pendings/daily-meeting/daily-meeting.selectors';

export const selectOfferSection = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state.offerSection,
);

export const selectSearchTermSectionOffer = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.searchTerm,
);
export const selectListTypesOfSearchSectionOffer = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.listTypesOfSearch,
);
export const selectTypeOfSearchSectionOffer = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.typeOfSearchSelected,
);

// DOCS: Obtiene la marca seleccionada de la cotización seleccionada
export const selectBrandQuotationSectionOffer = createSelector(
  selectOfferSection,
  (state: IOfferState): DropListOption => {
    return state?.brandSelected ? state?.brandSelected : {value: DEFAULT_UUID, label: 'Todas'};
  },
);

export const selectOnlyItemsQuotation = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state.itemsQuotationSelected?.Results,
);

export const selectQueryInfoItemsQuotationSelected = createSelector(
  [
    selectDailyMeetingDetails,
    selectQuotationSelected,
    selectBrandQuotationSectionOffer,
    selectSearchTermSectionOffer,
    selectTypeOfSearchSectionOffer,
  ],
  (
    state: DailyMeetingDetailsState,
    quotation: IQuotation,
    brandSelected: DropListOption,
    searchTerm: string,
    typeOfSearchSelected: DropListOption,
  ): QueryInfo => {
    let queryInfo: QueryInfo = {...state.queryInfoItemsQuotation};

    queryInfo = {
      ...queryInfo,
      Filters: [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true,
        },
        {
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: quotation?.IdCotCotizacion ? quotation.IdCotCotizacion : '',
        },
        {NombreFiltro: 'TipoPartidaCotizacion', ValorFiltro: ITEM_QUOTATION_TYPE_ORIGINAL},
      ],
      SortField: 'Orden',
      SortDirection: 'asc',
    };

    if (brandSelected.label !== 'Todas') {
      queryInfo = {
        ...queryInfo,
        Filters: [
          ...queryInfo.Filters,
          {
            NombreFiltro: 'NombreMarca',
            ValorFiltro: brandSelected.label,
          },
        ],
      };
    }
    if (searchTerm) {
      queryInfo = {
        ...queryInfo,
        Filters: [
          ...queryInfo.Filters,
          {
            NombreFiltro:
              typeOfSearchSelected.value === '1'
                ? 'FiltradoPorCatalogo'
                : typeOfSearchSelected.value === '3'
                ? 'FiltradoPorNombreMarca'
                : 'FiltradoPorDescripcion',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }
    return queryInfo;
  },
);

// DOCS: LISTADO DEL DROPLIST DE MARCAS
export const selectListBrandSectionOffer = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.listBrandsSelectedQuotation,
);

export const selectItemsQuotationSectionOffer = createSelector(
  selectItemsQuotationSelected,
  (quotes): Array<IItemQuotation> => {
    return quotes?.Results;
  },
);

// _.flow([
//   () => (products) =>
//     _.filter(
//       products,
//       (o) =>
//         _.deburr(
//           o[
//             typeOfSearch.value === '3'
//               ? 'Catalogo'
//               : typeOfSearch.value === '2'
//               ? 'NombreMarca'
//               : 'Descripcion'
//           ].toLowerCase(),
//         ).indexOf(_.deburr(_.lowerCase(searchTerm.toLowerCase()))) !== -1,
//     ),
//   // (products) => {
//   //   if (brand && brand.value !== DEFAULT_UUID) {
//   //     return _.filter(
//   //       products,
//   //       (o) => o.IdMarca === brand.value && o.NombreMarca === brand.label,
//   //     );
//   //   } else {
//   //     return products;
//   //   }
//   // },
//   (products) => _.orderBy(products, ['Descripcion', 'Orden', 'NumeroDePiezas']),
//   // (products) => {
//   //   let count = 0;
//   //   return _.map(products, (product) => {
//   //     if (!product.isChild) {
//   //       count++;
//   //     }
//   //     return {
//   //       ...product,
//   //       Index: !product.isChild ? count : -1,
//   //       PorcentajeSobrePrecioCalculado: toRound(product.PorcentajeSobrePrecioCalculado, 2),
//   //       popUpByType: {
//   //         ...product.popUpByType,
//   //         target: document.getElementById(product.popUpByType.elementId) as HTMLElement,
//   //       },
//   //       popUpByBrand: {
//   //         ...product.popUpByBrand,
//   //         target: document.getElementById(product.popUpByBrand.elementId) as HTMLElement,
//   //       },
//   //     };
//   //   });
//   // },
// ])(),

export const selectDelinquent = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.delinquent,
);
export const selectDelivery = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.delivery,
);
