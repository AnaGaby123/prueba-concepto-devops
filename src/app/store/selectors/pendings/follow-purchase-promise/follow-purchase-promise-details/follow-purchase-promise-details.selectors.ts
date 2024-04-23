import {createSelector} from '@ngrx/store';
import {selectFollowPPromise} from '@appSelectors/pendings/follow-purchase-promise/follow-purchase-promise.selectors';
import {IFollowPurchasePromiseState} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise.models';
import {
  IFollowPPromiseClientData,
  IFollowPPromiseDetails,
  IFollowPPromiseItem,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {every, filter, forEach, isEmpty} from 'lodash-es';
import {CotPromesaDeCompraPartida, GMCotFletes, VCotCotizacion} from 'api-logistica';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildItemFreight,
  buildItemsFollowPurchase,
} from '@appHelpers/pending/follow-purchase-promise/follow-purchase-promise.helpers';

export const selectFollowPPromiseDetails = createSelector(
  selectFollowPPromise,
  (state: IFollowPurchasePromiseState): IFollowPPromiseDetails => state.followPPromiseDetails,
);
export const selectedClient = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): ICustomerFPP => state.selectedClient,
);
export const selectClientData = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): IFollowPPromiseClientData => state.clientData,
);
export const selectItemsResults = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): Array<IFollowPPromiseItem> => state.items.Results,
);

export const checkedItems = createSelector(
  selectItemsResults,
  (state: Array<IFollowPPromiseItem>): Array<IFollowPPromiseItem> =>
    state ? filter(state, (o: IFollowPPromiseItem) => o.isSelected) : [],
);
export const selectAllItemsChecked = createSelector(
  selectItemsResults,
  (items: IFollowPPromiseItem[]): boolean =>
    every(items, ['isSelected', true]) && items?.length > 0,
);
export const selectSearchTerm = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): string => state.searchTerm,
);
export const selectSearchOptions = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): Array<DropListOption> => state.searchOptions,
);
export const selectedSearchOption = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): DropListOption => state?.selectedSearchOption,
);
export const selectApiStatus = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): number => state.apiStatus,
);
export const selectContact = createSelector(
  selectClientData,
  (state: IFollowPPromiseClientData): IContact =>
    !isEmpty(state.contacts) ? state?.contacts[0] : ({} as IContact),
);
export const selectedClientName = createSelector(
  selectedClient,
  (state: ICustomerFPP): string => state.Nombre,
);
export const selectPercentage = createSelector(
  selectedClient,
  (state: ICustomerFPP): number =>
    (state.TotalFacturadoUSD * 100) / state.ObjetivoCrecimientoFundamental || 0,
);
export const selectPromiseIsSelected = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): boolean => state.promiseIsSelected,
);
export const selectJustification = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): string => state.justification,
);
export const selectJustifications = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): CotPromesaDeCompraPartida[] => state.justifications,
);
export const selectDateForPromise = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): Date => state.dateForPurchasePromise,
);
export const selectDateForPromiseString = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): string => state.dateForPurchasePromiseString,
);
export const validatorForFooterSection = createSelector(
  checkedItems,
  (entries: Array<IFollowPPromiseItem>): boolean => !isEmpty(entries),
);
export const validatorForNoOcButton = createSelector(
  validatorForFooterSection,
  selectPromiseIsSelected,
  selectJustification,
  (footerValid: boolean, promiseIsSelected: boolean, justification: string): boolean =>
    !!(footerValid && !promiseIsSelected && justification),
);
export const validatorDateButton = createSelector(
  validatorForFooterSection,
  selectPromiseIsSelected,
  selectJustification,
  selectDateForPromise,
  (footerValid: boolean, promiseIsSelected: boolean, justification: string, date: Date): boolean =>
    !!(footerValid && promiseIsSelected && justification && date),
);
export const selectIDArchivo = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails) => state.selectedClient.IdArchivoPDF,
);
export const selectedQuotation = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): VCotCotizacion => state?.quotation,
);

export const selectFreightsByQuotation = createSelector(
  selectFollowPPromiseDetails,
  (state: IFollowPPromiseDetails): GMCotFletes => state?.freightsQuotation,
);
export const selectItemsList = createSelector(
  selectItemsResults,
  (itemResults: IFollowPPromiseItem[]): IFollowPPromiseItem[] => itemResults,
);
export const selectCurrency = createSelector(
  selectItemsList,
  (state: IFollowPPromiseItem[]): string => state?.[0]?.ClaveMoneda || '',
);

export const selectHeaderInternalSalesItem = createSelector(
  selectedQuotation,
  selectItemsList,
  selectFreightsByQuotation,
  selectAllItemsChecked,
  selectCurrency,
  (
    quoteSelected: VCotCotizacion,
    items: IFollowPPromiseItem[],
    freights: GMCotFletes,
    itemsAllChecked: boolean,
    currency: string,
  ): InternalSalesItem => {
    const showNotes = !isEmpty(filter(items, (o: IFollowPPromiseItem) => o.Comentarios));
    return buildItemsFollowPurchase(
      showNotes,
      currency,
      {} as IFollowPPromiseItem,
      0,
      quoteSelected,
      freights,
      true,
      itemsAllChecked,
    );
  },
);
export const selectInternalSalesItem = createSelector(
  selectedQuotation,
  selectItemsList,
  selectFreightsByQuotation,
  selectCurrency,
  (
    quoteSelected: VCotCotizacion,
    items: IFollowPPromiseItem[],
    freights: GMCotFletes,
    currency: string,
  ): InternalSalesItem[] => {
    if (items?.length > 0) {
      const itemsQuotation: IFollowPPromiseItem[] = buildItemFreight(
        quoteSelected,
        items,
        freights,
      );
      const itemsInternal: InternalSalesItem[] = [];
      const showNotes = !isEmpty(filter(items, (o: IFollowPPromiseItem) => o.Comentarios));
      forEach(itemsQuotation, (item: IFollowPPromiseItem, index: number) => {
        itemsInternal.push(
          buildItemsFollowPurchase(showNotes, currency, item, index, quoteSelected, freights),
        );
      });
      return itemsInternal;
    }
    return [];
  },
);
