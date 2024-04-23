/*core imports */
import {createSelector} from '@ngrx/store';

/*selector imports */
/*tools imports */
import {
  QuotationDetailsState,
  QuotationPdfSection,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {VCotCotizacion} from 'api-logistica';
import {selectQuotationDetails} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

export const selectQuotationPdfSection = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): QuotationPdfSection => state.quotationPdfSection,
);
export const selectBase64File = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): string => state.base64File,
);
export const selectBase64FileStatus = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): number => state.base64FileStatus,
);
export const selectBase64FileInvestigation = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): string => state.base64FileInvestigation,
);
export const selectBase64FileInvestigationStatus = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): number => state.base64FileInvestigationStatus,
);
export const selectQuotationPdf = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): VCotCotizacion => state.quotationSelectedPdf,
);
export const selectIsLinkedQuote = createSelector(
  selectQuotationPdfSection,
  (state: QuotationPdfSection): boolean => state.isLinkedQuote,
);
