/*core imports */
import {createSelector} from '@ngrx/store';
import {filter, map as _map, sumBy} from 'lodash-es';

/*model imports */
import {
  ICheckOutQuotation,
  IDataClient,
  IFlete,
  IFreight,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IItemQuotationWithProduct} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  IGeneralDataQuotation,
  IGMCotPartidasDetalle,
  IQuotation,
  QuotationDetailsState,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';

/*selector imports */
import {
  selectedAddressDelivery,
  selectedInvestigationItems,
  selectedQuotation,
  selectedQuotationClientInfoMapped,
  selectedQuotationItems,
  selectQuotationDetails,
} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

/*tools imports */
import {CotPartidasInvetigacionCotizacion} from 'api-logistica';
import {VDireccion} from 'api-catalogos';

export const selectResumeSection = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): ICheckOutQuotation => state.resumeSection,
);

export const selectResumeSectionBarOptions = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): Array<ITabOption> => state.options,
);

export const selectOptionsTabs = createSelector(
  [selectResumeSectionBarOptions, selectedQuotationItems, selectedInvestigationItems],
  (
    resumeSectionBarOptions: Array<ITabOption>,
    quotationItems: Array<IGMCotPartidasDetalle>,
    investigationItems: Array<CotPartidasInvetigacionCotizacion>,
  ): Array<ITabOption> =>
    _map(
      resumeSectionBarOptions,
      (o): ITabOption => ({
        ...o,
        label:
          o.id === '1'
            ? `${o.label} ${quotationItems.length}`
            : `${o.label} ${investigationItems.length}`,
      }),
    ),
);

export const selectTabSelected = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): ITabOption => state.tapSelected,
);

export const selectSearchTerm = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): string => state.searchTerm,
);

export const itemSelected = createSelector(
  selectResumeSection,
  (state: ICheckOutQuotation): IItemQuotationWithProduct => {
    return state.itemQuotationSelected;
  },
);

export const selectDataClient = createSelector(
  [
    selectResumeSection,
    selectedQuotationClientInfoMapped,
    selectedQuotation,
    selectedAddressDelivery,
  ],
  (
    checkOut: ICheckOutQuotation,
    client: IGeneralDataQuotation,
    quotation: IQuotation,
    address: VDireccion,
  ): IDataClient => {
    const data: IDataClient = {} as IDataClient;
    data.name = client?.clientName;
    data.folio = client?.folio;
    data.piezas = quotation?.Piezas;
    data.productos = quotation?.TotalProductos;
    data.deliveryRoute = address?.DescripcionRutaEntrega;
    return data;
  },
);

export const selectListsFreight = createSelector(
  selectedQuotation,
  (state: IQuotation): IFreight => {
    return state?.freights;
  },
);

export const selectListFreightConventional = createSelector(
  selectListsFreight,
  selectedAddressDelivery,
  (state: IFreight, address: VDireccion): IFlete[] =>
    filter(
      state?.lastMileFreights?.list,
      (o: IFlete) => o.IdCatRutaEntrega === address.IdCatRutaEntrega,
    ),
);

export const selectListFreightExpress = createSelector(
  selectListsFreight,
  (state: IFreight): IFreightExpress[] => state?.listFreightsExpress?.list,
);
export const selectedListFreightExpress = createSelector(
  selectListFreightExpress,
  (state: Array<IFreightExpress>) => filter(state, (o: IFreightExpress) => o?.isSelected),
);
export const selectTotalSelectedListFreightExpress = createSelector(
  selectedListFreightExpress,
  (state: Array<IFreightExpress>) => {
    const subtotalFreight = sumBy(
      state,
      (o: IFreightExpress) => o?.PrecioConvertidoMonedaCotizacion,
    );
    return subtotalFreight;
  },
);

export const selectSaveFreight = createSelector(
  selectListFreightConventional,
  (state: IFlete[]): boolean => filter(state, (o) => o.isSelected)?.length > 0,
);

export const selectTotalFreightExpress = createSelector(
  selectListFreightExpress,
  (state: IFreightExpress[]): number => {
    let total = 0;
    _map(state, (provider: IFreightExpress) => {
      if (provider.isSelected) {
        total += provider.PrecioConvertidoMonedaCotizacion;
      }
    });
    return total;
  },
);

export const selectTotalFreightConventional = createSelector(
  selectListFreightConventional,
  (state: IFlete[]): number => {
    let total = 0;
    _map(state, (freight: IFlete) => {
      if (freight.isSelected) {
        total += freight.PrecioConvertidoMonedaCotizacion;
      }
    });
    return total;
  },
);
