import * as importQuotationSelectors from '@appSelectors/quotation/quotation.selectors';
import * as importQuotationDashboardSelectors from '@appSelectors/quotation/quotation-dashboard/quotation-dashboard.selectors';
import * as importQuotationDetailsSelectors from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import * as importDetailsSelectors from '@appSelectors/quotation/quotation-details/details/details.selectors';
import * as importOfflineProductSelectors from '@appSelectors/quotation/quotation-details/details/sections/offline-product.selectors';
import * as importResumeSectionSelectors from '@appSelectors/quotation/quotation-details/resume-section.selectors';
import * as importNewClientSelectors from '@appSelectors/quotation/quotation-details/details/sections/new-customer-quotes.selector';
import * as importTotalQuotePdfSelector from '@appSelectors/quotation/quotation-details/details/sections/total-quote-pdf.selectors';

export const quotationSelectors = importQuotationSelectors;
export const quotationDashboardSelectors = importQuotationDashboardSelectors;
export const quotationDetailsSelectors = importQuotationDetailsSelectors;
export const detailsSelectors = importDetailsSelectors;
export const offlineProductSelectors = importOfflineProductSelectors;
export const resumeSectionSelectors = importResumeSectionSelectors;
export const newClientFormSelectors = importNewClientSelectors;
export const totalQuotePdfSelectors = importTotalQuotePdfSelector;
