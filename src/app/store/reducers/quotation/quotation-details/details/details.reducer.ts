import {ActionReducer, combineReducers} from '@ngrx/store';
import {IDetails} from '@appModels/store/quotation/quotation-details/details/details.models';
import {offlineProductReducer} from '@appReducers/quotation/quotation-details/details/sections/offline-product.reducer';
import {checkOutQuotationReducer} from '@appReducers/quotation/quotation-details/details/sections/check-out-quotation/check-out-quotation.reducer';
import {newDataClientFormsReducers} from '@appReducers/quotation/quotation-details/details/sections/new-customer-quotes.reducers';

export const details: ActionReducer<IDetails> = combineReducers({
  offlineProduct: offlineProductReducer,
  checkOutQuotation: checkOutQuotationReducer,
  newCustomer: newDataClientFormsReducers,
});
