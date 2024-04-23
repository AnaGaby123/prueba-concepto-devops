import * as importQuotationActions from '@appActions/quotation/quotation.actions';
import * as importClientQuotationsActions from '@appActions/quotation/quotation.dashboard/quotation-dashboard.actions';
import * as importQuotationDetailsActions from '@appActions/quotation/quotation-details/quotation-details.actions';
import * as importOfflineProductActions from '@appActions/quotation/quotation-details/details/offline-product/offline-product.actions';
import * as importListQuotesActions from '@appActions/quotation/quotation-details/details/list-quotes/list-quotes.actions';
import * as importCheckOutQuotationActions from '@appActions/quotation/quotation-details/details/check-out-quotation/check-out-quotation.actions';
import * as importNewClientFormActions from '@appActions/quotation/quotation-details/details/new-customer-quotes/new-customer-quotes.actions';
import * as importTotalQuotePdfActions from '@appActions/quotation/quotation-details/details/total-quote-pdf/total-quote-pdf.actions';

export const quotationActions = importQuotationActions;
export const quotationDashboardActions = importClientQuotationsActions;
export const quotationDetailsActions = importQuotationDetailsActions;
export const offlineProductActions = importOfflineProductActions;
export const listQuotesActions = importListQuotesActions;
export const checkOutQuotationActions = importCheckOutQuotationActions;
export const newClientFormActions = importNewClientFormActions;
export const totalQuotePdfActions = importTotalQuotePdfActions;
